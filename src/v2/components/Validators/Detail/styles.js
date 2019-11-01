import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  validatorName: {
    marginRight: 'auto',
    marginLeft: 40,
  },
  headerBtn: {
    marginLeft: 40,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 5,
    },
  },
  spec: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  address: {
    display: 'flex',
    alignItem: 'center',
    color: getColor('main')(theme),
  },
  map: {
    height: 500,
    [theme.breakpoints.down('sm')]: {
      height: 250,
    },
  },
}));
