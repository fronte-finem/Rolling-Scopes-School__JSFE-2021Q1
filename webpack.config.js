const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const BUILD_DIST = 'match-match-game';

module.exports = genConfig;

function genConfig(env) {
  const isDevMode = Boolean(env && env.devmode);
  const isMyEnv = Boolean(env && env.myenv);

  const config = addCssLoaders(isDevMode, baseConfig());
  config.output.path = isMyEnv
    ? `r:/${BUILD_DIST}`
    : path.resolve(__dirname, BUILD_DIST);

  if (isDevMode) {
    config.mode = 'development';
    config.devtool = 'inline-source-map';
    addDevServer(isMyEnv, config);
  } else {
    config.plugins.push(new ESLintPlugin({ extensions: ['ts', 'js'] }));
  }

  return config;
}

function addCssLoaders(isDevMode, config) {
  const loaders = [
    { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader },
    { loader: 'webpack-typings-for-css' },
    {
      loader: 'css-loader', // https://webpack.js.org/loaders/css-loader/
      options: {
        modules: {
          auto: () => true,
          // localIdentName: "[path][name]__[local]--[contenthash:base64:5]",
          localIdentName: '[local]--[contenthash:base64:9]',
          localIdentContext: path.resolve(__dirname, 'src'),
          localIdentHashPrefix: 'my-custom-hash',
          exportGlobals: true,
          exportLocalsConvention: 'camelCase',
        },
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                browsers: 'last 2 versions',
              },
            ],
          ],
        },
      },
    },
    'sass-loader',
  ];

  config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: loaders,
  });

  if (!isDevMode) {
    config.plugins.push(new MiniCssExtractPlugin());
  }

  return config;
}

function addDevServer(isMyEnv, config) {
  config.devServer = {
    contentBase: false,
    open: !isMyEnv
      ? true
      : {
          app: ['chrome', '--incognito'],
        },
    hot: true,
    port: 8080,
    overlay: {
      warnings: true,
      errors: true,
    },
  };

  return config;
}

function baseConfig() {
  return {
    mode: 'production',
    entry: {
      app: './src/index.ts',
    },
    output: {
      clean: true,
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
      rules: [
        {
          test: /\.[tj]s$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyPlugin({
        patterns: [{ from: 'public' }],
      }),
    ],
  };
}
