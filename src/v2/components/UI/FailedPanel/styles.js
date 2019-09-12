import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    paddingTop: 50,
    marginBottom: 'auto',
  },
  body: {
    backgroundColor: getColor('grey')(theme),
    padding: 15,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    color: getColor('pink')(theme),
    '& svg': {
      marginRight: 15,
    },
  },
  text: {
    fontWeight: 'bold',
    '& a': {
      color: getColor('main')(theme),
    },
  },
}));
