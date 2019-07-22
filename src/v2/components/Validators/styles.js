import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    padding: '40px 0',
  },
  changes: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px',
  },
  period: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: getColor('grey4')(theme),
    fontWeight: 'normal',
  },
  card: {
    minWidth: '1px',
    '&:not(:last-child)': {
      marginBottom: 15,
    },
    [theme.breakpoints.down('md')]: {
      flex: 1,
      '&:not(:last-child)': {
        marginBottom: 0,
        marginRight: 10,
      },
    },
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      '&:not(:last-child)': {
        marginRight: 0,
        marginBottom: 15,
      },
    },
  },
  becomeBtn: {
    marginLeft: 'auto',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  stats: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
