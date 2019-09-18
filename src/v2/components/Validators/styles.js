import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  changes: {
    display: 'flex',
    justifyContent: 'center',
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
    minHeight: 150,
    '&:not(:last-child)': {
      marginBottom: 15,
    },
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      '&:not(:last-child)': {
        marginBottom: 0,
        marginRight: 10,
      },
    },
    [theme.breakpoints.down('xs')]: {
      flex: 1,
      '&:not(:last-child)': {
        marginRight: 0,
        marginBottom: 15,
      },
    },
    '& svg': {
      height: '100%',
      width: '100%',
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
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  loader: {
    height: '100%',
    '& svg': {
      width: '100%',
      height: '100%',
    },
  },
  map: {
    height: '100%',
    border: `1px solid ${getColor('grey5')(theme)}`,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: 290,
    },
  },
  mapTitle: {
    position: 'absolute',
    left: 24,
    top: 13,
    zIndex: 100,
  },
}));
