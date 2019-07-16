import {makeStyles} from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    marginBottom: 47,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  decor: {
    position: 'absolute',
    left: -120,
    top: '50%',
    transform: 'translateY(-50%)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
