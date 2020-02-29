/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const OldValue = require('../old-value');
const Value    = require('../value');

class FlexValues extends Value {
  static initClass() {
    this.names = ['flex', 'flex-grow', 'flex-shrink', 'flex-basis'];
  }

  // Return prefixed property name
  prefixed(prefix) {
    return this.all.prefixed(this.name, prefix);
  }

  // Change property name to prefixed property name
  replace(string, prefix) {
    return string.replace(this.regexp(), '$1' + this.prefixed(prefix) + '$3');
  }

  // Return function to fast prefixed property name
  old(prefix) {
    return new OldValue(this.name, this.prefixed(prefix));
  }
}
FlexValues.initClass();

module.exports = FlexValues;
