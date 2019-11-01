import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  blockTitle: {
    marginRight: 'auto',
    marginLeft: 200,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    '& div': {
      marginLeft: 10,
    },
  },
  spec: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  tableTitle: {
    background: getColor('main')(theme),
    textTransform: 'uppercase',
    padding: '18px 33px 15px',
    fontWeight: 'bold',
    color: getColor('dark')(theme),
    letterSpacing: 2.5,
    marginBottom: 26,
  },
  leader: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      marginRight: 10,
    },
  },
}));
