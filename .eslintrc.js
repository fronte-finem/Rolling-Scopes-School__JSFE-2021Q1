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
  plugins: ['@typescript-eslint', 'simple-import-sort'],
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
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Global style imports.
          ['^(\\u0000|@).+\\.s?css$'],
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^(\\.|~).+\\.s?css$'],
        ],
      },
    ],
  },
  ignorePatterns: ['webpack.config.js', '.eslintrc.js', './typings/**/*'],
};
