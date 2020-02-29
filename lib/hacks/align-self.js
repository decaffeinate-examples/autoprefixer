/* eslint-disable
    class-methods-use-this,
    consistent-return,
    no-param-reassign,
    no-unused-vars,
    prefer-rest-params,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const flexSpec = require('./flex-spec');
const Declaration = require('../declaration');

class AlignSelf extends Declaration {
  static initClass() {
    this.names = ['align-self', 'flex-item-align'];

    this.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
    };
  }

  // Change property name for 2012 specs
  prefixed(prop, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if (spec === 2012) {
      return `${prefix}flex-item-align`;
    }
    return super.prefixed(...arguments);
  }

  // Return property name by final spec
  normalize(prop) {
    return 'align-self';
  }

  // Change value for 2012 spec and ignore prefix for 2009
  set(decl, prefix) {
    const spec = flexSpec(prefix)[0];
    if (spec === 2012) {
      decl.value = AlignSelf.oldValues[decl.value] || decl.value;
      return super.set(decl, prefix);
    } if (spec === 'final') {
      return super.set(...arguments);
    }
  }
}
AlignSelf.initClass();

module.exports = AlignSelf;
