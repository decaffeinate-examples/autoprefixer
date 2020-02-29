/* eslint-disable
    import/no-unresolved,
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
const list = require('postcss/lib/list');

const Value = require('../value');

class ImageSet extends Value {
  static initClass() {
    this.names = ['image-set'];
  }

  // Use non-standard name for WebKit and Firefox
  replace(string, prefix) {
    if (prefix === '-webkit-') {
      return super.replace(...arguments).replace(/("[^"]+"|'[^']+')(\s+\d+\w)/gi, 'url($1)$2');
    }
    return super.replace(...arguments);
  }
}
ImageSet.initClass();

module.exports = ImageSet;
