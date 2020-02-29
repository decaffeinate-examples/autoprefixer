/* eslint-disable
    consistent-return,
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
const flexSpec = require('./flex-spec');
const Declaration = require('../declaration');

class FlexWrap extends Declaration {
  static initClass() {
    this.names = ['flex-wrap'];
  }

  // Don't add prefix for 2009 spec
  set(decl, prefix) {
    const spec = flexSpec(prefix)[0];
    if (spec !== 2009) {
      return super.set(...arguments);
    }
  }
}
FlexWrap.initClass();

module.exports = FlexWrap;
