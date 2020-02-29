/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Return flexbox spec versions by prefix
module.exports = function(prefix) {
  const spec = (() => {
    if ((prefix === '-webkit- 2009') || (prefix === '-moz-')) {
    return 2009;
  } else if (prefix === '-ms-') {
    return 2012;
  } else if (prefix === '-webkit-') {
    return 'final';
  }
  })();
  if (prefix === '-webkit- 2009') { prefix = '-webkit-'; }

  return [spec, prefix];
};
