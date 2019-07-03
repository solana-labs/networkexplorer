import {Grid, Typography} from '@material-ui/core';
import React from 'react';
import Logo from 'v2/components/UI/Logo';

import Social from '../Social';
import Newsletter from './Newsletter';
import Partnership from './Partnership';
import useStyles from './styles';
import bg from './assets/bg.svg';

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.bg} src={bg} alt="" />
      <Grid container>
        <Grid item className={classes.left} xs={5}>
          <Logo vertical />
          <Newsletter />
          <Typography className={classes.copyright}>
            © Copyright Solana Labs, Inc. All rights reserved.
          </Typography>
        </Grid>
        <Grid item className={classes.right} xs={5}>
          <Partnership />
        </Grid>
        <Grid item xs={1}>
          <Social />
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
