import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    marginTop: 19,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingBottom: 27,
      marginBottom: 50,
    },
  },
  list: {
    width: '100%',
  },
  vertical: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  card: {
    padding: 7,
    background: getColor('grey2')(theme),
    '& ul': {
      padding: 0,
      margin: 0,
      display: 'flex',
      flexWrap: 'wrap',
      '& li': {
        padding: 10,
        width: '33.33%',
        [theme.breakpoints.down('xs')]: {
          width: '50%',
        },
        '& div:last-child': {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
      },
    },
  },
  cardVertical: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginRight: 0,
      maxWidth: '100%',
    },
  },
  cardTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#C4C4C4',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
}));
