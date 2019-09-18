import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  card: {
    background: getColor('grey2')(theme),
    maxHeight: 290,
    overflow: 'hidden',
    height: '100%',
    border: `1px solid ${getColor('grey5')(theme)}`,
    position: 'relative',
  },
  mapTitle: {
    position: 'absolute',
    zIndex: 1000,
    left: 24,
    top: 13,
  },
}));
