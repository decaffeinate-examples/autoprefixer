/* eslint-disable
    class-methods-use-this,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class Filter extends Declaration {
  static initClass() {
    this.names = ['filter'];
  }

  // Check is it Internet Explorer filter
  check(decl) {
    const v = decl.value;
    return (v.toLowerCase().indexOf('alpha(') === -1)
      && (v.indexOf('DXImageTransform.Microsoft') === -1)
      && (v.indexOf('data:image/svg+xml') === -1);
  }
}
Filter.initClass();

module.exports = Filter;
