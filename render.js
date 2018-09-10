const renderToString = require('./src');
const ssrData = require('./dist/main');

const render = (url) => {
  const content = renderToString(url, ssrData.default.routes, ssrData.default.inDiv);
  return content;
}

module.exports = render;