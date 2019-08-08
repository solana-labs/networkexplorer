import {makeStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    padding: '18px 28px',
    borderBottom: `1px solid ${fade(theme.palette.primary.grey3, 0.5)}`,
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('sm')]: {
      padding: '18px 0',
    },
  },
  inner: {
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  search: {
    marginLeft: 25,
    marginRight: 'auto',
    width: '100%',
    maxWidth: 713,
    [theme.breakpoints.down('sm')]: {
      order: 1,
      marginLeft: 0,
      maxWidth: '100%',
      marginTop: 23,
    },
  },
  endpointSelector: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  selectTitle: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 2.5,
    marginRight: 10,
  },
  realTime: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 25,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 2.5,
    marginRight: 25,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    '& p': {
      maxWidth: 82,
    },
    '& div': {
      background: 'transparent',
      border: `1px solid ${getColor('white')(theme)}`,
      color: getColor('white')(theme),
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      padding: '0 15px',
      height: 40,
      marginLeft: 10,
      '& svg': {
        marginLeft: 20,
      },
    },
  },
  menuButton: {
    display: 'none',
    marginLeft: 'auto',
    borderRadius: 0,
    padding: 10,
    background: getColor('white')(theme),
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  menuIcon: {
    color: getColor('dark')(theme),
  },
  github: {
    display: 'flex',
    fontSize: 12,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    width: 220,
    flexShrink: 0,
    alignItems: 'center',
    marginLeft: 16,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  icon: {
    width: 40,
    height: 40,
    flexShrink: 0,
    background: getColor('main')(theme),
    padding: 8,
    marginLeft: 5,
  },
}));
