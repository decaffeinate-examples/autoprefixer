/* eslint-disable
    import/no-unresolved,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const list = require('postcss/lib/list');
const OldValue = require('../old-value');
const Value = require('../value');
const utils = require('../utils');

class CrossFade extends Value {
  static initClass() {
    this.names = ['cross-fade'];
  }

  replace(string, prefix) {
    return list.space(string)
      .map((value) => {
        if (value.slice(0, +this.name.length + 1 || undefined) !== (`${this.name}(`)) { return value; }

        const close = value.lastIndexOf(')');
        const after = value.slice(close + 1);
        let args = value.slice(this.name.length + 1, +(close - 1) + 1 || undefined);

        if (prefix === '-webkit-') {
          const match = args.match(/\d*.?\d+%?/);
          if (match) {
            args = args.slice(match[0].length).trim();
            args += `, ${match[0]}`;
          } else {
            args += ', 0.5';
          }
        }
        return `${prefix + this.name}(${args})${after}`;
      }).join(' ');
  }
}
CrossFade.initClass();

module.exports = CrossFade;
