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

class BlockLogical extends Declaration {
  static initClass() {
    this.names = ['border-block-start', 'border-block-end',
      'margin-block-start', 'margin-block-end',
      'padding-block-start', 'padding-block-end',
      'border-before', 'border-after',
      'margin-before', 'margin-after',
      'padding-before', 'padding-after'];
  }

  // Use old syntax for -moz- and -webkit-
  prefixed(prop, prefix) {
    return prefix + (prop.indexOf('-start') !== -1
      ? prop.replace('-block-start', '-before')
      : prop.replace('-block-end', '-after'));
  }

  // Return property name by spec
  normalize(prop) {
    if (prop.indexOf('-before') !== -1) {
      return prop.replace('-before', '-block-start');
    }
    return prop.replace('-after', '-block-end');
  }
}
BlockLogical.initClass();

module.exports = BlockLogical;
