const Window = require('window');

const window = new Window();
const document = window.document;
/**
 * DOM to String
 *
 * @returns Function: (ele: node) => string;
 */
const domToString = (() => {
  const DIV = document.createElement('div');

  if ('outerHTML' in DIV) return(ele) => ele.outerHTML;

  return(ele) => {
    const div = DIV.cloneNode();
    div.appendChild(ele.cloneNode(true));
    return div.innerHTML;
  };
})();

module.exports = domToString;
