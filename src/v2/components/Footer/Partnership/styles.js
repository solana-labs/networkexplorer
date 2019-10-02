import {makeStyles} from '@material-ui/core';

import getColor from '../../../utils/getColor';

export default makeStyles(theme => ({
  title: {
    marginBottom: 15,
  },
  desc: {
    fontSize: 15,
    lineHeight: '24px',
    marginBottom: 23,
  },
  links: {
    marginTop: 43,
  },
  link: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 3.2,
    color: '#fff',
    marginBottom: 21,
    outline: 'none',
    width: 250,
    justifyContent: 'space-between',
    '& img': {
      marginLeft: 10,
    },
    cursor: 'pointer',
  },
  disclaimer: {
    display: 'flex',
    zIndex: 9999,
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto',
    },
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: getColor('white')(theme),
    borderRadius: 0,
    '&:hover': {
      backgroundColor: getColor('white')(theme),
    },
  },
  closeIcon: {
    color: getColor('dark')(theme),
  },
  popup: {
    position: 'relative',
    background: getColor('dark')(theme),
    padding: '0 150px',
    maxWidth: 1050,
    height: '70%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 25,
      height: 'auto',
    },
    '& p': {
      fontSize: 14,
      lineHeight: 1.73,
    },
  },
}));
