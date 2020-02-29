/* eslint-disable
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
const Declaration = require('../declaration');

class MaskBorder extends Declaration {
  static initClass() {
    this.names = ['mask-border', 'mask-border-source',
      'mask-border-slice', 'mask-border-width',
      'mask-border-outset', 'mask-border-repeat',
      'mask-box-image', 'mask-box-image-source',
      'mask-box-image-slice', 'mask-box-image-width',
      'mask-box-image-outset', 'mask-box-image-repeat'];
  }

  // Return property name by final spec
  normalize() {
    return this.name.replace('box-image', 'border');
  }

  // Return flex property for 2012 spec
  prefixed(prop, prefix) {
    if (prefix === '-webkit-') {
      return super.prefixed(...arguments).replace('border', 'box-image');
    }
    return super.prefixed(...arguments);
  }
}
MaskBorder.initClass();

module.exports = MaskBorder;
