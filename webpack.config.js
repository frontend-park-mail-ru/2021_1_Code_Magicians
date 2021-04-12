const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: path.resolve('src/main.js'),
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
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'),
      favicon: path.resolve('src/assets/img/favicon.png'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],

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
  mode: 'development',
  devServer: {
    publicPath: '/',
    contentBase: path.resolve('src'),
    hot: true,
    port: 8081,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
};
