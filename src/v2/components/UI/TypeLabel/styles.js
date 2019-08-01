import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    height: 27,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    border: '1px solid transparent',
    padding: '0 10px',
    [theme.breakpoints.down('xs')]: {
      height: 18,
      padding: '0 7px',
    },
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 15,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
    },
  },
  loader: {
    color: getColor('aqua')(theme),
    borderColor: getColor('aqua')(theme),
  },
  system: {
    color: getColor('pink')(theme),
    borderColor: getColor('pink')(theme),
  },
  consensus: {
    color: getColor('blue')(theme),
    borderColor: getColor('blue')(theme),
  },
  other: {
    color: getColor('yellow')(theme),
    borderColor: getColor('yellow')(theme),
  },
}));
