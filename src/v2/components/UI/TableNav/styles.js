import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    '& a': {
      display: 'flex',
      color: getColor('white')(theme),
    },
  },
}));
