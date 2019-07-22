import {InputBase, Typography} from '@material-ui/core';
import React from 'react';
import Mixpanel from 'v2/mixpanel';

import useStyles from './styles';

const Newsletter = () => {
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    Mixpanel.track('Clicked Partner with us');
  };

  return (
    <div>
      <Typography className={classes.title} variant="h5">
        Join the Newsletter
      </Typography>
      <Typography className={classes.desc}>
        Stay up to date with the latest Solana news.
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
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
