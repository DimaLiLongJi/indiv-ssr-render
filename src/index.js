const Window = require('window');

const Compile = require('./compile');
const { factoryModule, factoryCreator } = require('indiv');
const { buildPath, findRoutes, findComponent, mountComponent, instantiateComponent } = require('./buildComponent');
const domToString = require('./domToString');


const window = new Window();
const document = window.document;

function renderToString(url, routes, RootModule) {
  const pathList = buildPath(url);
  const rootModule =  factoryModule(RootModule);
  const routesList = findRoutes(pathList, routes, rootModule);
  const componentList = findComponent(routesList, rootModule);

  // render component
  const documentFragment = document.createElement('div');
    // const com = instantiateComponent(component, rootModule);
    // if (index === 0) {
    //   new Compile(com, documentFragment);
    //   mountComponent(com, documentFragment, rootModule);
    // } else {
    //   const el = documentFragment.querySelectorAll('router-render')[index - 1];
    //   new Compile(com, el);
    //   mountComponent(com, el, rootModule);
    // }
  componentList.forEach((component, index) => {
    if (index === 0) {
      console.log(44444, documentFragment);
      const com = instantiateComponent(component, rootModule, documentFragment);
    } else {
      const el = documentFragment.querySelectorAll('router-render')[index - 1];
      console.log(555555, el);
      const com = instantiateComponent(component, rootModule, el);
    }
  });
  const domString = domToString(documentFragment);
  console.log(1111, domString);
  return domString.replace(/^(\<div\>)/g, '').replace(/(\<\/div\>$)/g, '');
}

module.exports = renderToString;