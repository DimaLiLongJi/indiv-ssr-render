const Compile = require('./compile');
const { factoryCreator } = require('indiv');
// const { factoryCreator } = require('../../InDiv/build');

/**
 * instantiate component
 *
 * @param {IComponent} FindComponent
 * @param {NvModule} rootModule
 * @param {Node} renderDOM
 * @param {string} routeDOMKey
 * @returns IComponent || boolean
 */
function instantiateComponent(FindComponent, rootModule, renderDOM, routeDOMKey) {
  // 构建 组件实例
  const component = factoryCreator(FindComponent, rootModule);

  component.$components = rootModule.$components;
  if (component.nvOnInit) component.nvOnInit();

  // 渲染组件
  if (component.$template && typeof component.$template === 'string' && renderDOM) {
    replaceDom(component, rootModule, renderDOM, routeDOMKey);
    return component;
  } else {
    console.error('renderBootstrap failed: template or rootDom is not exit');
    return false;
  }
}

/**
 * render DOM in Dodument
 *
 * @param {IComponent} component
 * @param {NvModule} rootModule
 * @param {Node} renderDOM
 * @param {string} routeDOMKey
 */
function replaceDom(component, rootModule, renderDOM, routeDOMKey) {
  component.renderDom = renderDOM;
  new Compile(component, renderDOM);
  // 挂载组件内的组件
  mountComponent(component, rootModule, renderDOM, routeDOMKey);
  component.$componentList.forEach(com => {
    // 渲染组件内的组件
    replaceDom(com.scope, rootModule, com.dom, routeDOMKey);
  });
}

/**
 * mount Component in Component
 *
 * @param {IComponent} component
 * @param {NvModule} rootModule
 * @param {Node} renderDOM
 * @param {string} routeDOMKey
 */
function mountComponent(component, rootModule, dom, routeDOMKey) {
  // 构建组件对象
  componentsConstructor(component, rootModule, dom, routeDOMKey);
  component.$componentList.forEach(com => {
    com.scope.$components = component.$components;
    if (com.scope.nvOnInit) com.scope.nvOnInit();
  });
};

/**
 * construct components in Component
 *
 * @param {IComponent} component
 * @param {NvModule} rootModule
 * @param {Node} renderDOM
 * @param {string} routeDOMKey
 */
function componentsConstructor(component, rootModule, dom, routeDOMKey) {
  component.$componentList = [];

  const routerRenderDom = dom.querySelectorAll(routeDOMKey)[0];

  component.constructor._injectedComponents.forEach((injectedComponent) => {
    if (!component.$components.find((com) => com.$selector === injectedComponent.$selector)) component.$components.push(injectedComponent);
  });

  for (let i = 0; i <= component.$components.length - 1; i++) {
    const name = (component.$components[i]).$selector;
    const tags = dom.getElementsByTagName(name);

    Array.from(tags).forEach(node => {
      if (routerRenderDom && routerRenderDom.contains(node)) return;

      const nodeAttrs = node.attributes;
      const props = {};

      if (nodeAttrs) {
        const attrList = Array.from(nodeAttrs);
        const _propsKeys = {};
        attrList.forEach((attr) => {
          if (/^\_prop\-(.+)/.test(attr.name)) {
            _propsKeys[attr.name.replace('_prop-', '')] = JSON.parse(attr.value);
            node.removeAttribute(attr.name);
          }
        });
        attrList.forEach((attr) => {
          const attrName = attr.name;

          if ((/^\_prop\-(.+)/.test(attr.name))) return;

          const prop = /^\{(.+)\}$/.exec(attr.value);
          if (prop) {
            const valueList = prop[1].split('.');
            const key = valueList[0];
            let _prop = null;
            if (/^(state.).*/g.test(prop[1])) {
              _prop = component.compileUtil._getVMVal(component, prop[1]);
              props[attrName] = component.buildProps(_prop);
              return;
            }
            if (/^(\@.).*/g.test(prop[1])) {
              _prop = component.compileUtil._getVMVal(component, prop[1].replace(/^(\@)/, ''));
              props[attrName] = component.buildProps(_prop);
              return;
            }
            if (_propsKeys.hasOwnProperty(key)) {
              _prop = component.getPropsValue(valueList, _propsKeys[key]);
              props[attrName] = component.buildProps(_prop);
              return;
            }
            if (node.repeatData && node.repeatData[key] !== null) {
              _prop = component.compileUtil._getValueByValue(node.repeatData[key], prop[1], key);
              props[attrName] = component.buildProps(_prop);
              return;
            }
          }
          if (attr.name !== 'indiv_repeat_key')  node.removeAttribute(attrName);
        });
      }

      component.$componentList.push({
        dom: node,
        props,
        scope: buildComponentScope(component.$components[i], props, node, component, rootModule),
      });
    });
  }
};

/**
 * build Component and build scope of Component
 *
 * @param {IComponent} ComponentClass
 * @param {any} props
 * @param {Node} dom
 * @param {IComponent} component
 * @param {NvModule} rootModule
 * @returns IComponent
 */
function buildComponentScope(ComponentClass, props, dom, component, rootModule) {
  const _component = factoryCreator(ComponentClass, rootModule);
  _component.props = props;
  _component.renderDom = dom;
  _component.$components = component.$components;
  return _component;
};

module.exports = instantiateComponent;
