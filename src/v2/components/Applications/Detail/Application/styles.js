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
    justifyContent: 'flex-end',
    marginBottom: 40,
    '& > div:first-child': {
      marginRight: 25,
    },
    '& > div:last-child': {
      marginLeft: 25,
    },
  },
  address: {
    color: getColor('main')(theme),
    lineHeight: '29px',
  },
  id: {
    marginTop: 28,
    '& > div:not(:first-child)': {
      marginRight: 5,
    },
  },
}));
