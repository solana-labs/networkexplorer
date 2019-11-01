import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  blockTitle: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 'auto',
    overflow: 'hidden',
    '& div': {
      marginLeft: 15,
      display: 'flex',
      alignItems: 'center',
    },
    '& span': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      '& span': {
        width: '100%',
        marginBottom: 3,
      },
    },
  },
  spec: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
  },
  tabs: {
    marginBottom: 50,
  },
  indicator: {
    display: 'none',
  },
  tab: {
    border: `1px solid ${getColor('main')(theme)}`,
    color: getColor('main')(theme),
    opacity: 1,
  },
  tabSelected: {
    backgroundColor: getColor('main')(theme),
    color: getColor('dark')(theme),
  },
  loader: {
    marginTop: 40,
  },
}));
