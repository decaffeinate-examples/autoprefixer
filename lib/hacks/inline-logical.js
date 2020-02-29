/* eslint-disable
    class-methods-use-this,
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

class InlineLogical extends Declaration {
  static initClass() {
    this.names = ['border-inline-start', 'border-inline-end',
      'margin-inline-start', 'margin-inline-end',
      'padding-inline-start', 'padding-inline-end',
      'border-start', 'border-end',
      'margin-start', 'margin-end',
      'padding-start', 'padding-end'];
  }

  // Use old syntax for -moz- and -webkit-
  prefixed(prop, prefix) {
    return prefix + prop.replace('-inline', '');
  }

  // Return property name by spec
  normalize(prop) {
    return prop.replace(/(margin|padding|border)-(start|end)/, '$1-inline-$2');
  }
}
InlineLogical.initClass();

module.exports = InlineLogical;
