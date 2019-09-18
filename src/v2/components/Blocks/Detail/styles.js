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
    '& li': {
      width: '50%',
      display: 'flex',
      marginBottom: 48,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 32,
        flexDirection: 'column',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      '&:nth-child(odd)': {
        width: 'calc(50% - 80px)',
        marginRight: 80,
        [theme.breakpoints.down('xs')]: {
          width: '100%',
          marginRight: 0,
        },
      },
    },
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2,
    width: 100,
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
