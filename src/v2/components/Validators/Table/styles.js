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
    marginBottom: -1,
    borderBottom: `1px solid ${getColor('grey3')(theme)}`,
    [theme.breakpoints.down('sm')]: {
      padding: '10px 18px 0',
      marginBottom: 10,
      borderBottom: 'none',
    },
  },
  link: {
    marginLeft: 100,
    textTransform: 'uppercase',
    color: getColor('main')(theme),
    fontSize: 15,
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
    },
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
  tabNav: {
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    marginBottom: -1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  tabSelect: {
    display: 'none',
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: '0 18px',
    },
  },
  tabSelectRoot: {
    '& > div:focus': {
      backgroundColor: 'transparent',
    },
    '&::after': {
      display: 'none',
    },
    '&::before': {
      display: 'none',
    },
  },
  tabBtn: {
    fontSize: 16,
    fontFamily: 'Exo, sans-serif',
    color: getColor('grey3')(theme),
    border: `1px solid ${getColor('grey3')(theme)}`,
    height: 46,
    backgroundColor: 'transparent',
    marginRight: -1,
    padding: '0 14px',
    outline: 'none',
    cursor: 'pointer',
    '&:nth-child(2)': {
      marginRight: 25,
    },
  },
  activeTabBtn: {
    backgroundColor: getColor('main')(theme),
    color: getColor('grey2')(theme),
    borderColor: getColor('main')(theme),
    borderBottomColor: getColor('grey3')(theme),
  },
}));
