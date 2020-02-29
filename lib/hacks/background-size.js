/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class BackgroundSize extends Declaration {
  static initClass() {
    this.names = ['background-size'];
  }

  // Duplication parameter for -webkit- browsers
  set(decl, prefix) {
    const value = decl.value.toLowerCase();
    if ((prefix === '-webkit-') && (value.indexOf(' ') === -1) &&
       (value !== 'contain') && (value !== 'cover')) {
      decl.value = decl.value + ' ' + decl.value;
    }
    return super.set(decl, prefix);
  }
}
BackgroundSize.initClass();

module.exports = BackgroundSize;
