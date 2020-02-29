/* eslint-disable
    consistent-return,
    func-names,
    no-param-reassign,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Return flexbox spec versions by prefix
module.exports = function (prefix) {
  const spec = (() => {
    if ((prefix === '-webkit- 2009') || (prefix === '-moz-')) {
      return 2009;
    } if (prefix === '-ms-') {
      return 2012;
    } if (prefix === '-webkit-') {
      return 'final';
    }
  })();
  if (prefix === '-webkit- 2009') { prefix = '-webkit-'; }

  return [spec, prefix];
};
