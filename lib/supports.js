/* eslint-disable
    class-methods-use-this,
    guard-for-in,
    import/no-unresolved,
    import/order,
    max-len,
    no-param-reassign,
    no-restricted-syntax,
    no-return-assign,
    no-underscore-dangle,
    no-use-before-define,
    prefer-const,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const postcss = require('postcss');
const Browsers = require('./browsers');
const brackets = require('./brackets');
const Value = require('./value');
const utils = require('./utils');


const supported = [];
const data = require('caniuse-db/features-json/css-featurequeries.json');

for (const browser in data.stats) {
  const versions = data.stats[browser];
  for (const version in versions) {
    const support = versions[version];
    if (/y/.test(support)) { supported.push(`${browser} ${version}`); }
  }
}

class Supports {
  constructor(Prefixes, all) {
    this.Prefixes = Prefixes;
    this.all = all;
  }

  // Return prefixer only with @supports supported browsers
  prefixer() {
    if (this.prefixerCache) { return this.prefixerCache; }

    const filtered = this.all.browsers.selected.filter((i) => supported.indexOf(i) !== -1);

    const browsers = new Browsers(this.all.browsers.data, filtered, this.all.options);
    return this.prefixerCache = new this.Prefixes(this.all.data, browsers, this.all.options);
  }

  // Parse string into declaration property and value
  parse(str) {
    let [prop, value] = Array.from(str.split(':'));
    if (!value) { value = ''; }
    return [prop.trim(), value.trim()];
  }

  // Create virtual rule to process it by prefixer
  virtual(str) {
    const [prop, value] = Array.from(this.parse(str));
    const rule = postcss.parse('a{}').first;
    rule.append({ prop, value, raws: { before: '' } });
    return rule;
  }

  // Return array of Declaration with all necessary prefixes
  prefixed(str) {
    const rule = this.virtual(str);
    if (this.disabled(rule.first)) { return rule.nodes; }

    const prefixer = this.prefixer().add[rule.first.prop];
    __guardMethod__(prefixer, 'process', (o) => o.process(rule.first));

    for (const decl of Array.from(rule.nodes)) {
      for (const value of Array.from(this.prefixer().values('add', rule.first.prop))) {
        value.process(decl);
      }
      Value.save(this.all, decl);
    }

    return rule.nodes;
  }

  // Return true if brackets node is "not" word
  isNot(node) {
    return (typeof node === 'string') && /not\s*/i.test(node);
  }

  // Return true if brackets node is "or" word
  isOr(node) {
    return (typeof node === 'string') && /\s*or\s*/i.test(node);
  }

  // Return true if brackets node is (prop: value)
  isProp(node) {
    return (typeof node === 'object') && (node.length === 1) && (typeof node[0] === 'string');
  }

  // Return true if prefixed property has no unprefixed
  isHack(all, unprefixed) {
    const check = new RegExp(`(\\(|\\s)${utils.escapeRegexp(unprefixed)}:`);
    return !check.test(all);
  }

  // Return true if we need to remove node
  toRemove(str, all) {
    const [prop, value] = Array.from(this.parse(str));
    const unprefixed = this.all.unprefixed(prop);

    if (__guard__(this.all.cleaner().remove[prop], (x) => x.remove) && !this.isHack(all, unprefixed)) {
      return true;
    }

    for (const checker of Array.from(this.all.cleaner().values('remove', unprefixed))) {
      if (checker.check(value)) {
        return true;
      }
    }

    return false;
  }

  // Remove all unnecessary prefixes
  remove(nodes, all) {
    let i = 0;
    while (i < nodes.length) {
      if (!this.isNot(nodes[i - 1]) && this.isProp(nodes[i]) && this.isOr(nodes[i + 1])) {
        if (this.toRemove(nodes[i][0], all)) {
          nodes.splice(i, 2);
        } else {
          i += 2;
        }
      } else {
        if (typeof nodes[i] === 'object') {
          nodes[i] = this.remove(nodes[i], all);
        }
        i += 1;
      }
    }
    return nodes;
  }

  // Clean brackets with one child
  cleanBrackets(nodes) {
    return nodes.map((i) => {
      if (typeof i === 'object') {
        if ((i.length === 1) && (typeof i[0] === 'object')) {
          return this.cleanBrackets(i[0]);
        }
        return this.cleanBrackets(i);
      }
      return i;
    });
  }

  // Add " or " between properties and convert it to brackets format
  convert(progress) {
    const result = [''];
    for (const i of Array.from(progress)) {
      result.push([`${i.prop}: ${i.value}`]);
      result.push(' or ');
    }
    result[result.length - 1] = '';
    return result;
  }

  // Compress value functions into a string nodes
  normalize(nodes) {
    if (typeof nodes === 'object') {
      nodes = nodes.filter((i) => i !== '');
      if ((typeof nodes[0] === 'string') && (nodes[0].indexOf(':') !== -1)) {
        return [brackets.stringify(nodes)];
      }
      return nodes.map((i) => this.normalize(i));
    }
    return nodes;
  }

  // Add prefixes
  add(nodes, all) {
    return nodes.map((i) => {
      if (this.isProp(i)) {
        const prefixed = this.prefixed(i[0]);
        if (prefixed.length > 1) {
          return this.convert(prefixed);
        }
        return i;
      } if (typeof i === 'object') {
        return this.add(i, all);
      }
      return i;
    });
  }

  // Add prefixed declaration
  process(rule) {
    let ast = brackets.parse(rule.params);
    ast = this.normalize(ast);
    ast = this.remove(ast, rule.params);
    ast = this.add(ast, rule.params);
    ast = this.cleanBrackets(ast);
    return rule.params = brackets.stringify(ast);
  }

  // Check global options
  disabled(node) {
    if (this.all.options.grid === false) {
      if ((node.prop === 'display') && (node.value.indexOf('grid') !== -1)) {
        return true;
      }
      if ((node.prop.indexOf('grid') !== -1) || (node.prop === 'justify-items')) {
        return true;
      }
    }

    if (this.all.options.flexbox === false) {
      if ((node.prop === 'display') && (node.value.indexOf('flex') !== -1)) {
        return true;
      }
      const other = ['order', 'justify-content', 'align-items', 'align-content'];
      if ((node.prop.indexOf('flex') !== -1) || (other.indexOf(node.prop) !== -1)) {
        return true;
      }
    }

    return false;
  }
}

module.exports = Supports;

function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  }
  return undefined;
}
function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
