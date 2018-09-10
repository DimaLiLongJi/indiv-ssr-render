const Window = require('window');

const instantiateComponent = require('./component');
const domToString = require('./toString');
const { buildPath, findRoutes, findComponent } = require('./router');


const window = new Window();
const document = window.document;
/**
 * InDiv render DOM to string
 *
 * @param {string} url
 * @param {array<Route>} routes
 * @param {InDiv} indiv
 * @returns string
 */
function renderToString(url, routes, indiv) {
  const rootModule = indiv.$rootModule;
  const routeDOMKey = indiv.$routeDOMKey;

  const pathList = buildPath(url);
  const routesList = findRoutes(pathList, routes, rootModule);
  const componentList = findComponent(routesList, rootModule);

  // render component
  const documentFragment = document.createElement('div');

  componentList.forEach((component, index) => {
    if (index === 0) {
      const com = instantiateComponent(component, rootModule, documentFragment, routeDOMKey);
    } else {
      const el = documentFragment.querySelectorAll(routeDOMKey)[index - 1];
      const com = instantiateComponent(component, rootModule, el, routeDOMKey);
    }
  });

  const domString = domToString(documentFragment);
  return domString.replace(/^(\<div\>)/g, '').replace(/(\<\/div\>$)/g, '');
}

module.exports = renderToString;