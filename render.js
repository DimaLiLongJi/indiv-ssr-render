const renderToString = require('./src');
const { ssrData } = require('./dist/main');

const routes = ssrData.routes;
const RootModule = ssrData.RootModule;

const render = (url) => {
  const content = renderToString(url, routes, RootModule);
  return content;
}

module.exports = render;