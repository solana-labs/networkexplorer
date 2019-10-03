import {compose, getOr, multiply} from 'lodash/fp';

export default compose(
  //
  // FIXME: this masks possible calculation errors, see:
  //
  //    https://github.com/solana-labs/networkexplorer/issues/456
  //    https://github.com/solana-labs/networkexplorer/issues/425
  //
  time => (time > 100 ? 100 : parseFloat(time.toFixed(time ? 4 : 2))),
  multiply(100),
  getOr(0, 'uptime.uptime.[0].percentage'),
);
