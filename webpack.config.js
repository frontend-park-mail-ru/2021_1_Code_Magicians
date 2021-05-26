const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const debug = process.env.DEBUG === 'true';
const port = process.env.PORT || 80;
const babelOptions = JSON.parse(fs.readFileSync(path.resolve('./.babelrc.json')).toString());

module.exports = {
  mode: debug ? 'development' : 'production',
  entry: path.resolve('src/main.js'),
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  resolve: {
    alias: {
      assets: path.resolve('src/assets'),
      components: path.resolve('src/components'),
      appManagers: path.resolve('src/appManagers'),
      stores: path.resolve('src/stores'),
      models: path.resolve('src/models'),
      views: path.resolve('src/views'),
      actions: path.resolve('src/actions'),
      consts: path.resolve('src/consts'),
      modules: path.resolve('src/modules'),
      utils: path.resolve('src/utils'),
    },
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(jpg|jpeg|png|ico|ttf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        exclude: /(.*node_modules)/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: debug,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'),
      favicon: path.resolve('src/assets/img/favicon.png'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      DEBUG: debug,
    }),
  ],

  devServer: {
    host: '0.0.0.0',
    port,
    publicPath: '/',
    contentBase: path.resolve('src'),

    hot: debug,
    inline: debug,
    clientLogLevel: debug ? 'debug' : 'silent',
    writeToDisk: true,

    historyApiFallback: true,
    disableHostCheck: true,
  },
  devtool: 'eval-source-map',
  optimization: {
    minimize: true,
  },
};
