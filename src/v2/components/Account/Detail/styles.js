import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  applicationTitle: {
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
  },
  types: {
    '& > div:not(:last-child)': {
      marginRight: 8,
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
}));
