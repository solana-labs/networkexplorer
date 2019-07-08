import {makeStyles} from '@material-ui/core';
import getColor from 'v2/utils/getColor';

export default makeStyles(theme => ({
  root: {
    marginTop: 19,
    background: getColor('grey2')(theme),
    padding: '25px 44px',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      paddingBottom: 27,
    },
  },
  head: {
    border: '1px solid #979797',
    '& th': {
      textTransform: 'uppercase',
      fontSize: 15,
      letterSpacing: 2,
      fontWeight: 'bold',
      borderBottom: 'none',
    },
  },
  body: {
    '& td': {
      fontSize: 15,
      paddingTop: 18,
      paddingBottom: 18,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    '& *:first-child': {
      marginRight: 35,
    },
    marginBottom: 23,
    [theme.breakpoints.down('md')]: {
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
  name: {
    display: 'flex',
    alignItems: 'center',
    color: getColor('main')(theme),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '& span': {
      width: 33,
      height: 33,
      flexShrink: 0,
      background: getColor('main')(theme),
      borderRadius: '50%',
      marginRight: 22,
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: 22,
    },
  },
  list: {
    display: 'flex',
    width: '100%',
    overflowX: 'auto',
  },
  card: {
    padding: 17,
    background: '#505050',
    marginRight: 12,
    maxWidth: 326,
  },
  cardTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#C4C4C4',
    letterSpacing: 2,
    fontWight: 'bold',
  },
}));
