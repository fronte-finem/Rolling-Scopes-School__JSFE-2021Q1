const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const BUILD_DIST = 'async-race';
const PROJECT_DIST = path.resolve(__dirname, BUILD_DIST);
const RAMDISK_DIST = `r:/${BUILD_DIST}`;

module.exports = prodConfig;

function prodConfig(env) {
  const isMyEnv = Boolean(env && env.myenv);
  return {
    mode: 'production',
    entry: {
      app: './src/index.ts',
    },
    output: {
      path: isMyEnv ? RAMDISK_DIST : PROJECT_DIST,
      clean: true,
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          // use: 'ts-loader',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // https://webpack.js.org/loaders/css-loader/
              options: {
                modules: {
                  auto: true,
                  // localIdentName: "[path][name]__[local]--[contenthash:base64:5]",
                  localIdentName: '[local]--[contenthash:base64:9]',
                  localIdentContext: path.resolve(__dirname, 'src'),
                  exportGlobals: true,
                  exportLocalsConvention: 'camelCase',
                },
                importLoaders: 0,
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
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts'],
      plugins: [new TsconfigPathsPlugin()],
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
      new MiniCssExtractPlugin(),
      new ESLintPlugin({ extensions: ['ts'] }),
    ],
  };
}
