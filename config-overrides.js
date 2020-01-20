/* eslint-disable */
const {override, addBabelPlugin, addWebpackPlugin} = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  // addBabelPlugin('lodash'),
  addBabelPlugin('react-hot-loader/babel'),
  addBabelPlugin('date-fns'),
  addWebpackPlugin(new webpack.ContextReplacementPlugin(/hasha/)),
);
