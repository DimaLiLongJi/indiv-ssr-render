const Window = require('window');
const { factoryModule } = require('indiv');

const { instantiateComponent } = require('./component');
const { buildPath, findRoutes, findComponent } = require('./router');
const domToString = require('./toString');


const window = new Window();
const document = window.document;

function renderToString(url, routes, RootModule) {
  const pathList = buildPath(url);
  const rootModule =  factoryModule(RootModule);
  const routesList = findRoutes(pathList, routes, rootModule);
  const componentList = findComponent(routesList, rootModule);

  // render component
  const documentFragment = document.createElement('div');

  componentList.forEach((component, index) => {
    if (index === 0) {
      const com = instantiateComponent(component, rootModule, documentFragment);
    } else {
      const el = documentFragment.querySelectorAll('router-render')[index - 1];
      const com = instantiateComponent(component, rootModule, el);
    }
  });

  const domString = domToString(documentFragment);
  return domString.replace(/^(\<div\>)/g, '').replace(/(\<\/div\>$)/g, '');
}

module.exports = renderToString;