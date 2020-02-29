/* eslint-disable
    max-classes-per-file,
    no-param-reassign,
    no-return-assign,
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
const OldValue = require('../old-value');
const Value = require('../value');
const utils = require('../utils');

class OldFilterValue extends OldValue {
  // Clean -webkit-filter from properties list
  clean(decl) {
    return decl.value = utils.editList(decl.value, (props) => {
      if (props.every((i) => i.indexOf(this.unprefixed) !== 0)) { return props; }
      return props.filter((i) => i.indexOf(this.prefixed) === -1);
    });
  }
}

class FilterValue extends Value {
  static initClass() {
    this.names = ['filter', 'filter-function'];
  }

  constructor(name, prefixes) {
    super(...arguments);
    if (name === 'filter-function') { this.name = 'filter'; }
  }

  // Use prefixed and unprefixed filter for WebKit
  replace(value, prefix) {
    if ((prefix === '-webkit-') && (value.indexOf('filter(') === -1)) {
      if (value.indexOf('-webkit-filter') === -1) {
        return `${super.replace(...arguments)}, ${value}`;
      }
      return value;
    }
    return super.replace(...arguments);
  }

  // Clean -webkit-filter
  old(prefix) {
    return new OldFilterValue(this.name, prefix + this.name);
  }
}
FilterValue.initClass();

module.exports = FilterValue;
