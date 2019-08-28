import {makeStyles} from '@material-ui/core';

export default makeStyles({
  cards: {
    '& > *:not(:last-child)': {
      marginBottom: 20,
    },
    '& svg': {
      height: '138px',
      width: '100%',
      '&:not(:last-child)': {
        marginBottom: 14,
      },
    },
  },
});
