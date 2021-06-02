const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
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
              plugins: ['@vanilla-extract/babel-plugin'],
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
            'css-loader',
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
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin(),
      new ESLintPlugin({ extensions: ['ts'] }),
    ],
  };
}
