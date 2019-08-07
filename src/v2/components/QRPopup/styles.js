import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  qrBtn: {
    color: getColor('main')(theme),
    border: `1px solid ${getColor('main')(theme)}`,
    fontSize: 10,
    textTransform: 'uppercase',
    height: 18,
    width: 55,
    background: 'transparent',
    padding: 0,
  },
}));
