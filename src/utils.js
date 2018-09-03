function formatInnerHTML(inner) {
  inner = inner.replace(/(\n\s*)/g, '');
  inner = inner.replace(/^[^\S\n]+/gm, '');
  return inner;
}
module.exports = {
  formatInnerHTML
};