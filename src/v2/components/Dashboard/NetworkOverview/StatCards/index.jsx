// @flow

import React from 'react';
import {observer} from 'mobx-react-lite';
import {map} from 'lodash/fp';
import {Grid, Typography} from '@material-ui/core';
import Card from 'v2/components/UI/StatCard';
import OverviewStore from 'v2/stores/networkOverview';
import NodesStore from 'v2/stores/nodes';

import useStyles from './styles';

const StatCards = () => {
  const {globalStats, statsChanges} = OverviewStore;
  const {cluster, clusterChanges} = NodesStore;
  const classes = useStyles();

  const cards = [
    {
      title: 'Node Count',
      value: cluster.nodes.length,
      changes: clusterChanges.nodes,
    },
    {
      title: 'Block Height',
      value: globalStats['!blkLastSlot'],
      changes: statsChanges['!blkLastSlot'],
    },
    {
      title: 'Transactions Count',
      value: globalStats['!txnCount'],
      changes: statsChanges['!txnCount'],
    },
    {
      title: 'Current Leader',
      value() {
        return (
          <Typography
            noWrap
            align="center"
            variant="h2"
            className={classes.leader}
          >
            {globalStats['!entLastLeader']}
          </Typography>
        );
      },
    },
  ];

  const renderStats = ({
    title,
    value,
    changes = null,
  }: {
    title: string,
    value: string | (() => React$Node),
    changes?: string,
  }) => (
    <Grid key={title} item xs={3} zeroMinWidth>
      <Card title={title} value={value} changes={changes} />
    </Grid>
  );

  return (
    <Grid container spacing={2} alignItems="stretch">
      {map(renderStats)(cards)}
    </Grid>
  );
};

export default observer(StatCards);
