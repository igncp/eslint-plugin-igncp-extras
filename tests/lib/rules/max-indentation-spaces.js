const rule = require('../../../lib/rules/max-indentation-spaces');
const RuleTester = require('eslint').RuleTester;
const parserOptions = {
  ecmaVersion: 6,
};
const ruleTester = new RuleTester();
const maxIndentNumber = 2;

ruleTester.run('max-indentation-spaces', rule, {
  valid: [{
    code: [
      'var x = {',
      '  foo: "bar",',
      '}',
    ].join('\n'),
    parserOptions,
    options: [maxIndentNumber],
  }],
  invalid: [{
    code: [
      "var x = {",
      "  y: {",
      "    z: {",
      "      foo: 'bar'",
      "    }",
      "  }",
      "}",
    ].join('\n'),
    parserOptions,
    options: [maxIndentNumber],
    errors: [{
      line: 3,
    },{
      line: 4,
    },{
      line: 5,
    }],
  }],
});

