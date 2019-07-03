import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    paddingTop: 100,
    position: 'relative',
    marginLeft: 28,
  },
  left: {
    background: getColor('main')(theme),
    padding: '45px 80px 35px',
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    background: getColor('grey2')(theme),
    padding: '170px 80px 35px',
  },
  copyright: {
    marginTop: 'auto',
    fontSize: 10,
    color: getColor('dark')(theme),
  },
  bg: {
    position: 'absolute',
    left: -160,
  },
}));
