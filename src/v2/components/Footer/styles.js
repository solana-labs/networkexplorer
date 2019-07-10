import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    paddingTop: 100,
    position: 'relative',
    marginLeft: 28,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 20,
      marginLeft: 0,
    },
  },
  left: {
    background: getColor('main')(theme),
    padding: '45px 80px 35px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      padding: '40px 22px',
    },
  },
  right: {
    background: getColor('grey2')(theme),
    padding: '170px 80px 35px',
    [theme.breakpoints.down('md')]: {
      padding: '40px 22px',
    },
  },
  copyright: {
    marginTop: 'auto',
    fontSize: 10,
    color: getColor('dark')(theme),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  bg: {
    position: 'absolute',
    left: -160,
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: '100%',
      height: 70,
      objectFit: 'cover',
    },
  },
}));
