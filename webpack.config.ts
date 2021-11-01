import path from 'path';
import { Configuration as WebpackConfiguration, DefinePlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

interface Env {
  dev?: boolean;
  myenv?: boolean;
}

const MY_BROWSER = { app: ['chrome', '--incognito'] };
const BUILD_DIST = 'english-for-kids';
const PROJECT_DIST = path.resolve(__dirname, BUILD_DIST);
const RAMDISK_DIST = `r:/${BUILD_DIST}`;
const TARGETS = 'last 1 chrome version, last 1 firefox version';
const DEV_BACKEND_API = 'http://localhost:5000';
const PROD_BACKEND_API = 'https://fronte-finem--english-for-kids.herokuapp.com';

function devConfig({ dev, myenv }: Env): Configuration {
  return {
    mode: dev ? 'development' : 'production',

    entry: './src/index.tsx',

    output: {
      path: myenv ? RAMDISK_DIST : PROJECT_DIST,
      clean: true,
      publicPath: '',
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]',
    },

    devtool: !dev ? undefined : 'eval-cheap-source-map',

    devServer: !dev
      ? undefined
      : {
          contentBase: false,
          hot: true,
          port: 8080,
          open: !myenv ? true : MY_BROWSER,
          overlay: {
            warnings: true,
            errors: true,
          },
        },

    module: {
      rules: [
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/,
          type: 'asset/resource',
        },

        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },

        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              targets: TARGETS,
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: false }],
              ],
            },
          },
        },

        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader },

            {
              loader: 'css-loader', // https://webpack.js.org/loaders/css-loader/
              options: {
                modules: {
                  auto: true,
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
                  plugins: [['postcss-preset-env', { browsers: TARGETS }]],
                },
              },
            },

            { loader: 'sass-loader' },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },

    plugins: [
      new DefinePlugin({
        BACKEND_API: JSON.stringify(dev ? DEV_BACKEND_API : PROD_BACKEND_API),
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new CopyPlugin({
        patterns: [{ from: 'public' }],
      }),
      dev
        ? () => {}
        : new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
          }),
    ],
  };
}

export default devConfig;
