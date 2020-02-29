/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Selector = require('../selector');

class Fullscreen extends Selector {
  static initClass() {
    this.names = [':fullscreen'];
  }

  // Return different selectors depend on prefix
  prefixed(prefix) {
    if ('-webkit-' === prefix) {
      return ':-webkit-full-screen';
    } else if ('-moz-' === prefix) {
      return ':-moz-full-screen';
    } else {
      return `:${ prefix }fullscreen`;
    }
  }
}
Fullscreen.initClass();

module.exports = Fullscreen;
