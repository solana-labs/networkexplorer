import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    width: 102,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    marginBottom: 29,
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  item: {
    height: 102,
  },
  icon: {
    justifyContent: 'center',
    '& svg': {
      stroke: '#fff',
    },
  },
  drawerRoot: {
    width: 102,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
  },
  drawerPaper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      background: getColor('dark')(theme),
    },
  },
  menuButton: {
    marginLeft: 'auto',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  itemText: {
    textTransform: 'uppercase',
    marginLeft: 38,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));
