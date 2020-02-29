/* eslint-disable
    class-methods-use-this,
    consistent-return,
    max-len,
    no-param-reassign,
    no-restricted-syntax,
    no-unused-vars,
    prefer-rest-params,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class TransformDecl extends Declaration {
  static initClass() {
    this.names = ['transform', 'transform-origin'];

    this.functions3d = ['matrix3d', 'translate3d', 'translateZ', 'scale3d', 'scaleZ',
      'rotate3d', 'rotateX', 'rotateY', 'perspective'];
  }

  // Recursively check all parents for @keyframes
  keyframeParents(decl) {
    let {
      parent,
    } = decl;
    while (parent) {
      if ((parent.type === 'atrule') && (parent.name === 'keyframes')) { return true; }
      ({
        parent,
      } = parent);
    }
    return false;
  }

  // Is transform caontain 3D commands
  contain3d(decl) {
    if (decl.prop === 'transform-origin') { return false; }

    for (const func of Array.from(TransformDecl.functions3d)) {
      if (decl.value.indexOf(`${func}(`) !== -1) {
        return true;
      }
    }

    return false;
  }

  // Replace rotateZ to rotate for IE 9
  set(decl, prefix) {
    decl = super.set(...arguments);
    if (prefix === '-ms-') {
      decl.value = decl.value.replace(/rotateZ/gi, 'rotate');
    }
    return decl;
  }

  // Don't add prefix for IE in keyframes
  insert(decl, prefix, prefixes) {
    if (prefix === '-ms-') {
      if (!this.contain3d(decl) && !this.keyframeParents(decl)) { return super.insert(...arguments); }
    } else if (prefix === '-o-') {
      if (!this.contain3d(decl)) { return super.insert(...arguments); }
    } else {
      return super.insert(...arguments);
    }
  }
}
TransformDecl.initClass();

module.exports = TransformDecl;
