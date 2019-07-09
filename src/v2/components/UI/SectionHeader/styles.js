import {makeStyles} from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    marginBottom: 47,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  decor: {
    position: 'absolute',
    left: -120,
    top: -7,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
