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
              'break-after',  'page-break-after',  'column-break-after'];
  }

  // Change name for -webkit- and -moz- prefix
  prefixed(prop, prefix) {
    if (prefix === '-webkit-') {
      return '-webkit-column-' + prop;
    } else if (prefix === '-moz-') {
      return 'page-' + prop;
    } else {
      return super.prefixed(...arguments);
    }
  }

  // Return property name by final spec
  normalize(prop) {
    if (prop.indexOf('inside') !== -1) {
      return 'break-inside';
    } else if (prop.indexOf('before') !== -1) {
      return 'break-before';
    } else if (prop.indexOf('after') !== -1) {
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
    } else if (decl.value === 'avoid-region') {
      return;
    } else if ((decl.value === 'avoid-page') && (prefix === '-webkit-')) {
      return;
    } else {
      return super.insert(...arguments);
    }
  }
}
BreakProps.initClass();

module.exports = BreakProps;
