// const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.DEBUG ? 'development' : 'production',
  entry: path.resolve('src/main.js'),
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      assets: path.resolve(''),
    },
  },
};
