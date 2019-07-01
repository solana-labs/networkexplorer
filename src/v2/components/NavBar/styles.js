import {makeStyles} from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    width: 102,
    flexShrink: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    marginBottom: 29,
    ...theme.mixins.toolbar,
  },
  item: {
    height: 102,
  },
  icon: {
    justifyContent: 'center',
    '& svg': {
      stroke: '#fff',
    },
  },
  drawerRoot: {
    width: 102,
    flexShrink: 0,
  },
}));
