/* eslint-disable
    class-methods-use-this,
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

class Flex extends Declaration {
  static initClass() {
    this.names = ['flex-grow', 'flex-positive'];
  }

  // Return property name by final spec
  normalize() {
    return 'flex';
  }

  // Return flex property for 2009 and 2012 specs
  prefixed(prop, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if (spec === 2009) {
      return `${prefix}box-flex`;
    } if (spec === 2012) {
      return `${prefix}flex-positive`;
    }
    return super.prefixed(...arguments);
  }
}
Flex.initClass();

module.exports = Flex;
