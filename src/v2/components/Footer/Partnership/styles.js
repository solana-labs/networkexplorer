import {makeStyles} from '@material-ui/core';

export default makeStyles({
  title: {
    marginBottom: 15,
  },
  desc: {
    fontSize: 15,
    lineHeight: '24px',
    marginBottom: 23,
  },
  links: {
    marginTop: 43,
    '& a': {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: 11,
      letterSpacing: 3.2,
      color: '#fff',
      marginBottom: 21,
      width: 250,
      justifyContent: 'space-between',
      '& img': {
        marginLeft: 10,
      },
    },
  },
});
