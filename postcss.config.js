module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        browsers: 'last 1 chrome version, last 1 firefox version',
      },
    ],
  ],
};
