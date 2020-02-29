/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class GridRowAlign extends Declaration {
  static initClass() {
    this.names = ['grid-row-align'];
  }

  // Do not prefix flexbox values
  check(decl) {
    return (decl.value.indexOf('flex-') === -1) && (decl.value !== 'baseline');
  }

  // Change property name for IE
  prefixed(prop, prefix) {
    return prefix + 'grid-row-align';
  }

  // Change IE property back
  normalize(prop) {
    return 'align-self';
  }
}
GridRowAlign.initClass();

module.exports = GridRowAlign;
