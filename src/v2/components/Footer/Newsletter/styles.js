import {makeStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  title: {
    marginTop: 38,
    color: getColor('dark')(theme),
    marginBottom: 15,
  },
  desc: {
    color: getColor('dark')(theme),
    fontSize: 15,
    lineHeight: '24px',
    maxWidth: 225,
    marginBottom: 20,
  },
  form: {
    border: `1px solid ${fade(getColor('dark')(theme), 0.3)}`,
    padding: 5,
    display: 'flex',
    marginBottom: 132,
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  input: {
    border: 'none',
    background: getColor('grey2')(theme),
    height: 40,
    width: '100%',
    padding: '0 20px',
    fontSize: 12,
  },
  btn: {
    background: getColor('main')(theme),
    border: `1px solid ${getColor('grey2')(theme)}`,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: '5px 14px',
  },
}));
