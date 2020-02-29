/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const flexSpec    = require('./flex-spec');
const Declaration = require('../declaration');

class FlexShrink extends Declaration {
  static initClass() {
    this.names = ['flex-shrink', 'flex-negative'];
  }

  // Return property name by final spec
  normalize() {
    return 'flex-shrink';
  }

  // Return flex property for 2012 spec
  prefixed(prop, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if (spec === 2012) {
      return prefix + 'flex-negative';
    } else {
      return super.prefixed(...arguments);
    }
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
FlexShrink.initClass();

module.exports = FlexShrink;
