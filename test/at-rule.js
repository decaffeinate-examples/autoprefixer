/* eslint-disable
    import/no-unresolved,
    no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const parse = require('postcss/lib/parse');
const AtRule = require('../lib/at-rule');

describe('AtRule', () => describe('process()', () => it('adds prefixes', () => {
  const keyframes = new AtRule('@keyframes', ['-moz-', '-ms-']);

  const css = parse('@-moz-keyframes b {} @-ms-keyframes a {} @keyframes a {}');
  keyframes.process(css.last);
  return css.toString().should.eql('@-moz-keyframes b {} '
                            + '@-ms-keyframes a {} '
                            + '@-moz-keyframes a {} '
                            + '@keyframes a {}');
})));
