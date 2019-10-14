import {makeStyles} from '@material-ui/core';

export default makeStyles(() => ({
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
  root: {
    '& td': {
      maxWidth: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '& > *': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
      },
    },
  },
}));
