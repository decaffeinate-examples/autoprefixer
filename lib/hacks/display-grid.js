/* eslint-disable
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
const flexSpec = require('./flex-spec');
const OldValue = require('../old-value');
const Value = require('../value');

class DisplayGrid extends Value {
  static initClass() {
    this.names = ['display-grid', 'inline-grid'];
  }

  constructor(name, prefixes) {
    super(...arguments);
    if (name === 'display-grid') { this.name = 'grid'; }
  }

  // Faster check for flex value
  check(decl) {
    return (decl.prop === 'display') && (decl.value === this.name);
  }
}
DisplayGrid.initClass();

module.exports = DisplayGrid;
