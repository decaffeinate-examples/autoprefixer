/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class WritingMode extends Declaration {
  static initClass() {
    this.names = ['writing-mode'];
  
    this.msValues = {
      'horizontal-tb': 'lr-tb',
      'vertical-rl':   'tb-rl',
      'vertical-lr':   'tb-lr'
    };
  }

  set(decl, prefix) {
    if (prefix === '-ms-') {
      decl.value = WritingMode.msValues[decl.value] || decl.value;
      return super.set(decl, prefix);
    } else {
      return super.set(...arguments);
    }
  }
}
WritingMode.initClass();

module.exports = WritingMode;
