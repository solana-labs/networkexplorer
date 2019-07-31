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
  coming: {
    position: 'absolute',
    fontSize: 12,
    color: getColor('main')(theme),
    opacity: 0,
    transition: '.15s ease-in-out',
    bottom: -8,
    [theme.breakpoints.down('sm')]: {
      opacity: 1,
      bottom: 25,
      marginLeft: 15,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 93,
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
  icon: {
    justifyContent: 'center',
    '& svg': {
      stroke: '#fff',
    },
  },
  itemSelected: {
    color: getColor('main')(theme),
    '& svg': {
      stroke: getColor('main')(theme),
    },
  },
  drawerRoot: {
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
  },
  drawerPaper: {
    '&:hover a div:nth-child(2)': {
      opacity: 1,
      visibility: 'visible',
    },
    '&:hover a div:nth-child(3)': {
      opacity: 1,
      visibility: 'visible',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      background: getColor('dark')(theme),
      paddingTop: 18,
    },
  },
  listRoot: {
    width: 88,
    transition: '.15s ease-in-out',
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '100%',
    '&:hover': {
      width: 225,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '&:hover': {
        width: '100%',
      },
    },
  },
  menuButton: {
    marginLeft: 'auto',
    display: 'none',
    padding: 10,
    background: getColor('white')(theme),
    borderRadius: 0,
    marginRight: 16,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  menuIcon: {
    color: getColor('dark')(theme),
  },
  itemTextRoot: {
    opacity: 0,
    visibility: 'hidden',
    position: 'absolute',
    bottom: 2,
    [theme.breakpoints.down('sm')]: {
      opacity: 1,
      visibility: 'visible',
      position: 'relative',
      width: 135,
      flex: 'none',
      marginLeft: 37,
    },
  },
  itemText: {
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    whiteSpace: 'nowrap',
  },
  endpointSelectorTitle: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 2.5,
    marginBottom: 10,
  },
  endpointSelector: {
    display: 'none',
    marginBottom: 25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
}));
