import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  total: {
    marginRight: 'auto',
    marginLeft: 100,
  },
  nav: {
    display: 'flex',
    marginTop: 10,
    '& a': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: getColor('white')(theme),
      color: getColor('dark')(theme),
      marginRight: 1,
    },
  },
}));
