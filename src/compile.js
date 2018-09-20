const Window = require('window');
const formatInnerHTML = require('./utils');
const { CompileUtil } = require('../../InDiv/build');

const window = new Window();
const document = window.document;

/**
 * compile component for SSR-InDiv
 *
 * @class Compile
 */
class Compile {
  constructor(vm, el) {
    this.$vm = vm;
    this.$fragment = this.node2Fragment();
    this.init();
    this.$el = el;
    if (this.$el) {
      Array.from(this.$fragment.childNodes).forEach(child => {
        this.$el.appendChild(child);
      });
    }
  }

  init() {
    this.compileElement(this.$fragment);
  }

  compileElement(fragment) {
    const elementCreated = document.createElement('div');
    elementCreated.innerHTML = formatInnerHTML(this.$vm.$template);
    const childNodes = elementCreated.childNodes;
    this.recursiveDOM(childNodes, fragment);
  }

  recursiveDOM(childNodes, fragment) {
    Array.from(childNodes).forEach((node) => {

      if (node.hasChildNodes() && !this.isRepeatNode(node)) this.recursiveDOM(node.childNodes, node);

      fragment.appendChild(node);

      const text = node.textContent;
      const reg = /\{\{(.*)\}\}/g;
      if (this.isElementNode(node)) {
        this.compile(node, fragment);
      }

      if (this.isTextNode(node) && reg.test(text)) {
        // const regText = RegExp.$1;
        // if (/(.*\{\{(state.).*\}\}.*)/g.test(text)) this.compileText(node, regText);
        const textList = text.match(/(\{\{(state\.)[^\{\}]+?\}\})/g);
        if (textList && textList.length > 0) {
          for (let i = 0; i < textList.length; i++) {
              this.compileText(node, textList[i]);
          }
        }
      }

      // after compile repeatNode, remove repeatNode
      if (this.isRepeatNode(node) && fragment.contains(node)) fragment.removeChild(node);
    });
  }

  compile(node, fragment) {
    const nodeAttrs = node.attributes;
    if (nodeAttrs) {
      Array.from(nodeAttrs).forEach(attr => {
        const attrName = attr.name;
        if (this.isDirective(attrName)) {
          const dir = attrName.substring(3);
          const exp = attr.value;
          if (!this.isEventDirective(dir)) new CompileUtil(fragment).bind(node, this.$vm, exp, dir);
        }
      });
    }
  }

  node2Fragment() {
    return document.createDocumentFragment();
  }

  compileText(node, exp) {
    new CompileUtil(this.$fragment).templateUpdater(node, this.$vm, exp);
  }

  isDirective(attr) {
    return attr.indexOf('nv-') === 0;
  }

  isEventDirective(eventName) {
    return eventName.indexOf('on') === 0;
  }

  isElementNode(node) {
    if (typeof node === 'string') return false;
    return node.nodeType === 1;
  }

  isRepeatNode(node) {
    const nodeAttrs = node.attributes;
    let result = false;
    if (nodeAttrs) {
      Array.from(nodeAttrs).forEach(attr => {
        const attrName = attr.name;
        if (attrName === 'nv-repeat') result = true;
      });
    }
    return result;
  }

  isTextNode(node) {
    return node.nodeType === 3;
  }
}

module.exports = Compile;
