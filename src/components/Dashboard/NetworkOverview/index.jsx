// @flow

import {Typography, Container} from '@material-ui/core';
import React, { useEffect } from 'react';
import OverviewStore from 'stores/networkOverview';
import StatCards from './StatCards';
import useStyles from './styles';
import decor from 'assets/img/decorate.png';

const NetworkOverview = () => {
  const { getStats } = OverviewStore;
  const classes = useStyles();
  useEffect(() => {
    getStats();
  }, [getStats]);
  return (
    <Container>
      <div className={classes.root}>
        <img className={classes.decor} src={decor} width={99} alt="" />
        <Typography className={classes.title} variant="h3">Network overview</Typography>
        <StatCards/>
      </div>
    </Container>
  );
};

export default NetworkOverview;
