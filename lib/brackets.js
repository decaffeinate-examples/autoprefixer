/* eslint-disable
    no-restricted-syntax,
    no-var,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const last = (array) => array[array.length - 1];

var brackets = {

  // Parse string to nodes tree
  parse(str) {
    let current = [''];
    const stack = [current];

    for (const sym of Array.from(str)) {
      if (sym === '(') {
        current = [''];
        last(stack).push(current);
        stack.push(current);
      } else if (sym === ')') {
        stack.pop();
        current = last(stack);
        current.push('');
      } else {
        current[current.length - 1] += sym;
      }
    }

    return stack[0];
  },

  // Generate output string by nodes tree
  stringify(ast) {
    let result = '';
    for (const i of Array.from(ast)) {
      if (typeof i === 'object') {
        result += `(${brackets.stringify(i)})`;
      } else {
        result += i;
      }
    }
    return result;
  },
};

module.exports = brackets;
