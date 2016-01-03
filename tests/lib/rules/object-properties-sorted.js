const rule = require('../../../lib/rules/object-properties-sorted');
const RuleTester = require('eslint').RuleTester;
const parserOptions = {
  ecmaVersion: 6,
};
const ruleTester = new RuleTester();

ruleTester.run('object-properties-sorted', rule, {
  valid: [{
    code: [
      'var x = {',
      '  a: 1,',
      '  b: 2,',
      '}',
    ].join('\n'),
    parserOptions,
  }],
  invalid: [{
    code: [
      'var x = {',
      '  b: 2,',
      '  a: 1,',
      '}',
    ].join('\n'),
    parserOptions,
    errors: [{
      line: 3,
      column: 3,
    }],
  }],
});
