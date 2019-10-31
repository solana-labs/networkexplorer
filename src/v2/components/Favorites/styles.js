import {makeStyles} from '@material-ui/core';

export default makeStyles(theme => ({
  indicator: {
    display: 'none',
  },
  root: {
    marginTop: 19,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingBottom: 27,
      marginBottom: 50,
    },
  },
  list: {
    width: '100%',
  },
  vertical: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  warn: {
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 15,
    },
  },
}));
