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
    padding: '0 5px',
    color: getColor('greenDark')(theme),
    transition: '.15s ease-in-out',
    marginLeft: 15,
    '&:hover': {
      color: getColor('main')(theme),
      borderColor: getColor('main')(theme),
      textDecoration: 'none',
    },
  },
}));
