/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const parser = require('postcss-value-parser');
const vendor = require('postcss/lib/vendor');
const list   = require('postcss/lib/list');

class Transition {
  static initClass() {
  
    // Properties to be processed
    this.prototype.props = ['transition', 'transition-property'];
  }
  constructor(prefixes) {
    this.prefixes = prefixes;
  }

  // Process transition and add prefies for all necessary properties
  add(decl, result) {
    let prefix, prop;
    const declPrefixes = (this.prefixes.add[decl.prop] != null ? this.prefixes.add[decl.prop].prefixes : undefined) || [];

    let params = this.parse(decl.value);
    const names  = params.map(i => this.findProp(i));
    const added  = [];

    if (names.some(i => i[0] === '-')) { return; }

    for (let param of Array.from(params)) {
      prop = this.findProp(param);
      if (prop[0] === '-') { continue; }
      const prefixer = this.prefixes.add[prop];
      if (!(prefixer != null ? prefixer.prefixes : undefined)) { continue; }

      for (prefix of Array.from(prefixer.prefixes)) {
        const prefixed = this.prefixes.prefixed(prop, prefix);
        if ((prefixed !== '-ms-transform') && (names.indexOf(prefixed) === -1)) {
          if (!this.disabled(prop, prefix)) {
            added.push(this.clone(prop, prefixed, param));
          }
        }
      }
    }

    params = params.concat(added);
    const value  = this.stringify(params);

    const webkitClean = this.stringify(this.cleanFromUnprefixed(params, '-webkit-'));
    if (declPrefixes.indexOf('-webkit-') !== -1) {
      this.cloneBefore(decl, '-webkit-' + decl.prop, webkitClean);
    }
    this.cloneBefore(decl, decl.prop, webkitClean);
    if (declPrefixes.indexOf('-o-') !== -1) {
      const operaClean = this.stringify(this.cleanFromUnprefixed(params, '-o-'));
      this.cloneBefore(decl, '-o-' + decl.prop, operaClean);
    }

    for (prefix of Array.from(declPrefixes)) {
      if ((prefix !== '-webkit-') && (prefix !== '-o-')) {
        const prefixValue = this.stringify(this.cleanOtherPrefixes(params, prefix));
        this.cloneBefore(decl, prefix + decl.prop, prefixValue);
      }
    }

    if ((value !== decl.value) && !this.already(decl, decl.prop, value)) {
      this.checkForWarning(result, decl);
      decl.cloneBefore();
      return decl.value = value;
    }
  }

  // Find property name
  findProp(param) {
    const prop = param[0].value;
    if (/^\d/.test(prop)) {
      for (let i = 0; i < param.length; i++) {
        const token = param[i];
        if ((i !== 0) && (token.type === 'word')) {
          return token.value;
        }
      }
    }
    return prop;
  }

  // Does we aready have this declaration
  already(decl, prop, value) {
    return decl.parent.some(i => (i.prop === prop) && (i.value === value));
  }

  // Add declaration if it is not exist
  cloneBefore(decl, prop, value) {
    if (!this.already(decl, prop, value)) {
      return decl.cloneBefore({prop, value});
    }
  }

  // Show transition-property warning
  checkForWarning(result, decl) {
    if (decl.prop === 'transition-property') {
      return decl.parent.each(function(i) {
        if (i.type !== 'decl') { return; }
        if (i.prop.indexOf('transition-') !== 0) { return; }
        if (i.prop === 'transition-property') { return; }

        if (list.comma(i.value).length > 1) {
          decl.warn(result, 'Replace transition-property to transition, ' +
                            'because Autoprefixer could not support ' +
                            'any cases of transition-property ' +
                            'and other transition-*');
        }
        return false;
      });
    }
  }

  // Process transition and remove all unnecessary properties
  remove(decl) {
    let params = this.parse(decl.value);
    params = params.filter(i => !__guard__(this.prefixes.remove[this.findProp(i)], x => x.remove));
    const value  = this.stringify(params);

    if (decl.value === value) { return; }

    if (params.length === 0) {
      decl.remove();
      return;
    }

    const double  = decl.parent.some(i => (i.prop === decl.prop) && (i.value === value));
    const smaller = decl.parent.some(i => (i !== decl) && (i.prop === decl.prop) && (i.value.length > value.length));

    if (double || smaller) {
      return decl.remove();
    } else {
      return decl.value = value;
    }
  }

  // Parse properties list to array
  parse(value) {
    const ast    = parser(value);
    const result = [];
    let param  = [];
    for (let node of Array.from(ast.nodes)) {
      param.push(node);
      if ((node.type === 'div') && (node.value === ',')) {
        result.push(param);
        param = [];
      }
    }
    result.push(param);
    return result.filter(i => i.length > 0);
  }

  // Return properties string from array
  stringify(params) {
    if (params.length === 0) { return ''; }
    let nodes = [];
    for (let param of Array.from(params)) {
      if (param[param.length - 1].type !== 'div') {
        param.push(this.div(params));
      }
      nodes = nodes.concat(param);
    }
    if (nodes[0].type === 'div') {
      nodes = nodes.slice(1);
    }
    if (nodes[nodes.length - 1].type === 'div') {
      nodes = nodes.slice(0, +-2 + 1 || undefined);
    }
    return parser.stringify({ nodes });
  }

  // Return new param array with different name
  clone(origin, name, param) {
    const result  = [];
    let changed = false;
    for (let i of Array.from(param)) {
      if (!changed && (i.type === 'word') && (i.value === origin)) {
        result.push({type: 'word', value: name});
        changed = true;
      } else {
        result.push(i);
      }
    }
    return result;
  }

  // Find or create seperator
  div(params) {
    for (let param of Array.from(params)) {
      for (let node of Array.from(param)) {
        if ((node.type === 'div') && (node.value === ',')) {
          return node;
        }
      }
    }
    return { type: 'div', value: ',', after: ' ' };
  }

  cleanOtherPrefixes(params, prefix) {
    return params.filter(param => {
      const current = vendor.prefix(this.findProp(param));
      return (current === '') || (current === prefix);
    });
  }

  // Remove all non-webkit prefixes and unprefixed params if we have prefixed
  cleanFromUnprefixed(params, prefix) {
    const result = [];
    const remove = params
      .map(i => this.findProp(i))
      .filter(i => i.slice(0, prefix.length) === prefix)
      .map(i => this.prefixes.unprefixed(i));
    for (let param of Array.from(params)) {
      const prop = this.findProp(param);
      const p    = vendor.prefix(prop);
      if ((remove.indexOf(prop) === -1) && ((p === prefix) || (p === ''))) {
        result.push(param);
      }
    }
    return result;
  }

  // Check property for disabled by option
  disabled(prop, prefix) {
    const other = ['order', 'justify-content', 'align-self', 'align-content'];
    if ((prop.indexOf('flex') !== -1) || (other.indexOf(prop) !== -1)) {
      if (this.prefixes.options.flexbox === false) {
        return true;
      } else if (this.prefixes.options.flexbox === 'no-2009') {
        return prefix.indexOf('2009') !== -1;
      }
    }
  }
}
Transition.initClass();

module.exports = Transition;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}