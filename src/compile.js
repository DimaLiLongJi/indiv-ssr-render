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
        const regText = RegExp.$1;
        if (/(.*\{\{(state.).*\}\}.*)/g.test(text)) this.compileText(node, regText);
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
          if (this.isEventDirective(dir)) {
            this.eventHandler(node, this.$vm, exp, dir);
          } else {
            new CompileUtil(fragment).bind(node, this.$vm, exp, dir);
          }
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

  eventHandler(node, vm, exp, eventName) {
    const eventType = eventName.split(':')[1];

    const fnList = exp.replace(/^(\@)/, '').replace(/\(.*\)/, '').split('.');
    const args = exp.replace(/^(\@)/, '').match(/\((.*)\)/)[1].replace(/\s+/g, '').split(',');

    let fn = vm;
    fnList.forEach(f => {
      fn = fn[f];
    });
    const func = function(event) {
      const argsList= [];
      args.forEach(arg => {
        if (arg === '') return false;
        if (arg === '$event') return argsList.push(event);
        if (arg === '$element') return argsList.push(node);
        if (/(state.).*/g.test(arg)) return argsList.push(new CompileUtil()._getVMVal(vm, arg));
        if (/\'.*\'/g.test(arg)) return argsList.push(arg.match(/\'(.*)\'/)[1]);
        if (!/\'.*\'/g.test(arg) && /^[0-9]*$/g.test(arg)) return argsList.push(Number(arg));
        if (arg === 'true' || arg === 'false') return argsList.push(arg === 'true');
      });
      fn.apply(vm, argsList);
    };
    if (eventType && fn) {
      node[`on${eventType}`] = func;
      node[`event${eventType}`] = func;
      if (node.eventTypes) {
        const eventlist = JSON.parse(node.eventTypes);
        eventlist.push(eventType);
        node.eventTypes = eventlist;
      }
      if (!node.eventTypes) node.eventTypes = JSON.stringify([eventType]);
    }
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

  isIfNode(node) {
    const nodeAttrs = node.attributes;
    let result = false;
    if (nodeAttrs) {
      Array.from(nodeAttrs).forEach(attr => {
        const attrName = attr.name;
        if (attrName === 'nv-if') result = true;
      });
    }
    return result;
  }

  isTextNode(node) {
    return node.nodeType === 3;
  }
}

module.exports = Compile;
