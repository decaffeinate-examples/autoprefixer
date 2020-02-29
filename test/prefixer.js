/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Prefixer = require('../lib/prefixer');
const parse    = require('postcss/lib/parse');

describe('Prefixer', function() {
  beforeEach(function() {
    this.prefix = new Prefixer();
    return this.css = parse('@-ms-keyframes a { to { } } ' +
                 ':-moz-full-screen { } a { } ' +
                 '@-dev-keyframes s { to { } }');
  });

  describe('.hack()', () => it('registers hacks for subclasses', function() {
    class A extends Prefixer {}

    class Hack extends A {
      static initClass() {
        this.names = ['a', 'b'];
      }
    }
    Hack.initClass();
    A.hack(Hack);

    A.hacks.should.eql({ a: Hack, b: Hack });
    return (Prefixer.hacks === undefined).should.be.true;
  }));

  describe('.load()', () => it('loads hacks', function() {
    class A extends Prefixer {
      static initClass() {
        this.prototype.klass = 'a';
      }
    }
    A.initClass();
    class Hack extends A {
      static initClass() {
        this.prototype.klass = 'hack';
      }
    }
    Hack.initClass();
    A.hacks = { hacked: Hack };

    A.load('hacked').klass.should.eql('hack');
    return A.load('a').klass.should.eql('a');
  }));

  describe('.clone()', function() {

    it('cleans custom properties', function() {
      const rule = this.css.first.first;
      rule._autoprefixerPrefix = '-ms-';
      rule._autoprefixerValues = { '-ms-': 1 };

      const cloned = Prefixer.clone(rule, {selector: 'from'});
      cloned.selector.should.eql('from');

      (cloned._autoprefixerPrefix === undefined).should.be.true;
      return (cloned._autoprefixerValues === undefined).should.be.true;
    });

    return it('fixed declaration between', function() {
      const css = parse('a { color : black }');
      const cloned = Prefixer.clone(css.first.first);
      return cloned.raws.between.should.eql(' : ');
    });
  });

  return describe('parentPrefix', function() {

    it('works with root node', function() {
      return this.prefix.parentPrefix(this.css).should.be.false;
    });

    it('finds in at-rules', function() {
      return this.prefix.parentPrefix(this.css.first).should.eql('-ms-');
    });

    it('finds in selectors', function() {
      return this.prefix.parentPrefix(this.css.nodes[1]).should.eql('-moz-');
    });

    it('finds in parents', function() {
      this.prefix.parentPrefix(this.css.first.first).should.eql('-ms-');
      return this.prefix.parentPrefix(this.css.nodes[2]).should.be.false;
    });

    it('caches prefix', function() {
      this.prefix.parentPrefix(this.css.first);
      this.css.first._autoprefixerPrefix.should.eql('-ms-');

      this.css.first._autoprefixerPrefix = false;
      return this.prefix.parentPrefix(this.css.first).should.be.false;
    });

    it('finds only browsers prefixes', function() {
      return this.prefix.parentPrefix(this.css.nodes[2]).should.be.false;
    });

    return it('works with selector contained --', function() {
      const css = parse(':--a { color: black }');
      return this.prefix.parentPrefix(css.first.first).should.be.false;
    });
  });
});
