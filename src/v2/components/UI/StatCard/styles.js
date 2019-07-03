import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    background: getColor('grey')(theme),
    color: '#fff',
    borderRadius: 0,
    height: '100%',
    padding: '17px 30px',
  },
  value: {
    fontSize: 60,
    fontWeight: 'bold',
    color: getColor('main')(theme),
    margin: '20px 0',
  },
  changes: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
}));
