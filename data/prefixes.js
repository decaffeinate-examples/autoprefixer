/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS201: Simplify complex destructure assignments
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Sort browsers
const sort = array => array.sort(function(a, b) {
  a = a.split(' ');
  b = b.split(' ');
  if (a[0] > b[0]) {
    return 1;
  } else if (a[0] < b[0]) {
    return -1;
  } else {
    const d = parseFloat(a[1]) - parseFloat(b[1]);
    if (d > 0) {
      return 1;
    } else if (d < 0) {
      return -1;
    } else {
      return 0;
    }
  }
});

// Convert Can I Use data
const feature = function(data, opts, callback) {
  if (!callback) { [callback, opts] = Array.from([opts, { }]); }

  const match = opts.match || /\sx($|\s)/;
  const need  = [];

  for (let browser in data.stats) {
    const versions = data.stats[browser];
    for (let version in versions) {
      const support = versions[version];
      if (support.match(match)) { need.push(browser + ' ' + version); }
    }
  }

  return callback(sort(need));
};

// Add data for all properties
const result = { };

const prefix = function(...args) {
  const adjustedLength = Math.max(args.length, 1), names = args.slice(0, adjustedLength - 1), data = args[adjustedLength - 1];
  return (() => {
    const result1 = [];
    for (var name of Array.from(names)) {
      result[name] = { };
      result1.push((() => {
        const result2 = [];
        for (let i in data) {
          result2.push(result[name][i] = data[i]);
        }
        return result2;
      })());
    }
    return result1;
  })();
};

const add = function(...args) {
  const adjustedLength = Math.max(args.length, 1), names = args.slice(0, adjustedLength - 1), data = args[adjustedLength - 1];
  return Array.from(names).map((name) =>
    (result[name].browsers = sort(result[name].browsers.concat(data.browsers))));
};

module.exports = result;

// Border Radius
feature(require('caniuse-db/features-json/border-radius.json'), browsers => prefix('border-radius', 'border-top-left-radius', 'border-top-right-radius',
       'border-bottom-right-radius', 'border-bottom-left-radius', {
        mistakes: ['-khtml-', '-ms-', '-o-'],
        browsers,
        feature: 'border-radius'
      }
));

// Box Shadow
feature(require('caniuse-db/features-json/css-boxshadow.json'), browsers => prefix('box-shadow', {
        mistakes: ['-khtml-'],
        browsers,
        feature: 'css-boxshadow'
      }
));

// Animation
feature(require('caniuse-db/features-json/css-animation.json'), browsers => prefix('animation', 'animation-name', 'animation-duration',
       'animation-delay', 'animation-direction', 'animation-fill-mode',
       'animation-iteration-count', 'animation-play-state',
       'animation-timing-function', '@keyframes', {
        mistakes: ['-khtml-', '-ms-'],
        browsers,
        feature: 'css-animation'
      }
));

// Transition
feature(require('caniuse-db/features-json/css-transitions.json'), browsers => prefix('transition', 'transition-property', 'transition-duration',
       'transition-delay', 'transition-timing-function', {
        mistakes: ['-khtml-', '-ms-'],
        browsers,
        feature: 'css-transitions'
      }
));

// Transform 2D
feature(require('caniuse-db/features-json/transforms2d.json'), browsers => prefix('transform', 'transform-origin', {
        browsers,
        feature: 'transforms2d'
      }
));

// Transform 3D
const transforms3d = require('caniuse-db/features-json/transforms3d.json');
feature(transforms3d, function(browsers) {
  prefix('perspective', 'perspective-origin', {
          browsers,
          feature: 'transforms3d'
        }
  );
  return prefix('transform-style', {
          mistakes: ['-ms-', '-o-'],
          browsers,
          feature: 'transforms3d'
        }
  );
});

feature(transforms3d, {match: /y\sx|y\s#2/}, browsers => prefix('backface-visibility', {
        mistakes: ['-ms-', '-o-'],
        browsers,
        feature: 'transforms3d'
      }
));

// Gradients
const gradients = require('caniuse-db/features-json/css-gradients.json');

feature(gradients, {match: /y\sx/}, browsers => prefix('linear-gradient', 'repeating-linear-gradient',
       'radial-gradient', 'repeating-radial-gradient', {
        props: ['background', 'background-image', 'border-image', 'mask',
                'list-style', 'list-style-image', 'content', 'mask-image'],
        mistakes: ['-ms-'],
        browsers,
        feature: 'css-gradients'
      }
));

feature(gradients, {match: /a\sx/}, function(browsers) {
  browsers = browsers.map(function(i) { if (/op/.test(i)) { return i; } else { return `${i} old`; } });
  return add('linear-gradient', 'repeating-linear-gradient',
      'radial-gradient', 'repeating-radial-gradient', {
       browsers,
       feature: 'css-gradients'
     }
  );
});

// Box sizing
feature(require('caniuse-db/features-json/css3-boxsizing.json'), browsers => prefix('box-sizing', {
        browsers,
        feature: 'css3-boxsizing'
      }
));

// Filter Effects
feature(require('caniuse-db/features-json/css-filters.json'), browsers => prefix('filter', {
        browsers,
        feature: 'css-filters'
      }
));

// filter() function
const filterFunction = require('caniuse-db/features-json/css-filter-function.json');

feature(filterFunction, browsers => prefix('filter-function', {
        props: ['background', 'background-image', 'border-image', 'mask',
                'list-style', 'list-style-image', 'content', 'mask-image'],
        browsers,
        feature: 'css-filter-function'
      }
));

// Backdrop-filter
const backdropFilter = require('caniuse-db/features-json/css-backdrop-filter.json');

feature(backdropFilter, browsers => prefix('backdrop-filter', {
        browsers,
        feature: 'css-backdrop-filter'
      }
));

// element() function
const elementFunction = require('caniuse-db/features-json/css-element-function.json');

feature(elementFunction, browsers => prefix('element', {
        props: ['background', 'background-image', 'border-image', 'mask',
                'list-style', 'list-style-image', 'content', 'mask-image'],
        browsers,
        feature: 'css-element-function'
      }
));

// Multicolumns
feature(require('caniuse-db/features-json/multicolumn.json'), function(browsers) {
  prefix('columns', 'column-width', 'column-gap',
         'column-rule', 'column-rule-color', 'column-rule-width', {
          browsers,
          feature: 'multicolumn'
        }
  );

  return prefix('column-count', 'column-rule-style', 'column-span', 'column-fill',
         'break-before', 'break-after', 'break-inside', {
          browsers,
          feature: 'multicolumn'
        }
  );
});

// User select
const userSelectNone = require('caniuse-db/features-json/user-select-none.json');

feature(userSelectNone, browsers => prefix('user-select', {
        mistakes: ['-khtml-'],
        browsers,
        feature: 'user-select-none'
      }
));

// Flexible Box Layout
const flexbox = require('caniuse-db/features-json/flexbox.json');

feature(flexbox, {match: /a\sx/}, function(browsers) {
  browsers = browsers.map(function(i) { if (/ie|firefox/.test(i)) { return i; } else { return `${i} 2009`; } });
  prefix('display-flex', 'inline-flex', {
          props:  ['display'],
          browsers,
          feature: 'flexbox'
        }
  );
  prefix('flex', 'flex-grow', 'flex-shrink', 'flex-basis', {
          browsers,
          feature: 'flexbox'
        }
  );
  return prefix('flex-direction', 'flex-wrap', 'flex-flow', 'justify-content',
         'order', 'align-items', 'align-self', 'align-content', {
          browsers,
          feature: 'flexbox'
        }
  );
});

feature(flexbox, {match: /y\sx/}, function(browsers) {
  add('display-flex', 'inline-flex', {
       browsers,
       feature: 'flexbox'
     }
  );
  add('flex', 'flex-grow', 'flex-shrink', 'flex-basis', {
       browsers,
       feature: 'flexbox'
     }
  );
  return add('flex-direction', 'flex-wrap', 'flex-flow', 'justify-content',
      'order', 'align-items', 'align-self', 'align-content', {
       browsers,
       feature: 'flexbox'
     }
  );
});

// calc() unit
feature(require('caniuse-db/features-json/calc.json'), browsers => prefix('calc', {
        props:  ['*'],
        browsers,
        feature: 'calc'
      }
));

// Background options
const bckgrndImgOpts = require('caniuse-db/features-json/background-img-opts.json');

feature(bckgrndImgOpts, browsers => prefix('background-clip', 'background-origin', 'background-size', {
        browsers,
        feature: 'background-img-opts'
      }
));

// Font feature settings
feature(require('caniuse-db/features-json/font-feature.json'), browsers => prefix('font-feature-settings', 'font-variant-ligatures',
       'font-language-override', {
        browsers,
        feature: 'font-feature'
      }
));

// CSS font-kerning property
feature(require('caniuse-db/features-json/font-kerning.json'), browsers => prefix('font-kerning', {
        browsers,
        feature: 'font-kerning'
      }
));

// Border image
feature(require('caniuse-db/features-json/border-image.json'), browsers => prefix('border-image', {
        browsers,
        feature: 'border-image'
      }
));

// Selection selector
feature(require('caniuse-db/features-json/css-selection.json'), browsers => prefix('::selection', {
        selector: true,
        browsers,
        feature: 'css-selection'
      }
));

// Placeholder selector
feature(require('caniuse-db/features-json/css-placeholder.json'), function(browsers) {
  browsers = browsers.map(function(i) {
    const [name, version] = Array.from(i.split(' '));
    if ((name === 'firefox') && (parseFloat(version) <= 18)) { return i + ' old'; } else { return i; }
  });

  return prefix('::placeholder', {
          selector: true,
          browsers,
          feature: 'css-placeholder'
        }
  );
});

// Hyphenation
feature(require('caniuse-db/features-json/css-hyphens.json'), browsers => prefix('hyphens', {
        browsers,
        feature: 'css-hyphens'
      }
));

// Fullscreen selector
const fullscreen = require('caniuse-db/features-json/fullscreen.json');

feature(fullscreen, browsers => prefix(':fullscreen', {
        selector: true,
        browsers,
        feature: 'fullscreen'
      }
));

feature(fullscreen, {match: /x(\s#2|$)/}, browsers => prefix('::backdrop', {
        selector: true,
        browsers,
        feature: 'fullscreen'
      }
));

// Tab size
feature(require('caniuse-db/features-json/css3-tabsize.json'), browsers => prefix('tab-size', {
        browsers,
        feature: 'css3-tabsize'
      }
));

// Intrinsic & extrinsic sizing
feature(require('caniuse-db/features-json/intrinsic-width.json'), browsers => prefix('max-content', 'min-content', 'fit-content',
       'fill', 'fill-available', 'stretch', {
        props:  ['width',  'min-width',  'max-width',
                 'height', 'min-height', 'max-height',
                 'inline-size', 'min-inline-size', 'max-inline-size',
                 'block-size',  'min-block-size',  'max-block-size'],
        browsers,
        feature: 'intrinsic-width'
      }
));

// Zoom cursors
const cursorsNewer = require('caniuse-db/features-json/css3-cursors-newer.json');

feature(cursorsNewer, browsers => prefix('zoom-in', 'zoom-out', {
        props:  ['cursor'],
        browsers,
        feature: 'css3-cursors-newer'
      }
));

// Grab cursors
const cursorsGrab = require('caniuse-db/features-json/css3-cursors-grab.json');
feature(cursorsGrab, browsers => prefix('grab', 'grabbing', {
        props:  ['cursor'],
        browsers,
        feature: 'css3-cursors-grab'
      }
));

// Sticky position
feature(require('caniuse-db/features-json/css-sticky.json'), browsers => prefix('sticky', {
        props:  ['position'],
        browsers,
        feature: 'css-sticky'
      }
));

// Pointer Events
feature(require('caniuse-db/features-json/pointer.json'), browsers => prefix('touch-action', {
        browsers,
        feature: 'pointer'
      }
));

// Text decoration
const decoration = require('caniuse-db/features-json/text-decoration.json');

feature(decoration, browsers => prefix('text-decoration-style',
       'text-decoration-color',
       'text-decoration-line', {
        browsers,
        feature: 'text-decoration'
      }
));

feature(decoration, {match: /x.*#[23]/}, browsers => prefix('text-decoration-skip', {
        browsers,
        feature: 'text-decoration'
      }
));

// Text Size Adjust
const textSizeAdjust = require('caniuse-db/features-json/text-size-adjust.json');

feature(textSizeAdjust, browsers => prefix('text-size-adjust', {
        browsers,
        feature: 'text-size-adjust'
      }
));

// CSS Masks
feature(require('caniuse-db/features-json/css-masks.json'), function(browsers) {
  prefix('mask-clip', 'mask-composite', 'mask-image',
         'mask-origin', 'mask-repeat', 'mask-border-repeat',
         'mask-border-source', {
          browsers,
          feature: 'css-masks'
        }
  );
  return prefix('mask', 'mask-position', 'mask-size',
         'mask-border', 'mask-border-outset', 'mask-border-width',
         'mask-border-slice', {
          browsers,
          feature: 'css-masks'
        }
  );
});

// CSS clip-path property
feature(require('caniuse-db/features-json/css-clip-path.json'), browsers => prefix('clip-path', {
        browsers,
        feature: 'css-clip-path'
      }
));

// Fragmented Borders and Backgrounds
const boxdecorbreak = require('caniuse-db/features-json/css-boxdecorationbreak.json');

feature(boxdecorbreak, browsers => prefix('box-decoration-break', {
        browsers,
        feature: 'css-boxdecorationbreak'
      }
));

// CSS3 object-fit/object-position
feature(require('caniuse-db/features-json/object-fit.json'), browsers => prefix('object-fit',
       'object-position', {
        browsers,
        feature: 'object-fit'
      }
));

// CSS Shapes
feature(require('caniuse-db/features-json/css-shapes.json'), browsers => prefix('shape-margin',
       'shape-outside',
       'shape-image-threshold', {
        browsers,
        feature: 'css-shapes'
      }
));

// CSS3 text-overflow
feature(require('caniuse-db/features-json/text-overflow.json'), browsers => prefix('text-overflow', {
        browsers,
        feature: 'text-overflow'
      }
));

// Viewport at-rule
const devdaptation = require('caniuse-db/features-json/css-deviceadaptation.json');
feature(devdaptation, browsers => prefix('@viewport', {
        browsers,
        feature: 'css-deviceadaptation'
      }
));

// Resolution Media Queries
const resolution = require('caniuse-db/features-json/css-media-resolution.json');

feature(resolution, {match: /( x($| )|a #3)/}, browsers => prefix('@resolution', {
        browsers,
        feature: 'css-media-resolution'
      }
));

// CSS text-align-last
const textAlignLast = require('caniuse-db/features-json/css-text-align-last.json');

feature(textAlignLast, browsers => prefix('text-align-last', {
        browsers,
        feature: 'css-text-align-last'
      }
));

// Crisp Edges Image Rendering Algorithm
const crispedges = require('caniuse-db/features-json/css-crisp-edges.json');

feature(crispedges, {match: /y x|a x #1/}, browsers => prefix('pixelated', {
        props:  ['image-rendering'],
        browsers,
        feature: 'css-crisp-edges'
      }
));

feature(crispedges, {match: /a x #2/}, browsers => prefix('image-rendering', {
        browsers,
        feature: 'css-crisp-edges'
      }
));

// Logical Properties
const logicalProps = require('caniuse-db/features-json/css-logical-props.json');

feature(logicalProps, browsers => prefix('border-inline-start',  'border-inline-end',
       'margin-inline-start',  'margin-inline-end',
       'padding-inline-start', 'padding-inline-end', {
        browsers,
        feature: 'css-logical-props'
      }
));

feature(logicalProps, {match: /x\s#2/}, browsers => prefix('border-block-start',  'border-block-end',
       'margin-block-start',  'margin-block-end',
       'padding-block-start', 'padding-block-end', {
        browsers,
        feature: 'css-logical-props'
      }
));

// CSS appearance
feature(require('caniuse-db/features-json/css-appearance.json'), browsers => prefix('appearance', {
        browsers,
        feature: 'css-appearance'
      }
));

// CSS Scroll snap points
feature(require('caniuse-db/features-json/css-snappoints.json'), browsers => prefix('scroll-snap-type',
       'scroll-snap-coordinate',
       'scroll-snap-destination',
       'scroll-snap-points-x', 'scroll-snap-points-y', {
        browsers,
        feature: 'css-snappoints'
      }
));

// CSS Regions
feature(require('caniuse-db/features-json/css-regions.json'), browsers => prefix('flow-into', 'flow-from',
       'region-fragment', {
        browsers,
        feature: 'css-regions'
      }
));

// CSS image-set
feature(require('caniuse-db/features-json/css-image-set.json'), browsers => prefix('image-set', {
        props: ['background', 'background-image', 'border-image', 'mask',
                'list-style', 'list-style-image', 'content', 'mask-image'],
        browsers,
        feature: 'css-image-set'
      }
));

// Writing Mode
const writingMode = require('caniuse-db/features-json/css-writing-mode.json');
feature(writingMode, {match: /a|x/}, browsers => prefix('writing-mode', {
        browsers,
        feature: 'css-writing-mode'
      }
));

// Cross-Fade Function
feature(require('caniuse-db/features-json/css-cross-fade.json'), browsers => prefix('cross-fade', {
        props: ['background', 'background-image', 'border-image', 'mask',
                'list-style', 'list-style-image', 'content', 'mask-image'],
        browsers,
        feature: 'css-cross-fade'
      }
));

// Read Only selector
const readOnly = require('caniuse-db/features-json/css-read-only-write.json');
feature(readOnly, browsers => prefix(':read-only', ':read-write', {
        selector: true,
        browsers,
        feature: 'css-read-only-write'
      }
));

// Text Emphasize
feature(require('caniuse-db/features-json/text-emphasis.json'), browsers => prefix('text-emphasis', 'text-emphasis-position',
       'text-emphasis-style', 'text-emphasis-color', {
        browsers,
        feature: 'text-emphasis'
      }
));

// CSS Grid Layout
const grid = require('caniuse-db/features-json/css-grid.json');
feature(grid, function(browsers) {
  prefix('display-grid', 'inline-grid', {
          props:  ['display'],
          browsers,
          feature: 'css-grid'
        }
  );
  return prefix('grid-template-columns', 'grid-template-rows',
         'grid-row-start', 'grid-column-start',
         'grid-row-end', 'grid-column-end',
         'grid-row', 'grid-column', {
          browsers,
          feature: 'css-grid'
        }
  );
});

feature(grid, {match: /a x/}, browsers => prefix('justify-items', 'grid-row-align', {
        browsers,
        feature: 'css-grid'
      }
));

// CSS text-spacing
const textSpacing = require('caniuse-db/features-json/css-text-spacing.json');

feature(textSpacing, browsers => prefix('text-spacing', {
        browsers,
        feature: 'css-text-spacing'
      }
));

// :any-link selector
feature(require('caniuse-db/features-json/css-any-link.json'), browsers => prefix(':any-link', {
        selector: true,
        browsers,
        feature: 'css-any-link'
      }
));
