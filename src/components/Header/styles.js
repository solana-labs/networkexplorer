import {makeStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';
import getColor from '../../utils/getColor';

export default makeStyles(theme => ({
  root: {
    padding: '18px 68px 18px 28px',
    borderBottom: `1px solid ${fade(theme.palette.primary.grey3, 0.5)}`,
    zIndex: theme.zIndex.drawer + 1,
  },
  search: {
    marginLeft: 66,
    marginRight: 'auto',
    width: '100%',
    maxWidth: 713,
  },
  realTime: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    marginLeft: 66,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 2.5,
    '& div': {
      background: 'transparent',
      border: `1px solid ${getColor('main')(theme)}`,
      color: getColor('main')(theme),
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      padding: '0 15px',
      height: 40,
      marginLeft: 15,
      '& svg': {
        marginLeft: 20
      }
    },
  },
}));
