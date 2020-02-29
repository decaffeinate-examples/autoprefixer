/* eslint-disable
    class-methods-use-this,
    consistent-return,
    no-empty,
    no-param-reassign,
    no-unused-vars,
    prefer-rest-params,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class BreakProps extends Declaration {
  static initClass() {
    this.names = ['break-inside', 'page-break-inside', 'column-break-inside',
      'break-before', 'page-break-before', 'column-break-before',
      'break-after', 'page-break-after', 'column-break-after'];
  }

  // Change name for -webkit- and -moz- prefix
  prefixed(prop, prefix) {
    if (prefix === '-webkit-') {
      return `-webkit-column-${prop}`;
    } if (prefix === '-moz-') {
      return `page-${prop}`;
    }
    return super.prefixed(...arguments);
  }

  // Return property name by final spec
  normalize(prop) {
    if (prop.indexOf('inside') !== -1) {
      return 'break-inside';
    } if (prop.indexOf('before') !== -1) {
      return 'break-before';
    } if (prop.indexOf('after') !== -1) {
      return 'break-after';
    }
  }

  // Change prefixed value for avoid-column and avoid-page
  set(decl, prefix) {
    const v = decl.value;
    if (((decl.prop === 'break-inside') && (v === 'avoid-column')) || (v === 'avoid-page')) {
      decl.value = 'avoid';
    }
    return super.set(...arguments);
  }

  // Don’t prefix some values
  insert(decl, prefix, prefixes) {
    if (decl.prop !== 'break-inside') {
      return super.insert(...arguments);
    } if (decl.value === 'avoid-region') {

    } else if ((decl.value === 'avoid-page') && (prefix === '-webkit-')) {

    } else {
      return super.insert(...arguments);
    }
  }
}
BreakProps.initClass();

module.exports = BreakProps;
