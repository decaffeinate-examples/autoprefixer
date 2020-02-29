/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Prefixer = require('./prefixer');
const OldValue = require('./old-value');
const utils    = require('./utils');

const vendor = require('postcss/lib/vendor');

class Value extends Prefixer {

  // Clone decl for each prefixed values
  static save(prefixes, decl) {
    const {
      prop
    } = decl;
    return (() => {
      const result = [];
      for (let prefix in decl._autoprefixerValues) {
        const value = decl._autoprefixerValues[prefix];
        if (value === decl.value) { continue; }

        const propPrefix = vendor.prefix(prop);
        if (propPrefix === prefix) {
          result.push(decl.value = value);
        } else if (propPrefix === '-pie-') {
          continue;
        } else {
          var prefixed = prefixes.prefixed(prop, prefix);
          const rule     = decl.parent;
          if (rule.every( i => i.prop !== prefixed)) {
            var trimmed = value.replace(/\s+/, ' ');
            const already = rule.some(i => (i.prop === decl.prop) && (i.value.replace(/\s+/, ' ') === trimmed));

            if (!already) {
              const cloned = this.clone(decl, {value});
              result.push(decl.parent.insertBefore(decl, cloned));
            } else {
              result.push(undefined);
            }
          } else {
            result.push(undefined);
          }
        }
      }
      return result;
    })();
  }

  // Is declaration need to be prefixed
  check(decl) {
    const {
      value
    } = decl;
    if (value.indexOf(this.name) !== -1) {
      return !!value.match(this.regexp());
    } else {
      return false;
    }
  }

  // Lazy regexp loading
  regexp() {
    return this.regexpCache || (this.regexpCache = utils.regexp(this.name));
  }

  // Add prefix to values in string
  replace(string, prefix) {
    return string.replace(this.regexp(), '$1' + prefix + '$2');
  }

  // Get value with comments if it was not changed
  value(decl) {
    if (decl.raws.value && (decl.raws.value.value === decl.value)) {
      return decl.raws.value.raw;
    } else {
      return decl.value;
    }
  }

  // Save values with next prefixed token
  add(decl, prefix) {
    if (!decl._autoprefixerValues) { decl._autoprefixerValues = { }; }
    let value = decl._autoprefixerValues[prefix] || this.value(decl);
    value = this.replace(value, prefix);
    if (value) { return decl._autoprefixerValues[prefix] = value; }
  }

  // Return function to fast find prefixed value
  old(prefix) {
    return new OldValue(this.name, prefix + this.name);
  }
}

module.exports = Value;
