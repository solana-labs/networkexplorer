import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  card: {
    background: getColor('grey2')(theme),
    height: '100%',
    overflow: 'hidden',
    padding: '14px 35px',
    display: 'flex',
    flexDirection: 'column',
    '& svg': {
      margin: 'auto',
    },
  },
  tooltip: {
    background: '#fff',
    color: getColor('dark')(theme),
    padding: 10,
    borderRadius: 0,
  },
  tooltipTitle: {
    fontSize: 15,
    marginBottom: 4,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  tooltipDesc: {
    fontSize: 12,
    color: getColor('grey3')(theme),
  },
}));
