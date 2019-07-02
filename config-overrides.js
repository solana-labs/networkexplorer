/* eslint-disable */
const {override, addBabelPlugin} = require('customize-cra');

module.exports = override(
  // addBabelPlugin('lodash'),
  addBabelPlugin('date-fns'),
  addBabelPlugin('react-hot-loader/babel'),
);
