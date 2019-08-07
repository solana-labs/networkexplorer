import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  blockTitle: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 100,
    marginRight: 'auto',
    overflow: 'hidden',
    '& div': {
      marginLeft: 15,
      display: 'flex',
      alignItems: 'center',
    },
    '& span': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      marginLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      '& span': {
        width: '100%',
        marginBottom: 3,
      },
    },
  },
  qrBtn: {
    color: getColor('main')(theme),
    border: `1px solid ${getColor('main')(theme)}`,
    fontSize: 10,
    textTransform: 'uppercase',
    height: 18,
    width: 55,
    background: 'transparent',
    padding: 0,
    marginLeft: 15,
  },
  spec: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    '& li': {
      width: '50%',
      display: 'flex',
      marginBottom: 48,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 32,
        flexDirection: 'column',
      },
      '&:nth-child(odd)': {
        width: 'calc(50% - 80px)',
        marginRight: 80,
        [theme.breakpoints.down('xs')]: {
          marginRight: 40,
          width: 'calc(50% - 40px)',
        },
      },
    },
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2,
    width: 150,
    flexShrink: 0,
    marginRight: 40,
    color: getColor('grey4')(theme),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginRight: 20,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  value: {
    fontSize: 15,
    lineHeight: '29px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& a': {
      color: getColor('main')(theme),
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  tabs: {
    marginBottom: 50,
  },
  indicator: {
    display: 'none',
  },
  tab: {
    border: `1px solid ${getColor('main')(theme)}`,
    color: getColor('main')(theme),
    opacity: 1,
  },
  tabSelected: {
    backgroundColor: getColor('main')(theme),
    color: getColor('dark')(theme),
  },
}));
