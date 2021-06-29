const fs = require('fs');

const folders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    requireConfigFile: false,
  },
  ignorePatterns: ['.eslintrc.js', 'webpack-config/**/*'],
  settings: {
    'import/resolver': 'typescript',
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
  },
  plugins: ['@typescript-eslint', '@babel', 'prettier', 'import', 'simple-import-sort'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-bitwise': ['error', { int32Hint: true }],
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true, ignoreIIFE: true }],
    'no-void': ['error', { allowAsStatement: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterOverload: true, exceptAfterSingleLine: true },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-await-in-loop': 'warn',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` related packages come first.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^react', '^@?\\w'],
          // Absolute local imports
          [`^(${folders.join('|')})(/.*|$)`],
          // Relative imports.
          ['^\\.'],
          // for scss imports.
          ['^[^.]'],
        ],
      },
    ],
  },
};
