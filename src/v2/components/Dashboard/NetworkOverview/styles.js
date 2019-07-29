import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    padding: '40px 0',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 60,
    },
  },
  row: {
    marginBottom: 8,
  },
  betaLabel: {
    fontSize: 15,
    color: getColor('main')(theme),
    lineHeight: 1
  }
}));
