/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Prefixer = require('./prefixer');

class AtRule extends Prefixer {

  // Clone and add prefixes for at-rule
  add(rule, prefix) {
    const prefixed = prefix + rule.name;

    const already = rule.parent.some(i => (i.name === prefixed) && (i.params === rule.params));
    if (already) { return; }

    const cloned = this.clone(rule, {name: prefixed});
    return rule.parent.insertBefore(rule, cloned);
  }

  // Clone node with prefixes
  process(node) {
    const parent = this.parentPrefix(node);

    return (() => {
      const result = [];
      for (let prefix of Array.from(this.prefixes)) {
        if (parent && (parent !== prefix)) { continue; }
        result.push(this.add(node, prefix));
      }
      return result;
    })();
  }
}

module.exports = AtRule;
