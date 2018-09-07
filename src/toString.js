const Window = require('window');

const window = new Window();
const document = window.document;

const domToString = (() => {
  const DIV = document.createElement("div");

  if ('outerHTML' in DIV)
    return(node) => node.outerHTML;

  return(node) => {
    const div = DIV.cloneNode();
    div.appendChild(node.cloneNode(true));
    return div.innerHTML;
  };
})();

module.exports = domToString;
