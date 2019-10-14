import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    marginTop: 19,
    background: getColor('grey2')(theme),
    padding: '25px 44px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingBottom: 27,
      marginBottom: 50,
    },
  },
  loader: {
    marginTop: 14,
  },
  separateRoot: {
    padding: 0,
    background: 'transparent',
  },
  body: {
    '& td': {
      fontSize: 15,
      paddingTop: 18,
      paddingBottom: 18,
      maxWidth: 0,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& *:nth-child(2)': {
      marginRight: 35,
    },
    marginBottom: 23,
    [theme.breakpoints.down('sm')]: {
      padding: '10px 27px 0',
      marginBottom: 10,
    },
  },
  link: {
    marginLeft: 'auto',
    textTransform: 'uppercase',
    color: getColor('main')(theme),
    fontSize: 15,
    textDecoration: 'none',
  },
  list: {
    display: 'flex',
    width: '100%',
    overflowX: 'auto',
  },
  vertical: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  card: {
    padding: 17,
    background: '#505050',
    marginRight: 12,
    maxWidth: 326,
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
