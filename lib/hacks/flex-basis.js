/* eslint-disable
    class-methods-use-this,
    consistent-return,
    no-param-reassign,
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

class FlexBasis extends Declaration {
  static initClass() {
    this.names = ['flex-basis', 'flex-preferred-size'];
  }

  // Return property name by final spec
  normalize() {
    return 'flex-basis';
  }

  // Return flex property for 2012 spec
  prefixed(prop, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if (spec === 2012) {
      return `${prefix}flex-preferred-size`;
    }
    return super.prefixed(...arguments);
  }

  // Ignore 2009 spec and use flex property for 2012
  set(decl, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if ((spec === 2012) || (spec === 'final')) {
      return super.set(...arguments);
    }
  }
}
FlexBasis.initClass();

module.exports = FlexBasis;
