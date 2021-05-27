module.exports = {
  env: {
    browser: true,
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
  },
  settings: {
    'import/resolver': 'typescript',
  },
  plugins: ['@typescript-eslint'],
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
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error'],
  },
  ignorePatterns: ['webpack.config.js', '.eslintrc.js'],
};
