import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 80,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
  link: {
    background: getColor('main')(theme),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    marginBottom: 22,
    '& svg': {
      width: 17,
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      marginRight: 22,
    },
  },
}));
