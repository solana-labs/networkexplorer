import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    color: getColor('grey4')(theme),
    fontSize: 15,
    letterSpacing: 2,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
}));
