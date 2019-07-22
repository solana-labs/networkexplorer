import {compose, getOr, multiply} from 'lodash/fp';

export default compose(
  time => time.toFixed(time ? 4 : 2),
  multiply(100),
  getOr(0, 'uptime.uptime.[0].percentage'),
);
