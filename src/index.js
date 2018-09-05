const { factoryModule, factoryCreator } = require('indiv');
const { buildPath, findRoutes, findComponent } = require('./getComponent');

const Window = require('window');

const window = new Window();
const document = window.document;
const Compile = require('./compile');

function renderToString(url, routes, RootModule) {
  const pathList = buildPath(url);
  const rootModule =  factoryModule(RootModule);
  const routesList = findRoutes(pathList, routes, rootModule);
  const componentList = findComponent(routesList, rootModule);

  // render component
  const documentFragment = document.createDocumentFragment();
  componentList.forEach((component, index) => {
    const com = factoryCreator(component, rootModule);
    if (index === 0) {
      new Compile(com, documentFragment);
    } else {
      const el = documentFragment.querySelectorAll('router-render')[0];
      new Compile(com, el);
    }
  });

  console.log(111111111, documentFragment);
  return '11';
}

module.exports = renderToString;