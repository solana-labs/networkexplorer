import { makeStyles } from '@material-ui/core/styles';
import getColor from 'utils/getColor';

export default makeStyles(theme => {
  return {
    root: {
      border: `1px solid ${getColor('grey')(theme)}`,
      padding: 5,
      display: 'flex',
    },
    input: {
      border: 'none',
      background: getColor('grey2')(theme),
      height: 40,
      width: '100%',
      padding: '0 20px',
    },
    btn: {
      background: getColor('main')(theme),
      borderRadius: 0,
      width: 40,
    },
  };
});
