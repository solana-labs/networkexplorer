// @flow

import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Paper, Typography } from '@material-ui/core';
import OverviewStore from 'v2/stores/networkOverview';

import useStyles from './styles';

const StatCards = () => {
  const { globalStats } = OverviewStore;
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={3} zeroMinWidth>
        <Paper className={classes.card}>
          <Typography align="center" variant="body1">
            Node Count
          </Typography>
          <Typography noWrap align="center" variant="h2" className={classes.val}>
            {globalStats['!blkLastSlot']}
          </Typography>{' '}
          <Typography align="center" variant="h2" className={classes.changes}>
            -2.45%
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3} zeroMinWidth>
        <Paper className={classes.card}>
          <Typography align="center" variant="body1">
            Block Height
          </Typography>
          <Typography noWrap align="center" variant="h2" className={classes.val}>
            {globalStats['!blkLastSlot']}
          </Typography>
          <Typography align="center" variant="h2" className={classes.changes}>
            -2.45%
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3} zeroMinWidth>
        <Paper className={classes.card}>
          <Typography align="center" variant="body1">
            Transactions Count
          </Typography>
          <Typography noWrap align="center" variant="h2" className={classes.val}>
            {globalStats['!txnCount']}
          </Typography>
          <Typography align="center" variant="h2" className={classes.changes}>
            -2.45%
          </Typography>
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
