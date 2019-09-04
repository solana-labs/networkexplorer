import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  link: {
    width: 18,
    flexShrink: 0,
    display: 'inline-flex',
    height: 18,
    borderRadius: '50%',
    border: `1px solid ${getColor('greenDark')(theme)}`,
    fontSize: 12,
    alignItems: 'center',
    padding: '2px 5px 0',
    color: getColor('greenDark')(theme),
    transition: '.15s ease-in-out',
    marginLeft: 5,
    marginTop: -2,
    '&:hover': {
      color: getColor('main')(theme),
      borderColor: getColor('main')(theme),
      textDecoration: 'none',
    },
  },
  tooltip: {
    backgroundColor: getColor('white')(theme),
    color: getColor('dark')(theme),
    fontSize: 12,
    lineHeight: '16px',
    borderRadius: 0,
    padding: 11,
  },
}));
