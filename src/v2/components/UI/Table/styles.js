import {makeStyles} from '@material-ui/core';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    '& .MuiTableCell-root.MuiTableCell-body': {
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
