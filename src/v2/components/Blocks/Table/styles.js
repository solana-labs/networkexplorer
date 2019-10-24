import {makeStyles} from '@material-ui/core';

export default makeStyles(theme => ({
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
}));
