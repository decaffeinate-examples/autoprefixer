/* eslint-disable
    global-require,
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
const browserslist = require('browserslist');
const Browsers = require('../lib/browsers');
const Prefixes = require('../lib/prefixes');
const info = require('../lib/info');

const data = {
  browsers: require('caniuse-db/data.json').agents,
  prefixes: {
    a: {
      browsers: ['firefox 21', 'firefox 20', 'chrome 30'],
      transition: true,
    },
    b: {
      browsers: ['ie 6', 'firefox 20'],
      props: ['a', '*'],
    },
    c: {
      browsers: ['firefox 21'],
      props: ['c'],
    },
    d: {
      browsers: ['firefox 21'],
      selector: true,
    },
    '@keyframes': {
      browsers: ['firefox 21'],
    },
    transition: {
      browsers: ['firefox 21'],
    },
  },
};

describe('info', () => {
  it('returns selected browsers and prefixes', () => {
    const browsers = new Browsers(data.browsers,
      ['chrome 30', 'firefox 21', 'firefox 20', 'ie 6']);
    const prefixes = new Prefixes(data.prefixes, browsers);

    const coverage = browserslist.coverage(
      ['chrome 30', 'firefox 21', 'firefox 20', 'ie 6'],
    );
    const round = Math.round(coverage * 100) / 100.0;

    return info(prefixes).should.eql('Browsers:\n'
                              + '  Chrome: 30\n'
                              + '  Firefox: 21, 20\n'
                              + '  IE: 6\n'
                              + '\n'
                              + `These browsers account for ${round}% `
                                + 'of all users globally\n'
                              + '\n'
                              + 'At-Rules:\n'
                              + '  @keyframes: moz\n'
                              + '\n'
                              + 'Selectors:\n'
                              + '  d: moz\n'
                              + '\n'
                              + 'Properties:\n'
                              + '  a: webkit, moz\n'
                              + '  transition: moz\n'
                              + '\n'
                              + 'Values:\n'
                              + '  b: moz, ms\n'
                              + '  c: moz\n');
  });

  it("doesn't show transitions unless they are necessary", () => {
    const browsers = new Browsers(data.browsers, ['chrome 30', 'firefox 20', 'ie 6']);
    const prefixes = new Prefixes(data.prefixes, browsers);

    const coverage = browserslist.coverage(['chrome 30', 'firefox 20', 'ie 6']);
    const round = Math.round(coverage * 100) / 100.0;

    return info(prefixes).should.eql('Browsers:\n'
                              + '  Chrome: 30\n'
                              + '  Firefox: 20\n'
                              + '  IE: 6\n'
                              + '\n'
                              + `These browsers account for ${round}% `
                                + 'of all users globally\n'
                              + '\n'
                              + 'Properties:\n'
                              + '  a: webkit, moz\n'
                              + '\n'
                              + 'Values:\n'
                              + '  b: moz, ms\n');
  });

  it('returns string for empty prefixes', () => {
    const browsers = new Browsers(data.browsers, ['ie 7']);
    const prefixes = new Prefixes(data.prefixes, browsers);

    return info(prefixes).should.match(/remove Autoprefixer/);
  });

  return it('returns string for empty browsers', () => {
    const browsers = new Browsers(data.browsers, []);
    const prefixes = new Prefixes(data.prefixes, browsers);

    return info(prefixes).should.eql('No browsers selected');
  });
});
