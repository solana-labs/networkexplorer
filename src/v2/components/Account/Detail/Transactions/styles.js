import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  timeType: {
    display: 'inline-block',
    backgroundColor: getColor('grey3')(theme),
    textTransform: 'uppercase',
    borderRadius: 2,
    color: getColor('dark')(theme),
    padding: '2px 10px',
    marginLeft: 20,
  },
}));
