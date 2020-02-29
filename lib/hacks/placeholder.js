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
    if ('-webkit-' === prefix) {
      return '::-webkit-input-placeholder';
    } else if ('-ms-' === prefix) {
      return ':-ms-input-placeholder';
    } else if ('-moz- old' === prefix) {
      return ':-moz-placeholder';
    } else {
      return `::${ prefix }placeholder`;
    }
  }
}
Placeholder.initClass();

module.exports = Placeholder;
