/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Prefixer = require('./prefixer');
const utils    = require('./utils');

const n2f = require('num2fraction');

const regexp = /(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpi)/gi;
const split  = /(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpi)/i;

class Resolution extends Prefixer {

  // Return prefixed query name
  prefixName(prefix, name) {
    return name = prefix === '-moz-' ?
      name + '--moz-device-pixel-ratio'
    :
      prefix + name + '-device-pixel-ratio';
  }

  // Return prefixed query
  prefixQuery(prefix, name, colon, value, units) {
    if (units === 'dpi') { value = Number(value / 96); }
    if (prefix === '-o-') { value = n2f(value); }
    return this.prefixName(prefix, name) + colon + value;
  }

  // Remove prefixed queries
  clean(rule) {
    if (!this.bad) {
      this.bad = [];
      for (let prefix of Array.from(this.prefixes)) {
        this.bad.push( this.prefixName(prefix, 'min') );
        this.bad.push( this.prefixName(prefix, 'max') );
      }
    }

    return rule.params = utils.editList(rule.params, queries => {
      return queries.filter(query => this.bad.every( i => query.indexOf(i) === -1));
    });
  }

  // Add prefixed queries
  process(rule) {
    const parent   = this.parentPrefix(rule);
    const prefixes = parent ? [parent] : this.prefixes;

    return rule.params = utils.editList(rule.params, (origin, prefixed) => {
      for (let query of Array.from(origin)) {
        if ((query.indexOf('min-resolution') === -1) &&
           (query.indexOf('max-resolution') === -1)) {
          prefixed.push(query);
          continue;
        }

        for (var prefix of Array.from(prefixes)) {
          if ((prefix === '-moz-') && (rule.params.indexOf('dpi') !== -1)) {
            continue;
          } else {
            const processed = query.replace(regexp, str => {
              const parts = str.match(split);
              return this.prefixQuery(prefix, parts[1], parts[2], parts[3], parts[4]);
            });
            prefixed.push(processed);
          }
        }
        prefixed.push(query);
      }

      return utils.uniq(prefixed);
    });
  }
}

module.exports = Resolution;
