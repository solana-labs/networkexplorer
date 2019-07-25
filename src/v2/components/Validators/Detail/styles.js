import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    paddingTop: 57,
  },
  validatorName: {
    fontSize: 15,
    color: getColor('main')(theme),
    textTransform: 'none',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 'auto',
    flexShrink: 1,
    minWidth: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 5,
    },
    '& > span:nth-child(2)': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      marginLeft: 22,
    },
    '& div:last-child': {
      cursor: 'pointer',
      marginLeft: 14,
    },
  },
  headerBtn: {
    marginLeft: 40,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 5,
    },
  },
  spec: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    '& li': {
      width: '50%',
      display: 'flex',
      marginBottom: 48,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 32,
        width: '100%',
        flexDirection: 'column',
      },
      '&:nth-child(odd)': {
        width: 'calc(50% - 80px)',
        marginRight: 80,
        [theme.breakpoints.down('sm')]: {
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
    width: 165,
    flexShrink: 0,
    marginRight: 40,
    color: getColor('grey4')(theme),
    display: 'flex',
    alignItems: 'center',
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
  },
}));
