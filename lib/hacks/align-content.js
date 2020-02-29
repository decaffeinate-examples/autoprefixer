/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const flexSpec    = require('./flex-spec');
const Declaration = require('../declaration');

class AlignContent extends Declaration {
  static initClass() {
    this.names = ['align-content', 'flex-line-pack'];
  
    this.oldValues = {
      'flex-end':      'end',
      'flex-start':    'start',
      'space-between': 'justify',
      'space-around':  'distribute'
    };
  }

  // Change property name for 2012 spec
  prefixed(prop, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if (spec === 2012) {
      return prefix + 'flex-line-pack';
    } else {
      return super.prefixed(...arguments);
    }
  }

  // Return property name by final spec
  normalize(prop) {
    return 'align-content';
  }

  // Change value for 2012 spec and ignore prefix for 2009
  set(decl, prefix) {
    const spec = flexSpec(prefix)[0];
    if (spec === 2012) {
      decl.value = AlignContent.oldValues[decl.value] || decl.value;
      return super.set(decl, prefix);
    } else if (spec === 'final') {
      return super.set(...arguments);
    }
  }
}
AlignContent.initClass();

module.exports = AlignContent;
