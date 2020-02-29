/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class BorderImage extends Declaration {
  static initClass() {
    this.names = ['border-image'];
  }

  // Remove fill parameter for prefixed declarations
  set(decl, prefix) {
    decl.value = decl.value.replace(/\s+fill(\s)/, '$1');
    return super.set(decl, prefix);
  }
}
BorderImage.initClass();

module.exports = BorderImage;
