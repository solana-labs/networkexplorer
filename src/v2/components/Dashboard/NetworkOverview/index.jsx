// @flow

import {Typography, Container} from '@material-ui/core';
import React, {useEffect, useRef} from 'react';
import OverviewStore from 'v2/stores/networkOverview';
import decor from 'v2/assets/img/decorate.png';

import StatCards from './StatCards';
import useStyles from './styles';

const NetworkOverview = () => {
  const {getStats, getTxnStats} = OverviewStore;
  const classes = useStyles();
  const timeout = useRef<TimeoutID | null>(null);

  const pollStats = () => {
    timeout.current = setTimeout(() => {
      try {
        getTxnStats();
      } finally {
        pollStats();
      }
    }, 5000);
  };

  useEffect(() => {
    getStats();
    getTxnStats();
    pollStats();
    return () => {
      clearTimeout(timeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className={classes.root}>
        <img className={classes.decor} src={decor} width={99} alt="" />
        <Typography className={classes.title} variant="h3">
          Network overview
        </Typography>
        <StatCards />
      </div>
    </Container>
  );
};

export default NetworkOverview;
