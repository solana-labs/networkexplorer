// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {map, size} from 'lodash/fp';
import {Grid, Typography} from '@material-ui/core';
import Card from 'v2/components/UI/StatCard';
import Loader from 'v2/components/UI/Loader';
import OverviewStore from 'v2/stores/networkOverview';
import NodesStore from 'v2/stores/nodes';
import Socket from 'v2/stores/socket';

import useStyles from './styles';

const StatCards = () => {
  const {globalStats} = OverviewStore;
  const {network} = NodesStore;
  const {isLoading} = Socket;
  const classes = useStyles();

  const cards = [
    {
      title: 'Node Count',
      value: size(network),
    },
    {
      title: 'Block Height',
      value: globalStats['!blkLastSlot'],
    },
    {
      title: 'Transactions Count',
      value: globalStats['!txnCount'],
    },
    {
      title: 'Current Leader',
      value() {
        return (
          <Link
            className={classes.leader}
            to={`/validators/${globalStats['!entLastLeader']}`}
          >
            <Typography noWrap align="center" variant="h2">
              {globalStats['!entLastLeader']}
            </Typography>
          </Link>
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
    <Grid
      key={title}
      item
      xs={12}
      sm={6}
      lg={3}
      zeroMinWidth
      className={classes.card}
    >
      {isLoading ? (
        <Loader width="533" height="290" />
      ) : (
        <Card title={title} value={value} changes={changes} />
      )}
    </Grid>
  );

  return (
    <Grid container spacing={2} alignItems="stretch">
      {map(renderStats)(cards)}
    </Grid>
  );
};

export default observer(StatCards);
