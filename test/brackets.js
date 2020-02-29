/* eslint-disable
    no-undef,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const brackets = require('../lib/brackets');

describe('brackets', () => {
  describe('.parse()', () => {
    it('parses simple string', () => brackets.parse('test').should.eql(['test']));

    it('parses brackets', () => brackets.parse('a (b) a').should.eql(['a ', ['b'], ' a']));

    it('parses many brackets', () => brackets.parse('a (b ()) a').should.eql(['a ', ['b ', [''], ''], ' a']));

    return it('parses errors', () => brackets.parse('a (b (').should.eql(['a ', ['b ', ['']]]));
  });

  return describe('.stringify()', () => {
    it('stringifies simple string', () => brackets.stringify(['test']).should.eql('test'));

    it('stringifies brackets', () => brackets.stringify(['a ', ['b'], ' a']).should.eql('a (b) a'));

    return it('stringifies many brackets', () => brackets.stringify(['a ', ['b ', [''], ''], ' a']).should.eql('a (b ()) a'));
  });
});
