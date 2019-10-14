import {makeStyles} from '@material-ui/core';

import getColor from '../../../utils/getColor';

export default makeStyles(theme => ({
  root: {},
  caption: {
    letterSpacing: 2.5,
    color: getColor('caption')(theme),
    fontSize: 15,
  },
  text: {},
}));
