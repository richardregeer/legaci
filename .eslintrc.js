'use strict';

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['prettier', 'import', '@typescript-eslint', 'jsdoc', 'promise'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  rules: {
    'default-param-last': 'error',
    "max-classes-per-file": ["error", 1],
    'no-constructor-return': 'error',
    'eol-last': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
      },
    ],
    "require-await": "off",
    "@typescript-eslint/require-await": "off",
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/prefer-readonly': ['error'],
    '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
        },
      },
    ],
    '@typescript-eslint/promise-function-async': [
      'error',
      {
        allowedPromiseNames: ['Thenable'],
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      // {
      //   "selector":  ['variable'],
      //   "modifiers": ["private"],
      //   "format": ["camelCase"],
      //   "leadingUnderscore": "require"
      // },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "suffix": ['Interface']
      }

    ],
    "promise/always-return": "error",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "error",
    "promise/no-native": "off",
    "promise/no-nesting": "error",
    "promise/no-promise-in-callback": "error",
    "promise/no-callback-in-promise": "error",
    "promise/avoid-new": "error",
    "promise/no-new-statics": "error",
    "promise/no-return-in-finally": "error",
    "promise/valid-params": "error",
    "promise/prefer-await-to-then": 'error'
  },
};
