const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = devConfig;

const MY_BROWSER = { app: ['chrome', '--incognito'] };

function devConfig(env) {
  const isMyEnv = Boolean(env && env.myenv);
  return {
    mode: 'development',
    entry: {
      app: './src/index.ts',
    },
    output: {
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: false,
      open: !isMyEnv ? true : MY_BROWSER,
      hot: true,
      port: 8080,
      overlay: {
        warnings: true,
        errors: true,
      },
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
          test: /\.s?css$/,
          use: [
            'style-loader',
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
      extensions: ['.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CopyPlugin({
        patterns: [{ from: 'public' }],
      }),
    ],
  };
}
