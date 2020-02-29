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
const Selector = require('../selector');

class Fullscreen extends Selector {
  static initClass() {
    this.names = [':fullscreen'];
  }

  // Return different selectors depend on prefix
  prefixed(prefix) {
    if (prefix === '-webkit-') {
      return ':-webkit-full-screen';
    } if (prefix === '-moz-') {
      return ':-moz-full-screen';
    }
    return `:${prefix}fullscreen`;
  }
}
Fullscreen.initClass();

module.exports = Fullscreen;
