// @flow

import React from 'react';
import {observer} from 'mobx-react-lite';
import {Grid, Paper, Typography} from '@material-ui/core';
import OverviewStore from 'v2/stores/networkOverview';

import useStyles from './styles';

const StatCards = () => {
  const {globalStats, statsChanges, nodesChanges, cluster} = OverviewStore;
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={3} zeroMinWidth>
        <Paper className={classes.card}>
          <Typography align="center" variant="body1">
            Node Count
          </Typography>
          <Typography
            noWrap
            align="center"
            variant="h2"
            className={classes.val}
          >
            {cluster.nodes.length}
          </Typography>
          {nodesChanges && (
            <Typography align="center" variant="h2" className={classes.changes}>
              {nodesChanges}%
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={3} zeroMinWidth>
        <Paper className={classes.card}>
          <Typography align="center" variant="body1">
            Block Height
          </Typography>
          <Typography
            noWrap
            align="center"
            variant="h2"
            className={classes.val}
          >
            {globalStats['!blkLastSlot']}
          </Typography>
          {statsChanges && (
            <Typography align="center" variant="h2" className={classes.changes}>
              {statsChanges['!blkLastSlot']}%
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={3} zeroMinWidth>
        <Paper className={classes.card}>
          <Typography align="center" variant="body1">
            Transactions Count
          </Typography>
          <Typography
            noWrap
            align="center"
            variant="h2"
            className={classes.val}
          >
            {globalStats['!txnCount']}
          </Typography>
          {statsChanges && (
            <Typography align="center" variant="h2" className={classes.changes}>
              {statsChanges['!txnCount']}%
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={3} zeroMinWidth>
        <Paper className={classes.card}>
          <Typography align="center" variant="body1">
            Current Leader
          </Typography>
          <Typography
            noWrap
            align="center"
            variant="h2"
            className={classes.leader}
          >
            {globalStats['!entLastLeader']}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(StatCards);
