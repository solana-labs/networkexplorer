import {makeStyles} from '@material-ui/core';

import getColor from '../../../../utils/getColor';

export default makeStyles(theme => ({
  card: {
    background: getColor('grey')(theme),
    color: '#fff',
    borderRadius: 0,
    height: '100%',
    padding: '17px 30px',
  },
  val: {
    fontSize: 60,
    fontWeight: 'bold',
    color: getColor('main')(theme),
    margin: '20px 0',
  },
  leader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: getColor('main')(theme),
    marginTop: 40,
    letterSpacing: 3.4,
  },
  changes: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}));
