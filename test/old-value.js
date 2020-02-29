/* eslint-disable
    no-undef,
    no-unused-expressions,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const OldValue = require('../lib/old-value');

describe('OldValue', () => describe('.check()', () => {
  it('checks value in string', () => {
    const old = new OldValue('calc', '-o-calc');
    old.check('1px -o-calc(1px)').should.be.true;
    return old.check('1px calc(1px)').should.be.false;
  });

  return it('allows custom checks', () => {
    const old = new OldValue('calc', '-o-calc', 'calc', /calc/);
    return old.check('1px calc(1px)').should.be.true;
  });
}));
