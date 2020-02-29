/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const browserslist = require('browserslist');

const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const names = {
  ie:      'IE',
  ie_mob:  'IE Mobile',
  ios_saf: 'iOS',
  op_mini: 'Opera Mini',
  op_mob:  'Opera Mobile',
  and_chr: 'Chrome for Android',
  and_ff:  'Firefox for Android',
  and_uc:  'UC for Android'
};

const prefix = function(name, prefixes) {
  let out  = '  ' + name + ': ';
  out += prefixes.map( i => i.replace(/^-(.*)-$/g, '$1')).join(', ');
  out += "\n";
  return out;
};

module.exports = function(prefixes) {
  let browser, data, name;
  if (prefixes.browsers.selected.length === 0) { return "No browsers selected"; }

  const versions = [];
  for (browser of Array.from(prefixes.browsers.selected)) {
    let version;
    [name, version] = Array.from(browser.split(' '));

    name = names[name] || capitalize(name);
    if (versions[name]) {
      versions[name].push(version);
    } else {
      versions[name] = [version];
    }
  }

  let out  = "Browsers:\n";
  for (browser in versions) {
    let list = versions[browser];
    list = list.sort((a, b) => parseFloat(b) - parseFloat(a));
    out += '  ' + browser + ': ' + list.join(', ') + "\n";
  }
  const coverage = browserslist.coverage(prefixes.browsers.selected);
  const round    = Math.round(coverage * 100) / 100.0;
  out     += `\nThese browsers account for ${ round }% of all users globally\n`;

  let atrules = '';
  for (name in prefixes.add) {
    data = prefixes.add[name];
    if ((name[0] === '@') && data.prefixes) {
      atrules += prefix(name, data.prefixes);
    }
  }
  if (atrules !== '') { out += "\nAt-Rules:\n" + atrules; }

  let selectors = '';
  for (let selector of Array.from(prefixes.add.selectors)) {
    if (selector.prefixes) {
      selectors += prefix(selector.name, selector.prefixes);
    }
  }
  if (selectors !== '') { out += "\nSelectors:\n" + selectors; }

  let values = '';
  let props  = '';
  for (name in prefixes.add) {
    data = prefixes.add[name];
    if ((name[0] !== '@') && data.prefixes) {
      props += prefix(name, data.prefixes);
    }

    if (!data.values) { continue; }
    for (let value of Array.from(data.values)) {
      const string = prefix(value.name, value.prefixes);
      if (values.indexOf(string) === -1) {
        values += string;
      }
    }
  }

  if (props  !== '') { out += "\nProperties:\n" + props; }
  if (values !== '') { out += "\nValues:\n"     + values; }

  if ((atrules === '') && (selectors === '') && (props === '') && (values === '')) {
    out += '\nAwesome! Your browsers don\'t require any vendor prefixes.' +
           '\nNow you can remove Autoprefixer from build steps.';
  }

  return out;
};
