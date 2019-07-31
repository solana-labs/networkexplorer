import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  selectMenu: {
    backgroundColor: getColor('dark')(theme),
  },
  selectItem: {
    color: getColor('main')(theme),
  },
  selectedItem: {
    backgroundColor: `${getColor('main')(theme)}!important`,
    color: getColor('dark')(theme),
    '&:hover': {
      backgroundColor: getColor('main')(theme),
    },
  },
  networkSelect: {
    minWidth: 125,
    paddingTop: 12,
    paddingBottom: 12,
    color: getColor('main')(theme),
  },
  selectInput: {
    borderColor: getColor('main')(theme),
    borderRadius: 0,
  },
  selectIcon: {
    color: getColor('main')(theme),
  },
}));
