import {InputBase, Typography} from '@material-ui/core';
import React from 'react';

import useStyles from './styles';

const Newsletter = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.title} variant="h5">
        Join the Newsletter
      </Typography>
      <Typography className={classes.desc}>
        Stay up to date with the latest Solana news.
      </Typography>
      <form className={classes.form}>
        <InputBase
          className={classes.input}
          placeholder="Email Address"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
        <button className={classes.btn}>Submit</button>
      </form>
    </div>
  );
};

export default Newsletter;
