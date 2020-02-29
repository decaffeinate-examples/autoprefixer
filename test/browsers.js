/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Browsers = require('../lib/browsers');

const data = require('caniuse-db/data.json').agents;

describe('Browsers', function() {

  describe('.prefixes()', () => it('returns prefixes by default data', () => Browsers.prefixes().should.eql(['-webkit-', '-moz-', '-ms-', '-o-'])));

  describe('.withPrefix()', () => it('finds possible prefix', function() {
    Browsers.withPrefix('1 -o-calc(1)').should.be.true;
    return Browsers.withPrefix('1 calc(1)').should.be.false;
  }));

  describe('parse()', function() {

    it('allows to select no browsers', function() {
      const browsers = new Browsers(data, []);
      return browsers.selected.should.be.empty;
    });

    it('selects by older version', function() {
      const browsers = new Browsers(data, ['ie < 7']);
      return browsers.selected.should.eql(['ie 6', 'ie 5.5']);
  });

    it('combines requirements', function() {
      const browsers = new Browsers(data, ['ie 10', 'ie < 6']);
      return browsers.selected.should.eql(['ie 10', 'ie 5.5']);
  });

    it('has aliases', function() {
      ( new Browsers(data, ['fx 10']) ).selected.should.eql(['firefox 10']);
      return ( new Browsers(data, ['ff 10']) ).selected.should.eql(['firefox 10']);
  });

    it('ignores case', () => ( new Browsers(data, ['Firefox 10']) ).selected.should.eql(['firefox 10']));

    return it('uses browserslist config', function() {
      const css = __dirname + '/cases/config/test.css';
      return ( new Browsers(data, undefined, {from: css}) ).selected.should.eql(['ie 10']);
  });
});

  describe('prefix()', function() {

    it('returns browser prefix', function() {
      const browsers = new Browsers(data, ['chrome 30']);
      return browsers.prefix('chrome 30').should === '-webkit-';
    });

    return it('returns right prefix for Operas', function() {
      const browsers = new Browsers(data, ['last 1 opera version']);
      browsers.prefix('opera 12').should.eql('-o-');
      browsers.prefix(browsers.selected[0]).should.eql('-webkit-');
      browsers.prefix('op_mob 12').should.eql('-o-');
      return browsers.prefix(browsers.selected[0]).should.eql('-webkit-');
    });
  });

  return describe('isSelected()', () => it('return true for selected browsers', function() {
    const browsers = new Browsers(data, ['chrome 30', 'chrome 31']);
    browsers.isSelected('chrome 30').should.be.true;
    return browsers.isSelected('ie 6').should.be.false;
  }));
});
