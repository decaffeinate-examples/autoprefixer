/* eslint-disable
    func-names,
    import/no-unresolved,
    no-continue,
    no-else-return,
    no-param-reassign,
    no-restricted-syntax,
    no-return-assign,
    no-undef,
    no-unused-vars,
    space-before-function-paren,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const postcss = require('postcss');
const fs = require('fs');
const autoprefixer = require('../lib/autoprefixer');
const Browsers = require('../lib/browsers');


const grider = autoprefixer({ browsers: ['Chrome 25', 'Edge 12', 'IE 10'], cascade: false });

const cleaner = autoprefixer({ browsers: [] });
const compiler = autoprefixer({ browsers: ['Chrome 25', 'Opera 12'] });
const filterer = autoprefixer({ browsers: ['Chrome 25', 'Safari 9', 'Firefox 39'] });
const borderer = autoprefixer({ browsers: ['Safari 4', 'Firefox 3.6'] });
const keyframer = autoprefixer({ browsers: ['Chrome > 19', 'Opera 12'] });
const flexboxer = autoprefixer({ browsers: ['Chrome > 19', 'Firefox 21', 'IE 10'] });
const without3d = autoprefixer({ browsers: ['Opera 12', 'IE > 0'] });
const uncascader = autoprefixer({ browsers: ['Firefox 15'] });
const supporter = autoprefixer({ browsers: ['Chrome 25', 'Chrome 28', 'IE > 0'] });
const gradienter = autoprefixer({ browsers: ['Chrome 25', 'Opera 12', 'Android 2.3'] });
const selectorer = autoprefixer({ browsers: ['Chrome 25', 'Firefox > 17', 'IE 10'] });
const intrinsicer = autoprefixer({ browsers: ['Chrome 25', 'Firefox 22'] });
const imagerender = autoprefixer({ browsers: ['iOS 8', 'iOS 6.1', 'FF 22', 'IE 11'] });
const backgrounder = autoprefixer({ browsers: ['Firefox 3.6', 'Android 2.3'] });
const resolutioner = autoprefixer({ browsers: ['Safari 7', 'Opera 12'] });
const transitioner = autoprefixer({ browsers: ['Chrome 25', 'Firefox 15'] });

const cascader = autoprefixer({
  browsers: ['Chrome > 19', 'Firefox 21', 'IE 10'],
  cascade: true,
});

const prefixer = function(name) {
  if (name === 'grid') {
    return grider;
  } if (name === 'keyframes') {
    return keyframer;
  } if (name === 'border-radius') {
    return borderer;
  } if ((name === 'vendor-hack') || (name === 'value-hack') || (name === 'mistakes')) {
    return cleaner;
  } if (name === 'gradient') {
    return gradienter;
  } if ((name === 'flexbox') || (name === 'flex-rewrite') || (name === 'double')) {
    return flexboxer;
  } if ((name === 'selectors') || (name === 'placeholder')) {
    return selectorer;
  } if ((name === 'intrinsic') || (name === 'multicolumn')) {
    return intrinsicer;
  } if (name === 'cascade') {
    return cascader;
  } if (name === '3d-transform') {
    return without3d;
  } if (name === 'background-size') {
    return backgrounder;
  } else if (name === 'background-clip') {
    return cleaner;
  } else if (name === 'uncascade') {
    return uncascader;
  } else if (name === 'example') {
    return autoprefixer;
  } else if ((name === 'viewport') || (name === 'appearance')) {
    return flexboxer;
  } else if (name === 'resolution') {
    return resolutioner;
  } else if ((name === 'filter') || (name === 'advanced-filter') || (name === 'element')) {
    return filterer;
  } else if ((name === 'image-rendering') || (name === 'writing-mode')) {
    return imagerender;
  } else if (name === 'logical') {
    return intrinsicer;
  } else if (name === 'supports') {
    return supporter;
  } else {
    return compiler;
  }
};

const read = (name) => fs.readFileSync(`${__dirname}/cases/${name}.css`).toString();

const test = function (from, instance) {
  if (instance == null) { instance = prefixer(from); }
  const input = read(from);
  const output = read(`${from}.out`);
  const result = postcss([instance]).process(input);
  result.warnings().length.should.eql(0);
  return result.css.should.eql(output);
};

const commons = ['transition', 'values', 'keyframes', 'gradient', 'flex-rewrite',
  'flexbox', 'filter', 'border-image', 'border-radius', 'notes',
  'selectors', 'placeholder', 'fullscreen', 'intrinsic', 'mistakes',
  'custom-prefix', 'cascade', 'double', 'multicolumn', '3d-transform',
  'background-size', 'supports', 'viewport', 'resolution', 'logical',
  'appearance', 'advanced-filter', 'element', 'image-set',
  'image-rendering', 'mask-border', 'writing-mode', 'cross-fade',
  'gradient-fix', 'text-emphasis-position', 'grid'];

describe('autoprefixer()', () => {
  it('throws on wrong options', () => ((() => autoprefixer({ browser: ['chrome 25', 'opera 12'] }))).should.throw(/browsers/));

  it('sets options', () => {
    const opts = { browsers: ['chrome 25', 'opera 12'], cascade: false };
    return autoprefixer(opts).options.should.eql(opts);
  });

  it('has default browsers', () => autoprefixer.defaults.should.be.an.instanceOf(Array));

  return it('passes statistics to Browserslist', () => {
    const stats = {
      chrome: {
        10: 10,
        11: 40,
      },
      ie: {
        10: 10,
        11: 40,
      },
    };

    return autoprefixer({ browsers: '> 20% in my stats', stats }).info()
      .should.match(/Browsers:\n {2}Chrome: 11\n {2}IE: 11\n/);
  });
});

describe('Autoprefixer', () => {
  it('prefixes values', () => test('values'));
  it('prefixes @keyframes', () => test('keyframes'));
  it('prefixes @viewport', () => test('viewport'));
  it('prefixes selectors', () => test('selectors'));
  it('prefixes resolution query', () => test('resolution'));
  it('removes common mistakes', () => test('mistakes'));
  it('reads notes for prefixes', () => test('notes'));
  it('keeps vendor-specific hacks', () => test('vendor-hack'));
  it('keeps values with vendor hacks', () => test('value-hack'));
  it('works with comments', () => test('comments'));
  it('uses visual cascade', () => test('cascade'));
  it('works with properties near', () => test('double'));
  it('checks prefixed in hacks', () => test('check-down'));
  it('normalize cascade after remove', () => test('uncascade'));
  it('prefix decls in @supports', () => test('supports'));
  it('saves declaration style', () => test('style'));
  it('uses control comments', () => test('disabled'));
  it('has actual example in docs', () => test('example'));

  it('prefixes transition', () => {
    const input = read('transition');
    const output = read('transition.out');
    const result = postcss([prefixer('transition')]).process(input);

    result.css.should.eql(output);
    return result.warnings().map((i) => i.toString()).should.eql(
      ['autoprefixer: <css input>:23:5: Replace transition-property '
       + 'to transition, because Autoprefixer could not support any cases '
       + 'of transition-property and other transition-*'],
    );
  });

  it('works with broken transition', () => {
    const input = 'a{transition:,,}';
    const output = 'a{-webkit-transition:;-o-transition:;transition:}';
    return postcss([prefixer('transition')]).process(input).css.should.eql(output);
  });

  it('should ignore spaces inside values', () => {
    const css = read('trim');
    return postcss([flexboxer]).process(css).css.should.eql(css);
  });

  it('removes unnecessary prefixes', () => (() => {
    const result = [];
    for (const type of Array.from(commons)) {
      if (type === 'gradient-fix') { continue; }
      if (type === 'cascade') { continue; }
      if (type === 'mistakes') { continue; }
      if (type === 'flex-rewrite') { continue; }
      const input = read(`${type}.out`);
      const output = read(type);
      result.push(postcss([cleaner]).process(input).css.should.eql(output));
    }
    return result;
  })());

  it('does not remove unnecessary prefixes on request', () => (() => {
    const result = [];
    for (const type of ['transition', 'values', 'fullscreen']) {
      const keeper = autoprefixer({ browsers: [], remove: false });
      const css = read(`${type}.out`);
      result.push(postcss([keeper]).process(css).css.should.eql(css));
    }
    return result;
  })());

  it('does not add prefixes on request', () => (() => {
    const result = [];
    for (const type of ['transition', 'values', 'fullscreen']) {
      const remover = autoprefixer({ browsers: ['Opera 12'], add: false });
      const unprefixed = read(type);
      result.push(postcss([remover]).process(unprefixed).css.should.eql(unprefixed));
    }
    return result;
  })());

  it('prevents doubling prefixes', () => (() => {
    const result = [];
    for (const type of Array.from(commons)) {
      const processor = postcss([prefixer(type)]);

      const input = read(type);
      const output = read(`${type}.out`);
      result.push(processor.process(processor.process(input)).css.should.eql(output));
    }
    return result;
  })());

  it('parses difficult files', () => {
    const input = read('syntax');
    const result = postcss([cleaner]).process(input);
    return result.css.should.eql(input);
  });

  it('marks parsing errors', () => ((() => postcss([cleaner]).process('a {').css)).should.throw('<css input>:1:1: Unclosed block'));

  it('shows file name in parse error', () => ((() => postcss([cleaner]).process('a {', { from: 'a.css' }).css)).should.throw(/a.css:1:1: /));

  it('uses browserslist config', () => {
    const path = `${__dirname}/cases/config/test.css`;
    const input = read('config/test');
    const output = read('config/test.out');
    return postcss([autoprefixer]).process(input, { from: path }).css.should.eql(output);
  });

  it('sets browserslist environment', () => {
    const path = `${__dirname}/cases/config/test.css`;
    const input = read('config/test');
    const output = read('config/test.production');
    return postcss([autoprefixer({ env: 'production' })])
      .process(input, { from: path }).css.should.eql(output);
  });

  it('works without source in nodes', () => {
    const root = postcss.root();
    root.append({ selector: 'a' });
    root.first.append({ prop: 'display', value: 'flex' });
    compiler(root);
    return root.toString().should.eql(
      'a {\n    display: -webkit-flex;\n    display: flex\n}',
    );
  });

  it('takes values from other PostCSS plugins', () => {
    const plugin = (css) => css.walkDecls((i) => i.value = 'calc(0)');
    const result = postcss([plugin, compiler]).process('a{width:0/**/0}');
    return result.css.should.eql('a{width:-webkit-calc(0);width:calc(0)}');
  });

  it('has option to disable @supports support', () => {
    const css = '@supports (cursor: grab) {}';
    const instance = autoprefixer({ browsers: ['Chrome 28'], supports: false });
    const result = postcss([instance]).process(css);
    return result.css.should.eql(css);
  });

  it('has option to disable grid support', () => {
    const input = read('grid');
    const output = read('grid.disabled');
    const instance = autoprefixer({ browsers: ['Edge 12', 'IE 10'], grid: false });
    const result = postcss([instance]).process(input);
    return result.css.should.eql(output);
  });

  it('has option to disable flexbox support', () => {
    const css = read('flexbox');
    const instance = autoprefixer({ browsers: ['IE 10'], flexbox: false });
    const result = postcss([instance]).process(css);
    return result.css.should.eql(css);
  });

  it('has option to disable 2009 flexbox support', () => {
    const css = 'a{flex:1}';
    const instance = autoprefixer({ browsers: ['Chrome > 19'], flexbox: 'no-2009' });
    const result = postcss([instance]).process(css);
    return result.css.should.eql('a{-webkit-flex:1;flex:1}');
  });

  describe('info()', () => it('returns inspect string', () => autoprefixer({ browsers: ['chrome 25'] }).info()
    .should.match(/Browsers:\s+Chrome: 25/)));

  return describe('hacks', () => {
    it('ignores prefix IE filter', () => test('filter'));
    it('changes border image syntax', () => test('border-image'));
    it('supports old Mozilla prefixes', () => test('border-radius'));
    it('supports all flexbox syntaxes', () => test('flexbox'));
    it('supports map flexbox props', () => test('flex-rewrite'));
    it('supports all fullscreens', () => test('fullscreen'));
    it('supports custom prefixes', () => test('custom-prefix'));
    it('fixes break properties', () => test('multicolumn'));
    it('ignores some 3D transforms', () => test('3d-transform'));
    it('supports background-size', () => test('background-size'));
    it('supports background-clip', () => test('background-clip'));
    it('supports logical properties', () => test('logical'));
    it('supports appearance', () => test('appearance'));
    it('supports all placeholders', () => test('placeholder'));
    it('supports image-rendering', () => test('image-rendering'));
    it('supports border-box mask', () => test('mask-border'));
    it('supports image-set()', () => test('image-set'));
    it('supports writing-mode', () => test('writing-mode'));
    it('supports cross-fade()', () => test('cross-fade'));
    it('supports grid layout', () => test('grid'));

    it('changes angle in gradient', () => {
      const input = read('gradient');
      const output = read('gradient.out');
      const result = postcss([prefixer('gradient')]).process(input);

      result.css.should.eql(output);
      return result.warnings().map((i) => i.toString()).should.eql(
        ['autoprefixer: <css input>:38:5: Gradient has outdated direction '
         + 'syntax. New syntax is like `to left` instead of `right`.'],
      );
    });

    it('warns on old flexbox display', () => {
      const result = postcss([flexboxer]).process('a{ display: box; }');
      result.css.should.eql('a{ display: box; }');
      return result.warnings().map((i) => i.toString()).should.eql(
        ['autoprefixer: <css input>:1:4: You should write display: flex '
         + 'by final spec instead of display: box'],
      );
    });

    it('warns on unsupported grid features', () => {
      const css = read('nogrid');
      const instance = autoprefixer({ browsers: ['IE 10'], flexbox: false });
      const result = postcss([instance]).process(css);
      return result.warnings().length.should.eql(0);
    });

    it('does not warns on unsupported grid on disabled grid', () => {
      let result;
      const css = read('nogrid');
      return result = postcss([prefixer('transition')]).process(css);
    });

    it('supports intrinsic sizing', () => {
      const input = read('intrinsic');
      const output = read('intrinsic.out');
      const result = postcss([prefixer('intrinsic')]).process(input);

      result.css.should.eql(output);
      return result.warnings().map((i) => i.toString()).should.eql([
        'autoprefixer: <css input>:15:5: Replace fill to stretch, '
        + 'because spec had been changed',
        'autoprefixer: <css input>:19:5: Replace fill-available to stretch, '
        + 'because spec had been changed',
      ]);
    });

    it('supports text-emphasis', () => {
      const input = read('text-emphasis-position');
      const output = read('text-emphasis-position.out');
      const result = postcss([prefixer('text-emphasis-position')]).process(input);

      result.css.should.eql(output);
      return result.warnings().map((i) => i.toString()).should.eql(
        ['autoprefixer: <css input>:14:5: You should use 2 values '
         + 'for text-emphasis-position For example, `under left` '
         + 'instead of just `under`.'],
      );
    });

    it('ignores values for CSS3PIE props', () => {
      const css = read('pie');
      return postcss([compiler]).process(css).css.should.eql(css);
    });

    return it('add prefix for backface-visibility for Safari 9', () => {
      const input = 'a{ '
        + 'backface-visibility: hidden; '
        + 'transform-style: preserve-3d }';
      const instance = autoprefixer({ browsers: ['Safari 9'], flexbox: false });
      return postcss([instance]).process(input).css.should.eql('a{ '
          + '-webkit-backface-visibility: hidden; '
          + 'backface-visibility: hidden; '
          + 'transform-style: preserve-3d }');
    });
  });
});
