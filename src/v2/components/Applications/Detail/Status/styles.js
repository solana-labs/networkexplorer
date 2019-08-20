import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  spec: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    '& li': {
      display: 'flex',
      marginBottom: 48,
      width: '100%',
      '& > div:first-child': {
        width: 150,
        marginRight: 40,
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 32,
        flexDirection: 'column',
      },
      '&:nth-child(odd)': {
        marginRight: 80,
        [theme.breakpoints.down('xs')]: {
          marginRight: 0,
        },
      },
    },
  },
  value: {
    fontSize: 15,
    lineHeight: '29px',
    overflow: 'hidden',
    textTransform: 'uppercase',
    textOverflow: 'ellipsis',
    '& a': {
      color: getColor('main')(theme),
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: '50%',
    overflow: 'hidden',
    border: `3px solid ${getColor('grey4')(theme)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: getColor('dark')(theme),
    zIndex: 1,
    fontSize: 24,
    marginTop: 57,
    '& div': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: getColor('main')(theme),
      left: 0,
      top: 30,
      zIndex: -1,
    },
  },
}));
