/* eslint-disable
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
const OldValue = require('../old-value');
const Value = require('../value');

class Stretch extends Value {
  static initClass() {
    this.names = ['stretch', 'fill', 'fill-available'];
  }

  // Different prefix for WebKit and Firefox
  replace(string, prefix) {
    if (prefix === '-moz-') {
      return string.replace(this.regexp(), '$1-moz-available$3');
    } if (prefix === '-webkit-') {
      return string.replace(this.regexp(), '$1-webkit-fill-available$3');
    }
    return super.replace(...arguments);
  }

  // Different name for WebKit and Firefox
  old(prefix) {
    if (prefix === '-moz-') {
      return new OldValue(this.name, '-moz-available');
    } if (prefix === '-webkit-') {
      return new OldValue(this.name, '-webkit-fill-available');
    }
    return super.old(...arguments);
  }
}
Stretch.initClass();

module.exports = Stretch;
