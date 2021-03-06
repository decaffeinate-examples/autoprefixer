/* eslint-disable
    import/no-unresolved,
    no-param-reassign,
    no-restricted-syntax,
    no-useless-escape,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const list = require('postcss/lib/list');

module.exports = {

  // Throw special error, to tell beniary, that this error is from Autoprefixer.
  error(text) {
    const err = new Error(text);
    err.autoprefixer = true;
    throw err;
  },

  // Return array, that doesn’t contain duplicates.
  uniq(array) {
    const filtered = [];
    for (const i of Array.from(array)) {
      if (filtered.indexOf(i) === -1) { filtered.push(i); }
    }
    return filtered;
  },

  // Return "-webkit-" on "-webkit- old"
  removeNote(string) {
    if (string.indexOf(' ') === -1) {
      return string;
    }
    return string.split(' ')[0];
  },

  // Escape RegExp symbols
  escapeRegexp(string) {
    return string.replace(/[.?*+\^\$\[\]\\(){}|\-]/g, '\\$&');
  },

  // Return regexp to check, that CSS string contain word
  regexp(word, escape) {
    if (escape == null) { escape = true; }
    if (escape) { word = this.escapeRegexp(word); }
    return new RegExp(`(^|[\\s,(])(${word}($|[\\s(,]))`, 'gi');
  },

  // Change comma list
  editList(value, callback) {
    const origin = list.comma(value);
    const changed = callback(origin, []);

    if (origin === changed) {
      return value;
    }
    let join = value.match(/,\s*/);
    join = join ? join[0] : ', ';
    return changed.join(join);
  },
};
