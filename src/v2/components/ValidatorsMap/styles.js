import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  tooltip: {
    background: '#fff',
    color: getColor('dark')(theme),
    padding: `10px 18px`,
    borderRadius: 0,
    maxWidth: 300,
    zIndex: 1000,
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
  marker: {
    transition: '.15s ease-in-out',
    '&:hover': {
      transform: 'scale(2)',
    },
  },
  inner: {
    '& a': {
      color: getColor('greenDark')(theme),
      fontSize: 21,
    },
  },
  info: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: '30px',
    '& > div': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}));
