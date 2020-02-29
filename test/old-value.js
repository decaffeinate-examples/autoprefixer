/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const OldValue = require('../lib/old-value');

describe('OldValue', () => describe('.check()', function() {

  it('checks value in string', function() {
    const old = new OldValue('calc', '-o-calc');
    old.check('1px -o-calc(1px)').should.be.true;
    return old.check('1px calc(1px)').should.be.false;
  });

  return it('allows custom checks', function() {
    const old = new OldValue('calc', '-o-calc', 'calc', /calc/);
    return old.check('1px calc(1px)').should.be.true;
  });
}));
