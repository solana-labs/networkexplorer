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
    '& > div': {
      width: '100%!important',
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
