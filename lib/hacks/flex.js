/* eslint-disable
    class-methods-use-this,
    import/no-unresolved,
    no-param-reassign,
    prefer-destructuring,
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
const list = require('postcss/lib/list');
const flexSpec = require('./flex-spec');
const Declaration = require('../declaration');


class Flex extends Declaration {
  static initClass() {
    this.names = ['flex', 'box-flex'];

    this.oldValues = {
      auto: '1',
      none: '0',
    };
  }

  // Change property name for 2009 spec
  prefixed(prop, prefix) {
    let spec;
    [spec, prefix] = Array.from(flexSpec(prefix));
    if (spec === 2009) {
      return `${prefix}box-flex`;
    }
    return super.prefixed(...arguments);
  }

  // Return property name by final spec
  normalize() {
    return 'flex';
  }

  // Spec 2009 supports only first argument
  // Spec 2012 disallows unitless basis
  set(decl, prefix) {
    const spec = flexSpec(prefix)[0];
    if (spec === 2009) {
      decl.value = list.space(decl.value)[0];
      decl.value = Flex.oldValues[decl.value] || decl.value;
      return super.set(decl, prefix);
    } if (spec === 2012) {
      const components = list.space(decl.value);
      if ((components.length === 3) && (components[2] === '0')) {
        decl.value = components.slice(0, 2).concat('0px').join(' ');
      }
      return super.set(decl, prefix);
    }
    return super.set(...arguments);
  }
}
Flex.initClass();

module.exports = Flex;
