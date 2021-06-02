module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base-ts',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    requireConfigFile: false,
  },
  settings: {
    'import/resolver': 'typescript',
  },
  plugins: ['@typescript-eslint', '@babel', 'simple-import-sort'],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-bitwise': ['error', { int32Hint: true }],
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    '@typescript-eslint/no-floating-promises': [
      'error',
      { ignoreVoid: true, ignoreIIFE: true },
    ],
    'no-void': ['error', { allowAsStatement: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    'simple-import-sort/imports': 'error',
  },
  ignorePatterns: ['.eslintrc.js', 'webpack-config/**/*'],
};
