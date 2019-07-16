import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    padding: '40px 0',
  },
  stages: {
    display: 'flex',
    width: '100%',
    padding: 0,
    marginLeft: 50,
    maxWidth: 675,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      marginLeft: 0,
    },
  },
  stage: {
    height: 55,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: getColor('white')(theme),
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    textTransform: 'uppercase',
    lettersSpacing: 2.5,
    border: `1px solid ${getColor('grey3')(theme)}`,
    flex: 1,
    fontWeight: 'bold',
    '&:not(:first-child)': {
      borderLeft: 'none',
    },
    '& span': {
      fontSize: 10,
      marginTop: 3,
      fontWeight: 'normal',
    },
  },
  stageActive: {
    background: getColor('main')(theme),
    color: getColor('dark')(theme),
    borderColor: getColor('main')(theme),
  },
}));
