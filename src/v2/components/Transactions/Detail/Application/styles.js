import {makeStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    borderBottom: `1px solid ${fade(getColor('grey3')(theme), 0.5)}`,
    paddingBottom: 34,
  },
  account: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
    '& > div:first-child': {
      marginRight: 25,
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  id: {
    marginTop: 28,
    '& > div:not(:first-child)': {
      marginRight: 5,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
}));
