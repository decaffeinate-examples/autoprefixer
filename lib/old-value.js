/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const utils = require('./utils');

class OldValue {
  constructor(unprefixed, prefixed, string, regexp) {
    this.unprefixed = unprefixed;
    this.prefixed = prefixed;
    this.string = string;
    this.regexp = regexp;
    if (!this.regexp) { this.regexp = utils.regexp(this.prefixed); }
    if (!this.string) { this.string = this.prefixed; }
  }

  // Check, that value contain old value
  check(value) {
    if (value.indexOf(this.string) !== -1) {
      return !!value.match(this.regexp);
    } else {
      return false;
    }
  }
}

module.exports = OldValue;
