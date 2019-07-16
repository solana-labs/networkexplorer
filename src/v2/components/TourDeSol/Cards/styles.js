import {makeStyles} from '@material-ui/core';

export default makeStyles({
  cards: {
    '& div:not(:last-child)': {
      marginBottom: 20,
    },
  },
});
