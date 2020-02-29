/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Declaration = require('../declaration');

class BorderRadius extends Declaration {
  static initClass() {
    this.names     = ['border-radius'];
  
    this.toMozilla = { };
    this.toNormal  = { };
    for (let ver of ['top', 'bottom']) {
      for (let hor of ['left', 'right']) {
        const normal  = `border-${ver}-${hor}-radius`;
        const mozilla = `border-radius-${ver}${hor}`;
  
        this.names.push(normal);
        this.names.push(mozilla);
  
        this.toMozilla[normal] = mozilla;
        this.toNormal[mozilla] = normal;
      }
    }
  }

  // Change syntax, when add Mozilla prefix
  prefixed(prop, prefix) {
    if (prefix === '-moz-') {
      return prefix + (BorderRadius.toMozilla[prop] || prop);
    } else {
      return super.prefixed(...arguments);
    }
  }

  // Return unprefixed version of property
  normalize(prop) {
    return BorderRadius.toNormal[prop] || prop;
  }
}
BorderRadius.initClass();

module.exports = BorderRadius;
