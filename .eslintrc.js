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
    'max-classes-per-file': ['error', 1],
    'no-constructor-return': 'error',
    'eol-last': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
      },
    ],
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',
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
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['variableLike', 'memberLike'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['typeLike'],
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        suffix: ['Interface'],
      },
      {
        selector: ['enumMember'],
        format: ['UPPER_CASE'],
      },
      {
        selector: ['property'],
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: ['property'],
        modifiers: ['protected'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-callback-in-promise': 'error',
    'promise/avoid-new': 'error',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/valid-params': 'error',
    'promise/prefer-await-to-then': 'error',
    // 'jsdoc/check-access': 'error',
    // 'jsdoc/check-alignment': 'error',
    // 'jsdoc/check-examples': "off",
    // 'jsdoc/check-indentation':'error',
    // 'jsdoc/check-line-alignment': 'error',
    // 'jsdoc/check-param-names': 'error',
    // 'jsdoc/check-property-names': 'error',
    // 'jsdoc/check-syntax': 'error',
    // 'jsdoc/check-tag-names': 'error',
    // 'jsdoc/check-types': 'off',
    // 'jsdoc/check-values': 'error',
    // 'jsdoc/empty-tags': 'error',
    // 'jsdoc/implements-on-classes': 'error',
    // 'jsdoc/match-description': 'off',
    // 'jsdoc/newline-after-description': 'error',
    // 'jsdoc/no-bad-blocks': 'error',
    // 'jsdoc/no-defaults': 'error',
    // 'jsdoc/no-types': 'error',
    // 'jsdoc/no-undefined-types': 'off',
    // 'jsdoc/require-description': 'error',
    // 'jsdoc/require-description-complete-sentence': 'off',
    // 'jsdoc/require-example': "off",
    // 'jsdoc/require-file-overview': 'off',
    // 'jsdoc/require-hyphen-before-param-description': 'error',
    // 'jsdoc/require-jsdoc': 'error',
    // 'jsdoc/require-param': 'error',
    // 'jsdoc/require-param-description': 'error',
    // 'jsdoc/require-param-name': 'error',
    // 'jsdoc/require-param-type': 'off',
    // 'jsdoc/require-property': 'error',
    // 'jsdoc/require-property-description': 'off',
    // 'jsdoc/require-property-name': 'error',
    // 'jsdoc/require-property-type': 'off',
    // 'jsdoc/require-returns': 'error',
    // 'jsdoc/require-returns-check': 'off',
    // 'jsdoc/require-returns-description': 'error',
    // 'jsdoc/require-returns-type': 'off',
    // 'jsdoc/valid-types': 'off',
  },
  overrides: [
    {
      "files": ["*Test.ts"],
      "rules": {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            printWidth: 150,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['variableLike', 'memberLike'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: ['typeLike'],
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
          },
          {
            selector: ['enumMember'],
            format: ['UPPER_CASE'],
          },
          {
            selector: ['property'],
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: ['property'],
            modifiers: ['protected'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
        ]
      }
    }
  ]
};
