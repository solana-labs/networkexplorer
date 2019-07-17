import {makeStyles} from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    padding: '40px 0',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 60,
    },
  },
  row: {
    marginBottom: 8,
  },
}));
