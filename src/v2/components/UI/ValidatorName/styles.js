import {makeStyles} from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      '&:first-child': {
        marginRight: 15,
      },
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 22,
    },
  },
}));
