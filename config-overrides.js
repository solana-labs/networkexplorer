/* eslint-disable */
const {override, addBabelPlugin} = require('customize-cra');

module.exports = override(
  // addBabelPlugin('lodash'),
  addBabelPlugin('react-hot-loader/babel'),
  addBabelPlugin('date-fns'),
);
