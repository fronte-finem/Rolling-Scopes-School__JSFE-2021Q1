module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': 'typescript',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
  ignorePatterns: ['webpack.config.js'],
};
