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

class JustifyContent extends Declaration {
  static initClass() {
    this.names = ['justify-content', 'flex-pack', 'box-pack'];

    this.oldValues = {
      'flex-end': 'end',
      'flex-start': 'start',
      'space-between': 'justify',
      'space-around': 'distribute',
    };
  }

  // Change property name for 2009 and 2012 specs
  prefixed(prop, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if (spec === 2009) {
      return `${prefix}box-pack`;
    } if (spec === 2012) {
      return `${prefix}flex-pack`;
    }
    return super.prefixed(...arguments);
  }

  // Return property name by final spec
  normalize(prop) {
    return 'justify-content';
  }

  // Change value for 2009 and 2012 specs
  set(decl, prefix) {
    const spec = flexSpec(prefix)[0];
    if ((spec === 2009) || (spec === 2012)) {
      const value = JustifyContent.oldValues[decl.value] || decl.value;
      decl.value = value;
      if ((spec !== 2009) || (value !== 'distribute')) { return super.set(decl, prefix); }
    } else if (spec === 'final') {
      return super.set(...arguments);
    }
  }
}
JustifyContent.initClass();

module.exports = JustifyContent;
