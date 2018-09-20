const renderToString = require('./src');

const render = (url) => {
  const ssrData = require('./dist/main');
  const content = renderToString(url, ssrData.default.routes, ssrData.default.inDiv);
  return content;
}

module.exports = render;