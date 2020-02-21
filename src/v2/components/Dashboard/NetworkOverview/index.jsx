// @flow

import {Grid, Container} from '@material-ui/core';
import React, {useEffect, useRef} from 'react';
import cn from 'classnames';
import OverviewStore from 'v2/stores/networkOverview';
import SectionHeader from 'v2/components/UI/SectionHeader';

import StatCards from './StatCards';
import TPS from './TPS';
import NodesMap from './NodesMap';
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
      <SectionHeader
        title={
          <div>
            Cluster Overview
          </div>
        }
      />
      <Grid container spacing={2} className={classes.row}>
        <Grid item xs={12} md={6} className={cn(classes.card, classes.tpsCard)}>
          <TPS />
        </Grid>
        <Grid item xs={12} md={6} className={cn(classes.card, classes.mapCard)}>
          <NodesMap />
        </Grid>
      </Grid>
      <StatCards />
    </Container>
  );
};

export default NetworkOverview;
