const { Utils, factoryCreator } = require('indiv');
const utils = new Utils();

/**
 * get props from value
 *
 * @param {any[]} valueList
 * @param {*} value
 * @returns {void}
 */
function getPropsValue(valueList, value) {
  let val = value;
  valueList.forEach((v, index) => {
    if (index === 0) return;
    val = val[v];
  });
  return val;
}

/**
 * build Actions for Props in Component
 *
 * @template State
 * @template Props
 * @template Vm
 * @param {*} prop
 * @param {IComponent<State, Props, Vm>} vm
 * @returns {*}
 */
function buildProps(prop, vm) {
  if (utils.isFunction(prop)) {
    return prop.bind(vm);
  } else {
    return prop;
  }
}

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

module.exports = {
  getPropsValue,
  buildProps,
  buildComponentScope,
};
