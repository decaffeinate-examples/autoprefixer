/* eslint-disable
    class-methods-use-this,
    prefer-rest-params,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Selector = require('../selector');

class Placeholder extends Selector {
  static initClass() {
    this.names = [':placeholder-shown', '::placeholder'];
  }

  // Add old mozilla to possible prefixes
  possible() {
    return super.possible(...arguments).concat('-moz- old');
  }

  // Return different selectors depend on prefix
  prefixed(prefix) {
    if (prefix === '-webkit-') {
      return '::-webkit-input-placeholder';
    } if (prefix === '-ms-') {
      return ':-ms-input-placeholder';
    } if (prefix === '-moz- old') {
      return ':-moz-placeholder';
    }
    return `::${prefix}placeholder`;
  }
}
Placeholder.initClass();

module.exports = Placeholder;
