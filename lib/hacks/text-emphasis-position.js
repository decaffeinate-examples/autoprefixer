/* eslint-disable
    no-param-reassign,
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

class TextEmphasisPosition extends Declaration {
  static initClass() {
    this.names = ['text-emphasis-position'];
  }

  set(decl, prefix) {
    if (prefix === '-webkit-') {
      decl.value = decl.value.replace(/\s*(right|left)\s*/i, '');
      return super.set(decl, prefix);
    }
    return super.set(...arguments);
  }
}
TextEmphasisPosition.initClass();

module.exports = TextEmphasisPosition;
