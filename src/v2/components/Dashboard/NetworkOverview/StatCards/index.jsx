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
      helpTerm: 'fullnode',
      helpText:
        'Number of fullnodes currently active and participating in the network.',
    },
    {
      title: 'Block Height',
      value: globalStats['!blkLastSlot'],
      helpTerm: 'block-height',
      helpText:
        'The number of blocks beneath the current block. The first block after the genesis block has height zero. This is the number of blocks the network has currently produced.',
    },
    {
      title: 'Transactions Count',
      value: globalStats['!txnCount'],
      helpTerm: '',
      helpText:
        'The total number of transactions processed by the network and added to the ledger.',
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
      helpTerm: 'leader',
      helpText:
        'The fullnode that currently has the role of appending entries to the ledger',
    },
  ];

  const renderStats = ({
    title,
    changes = null,
    ...props
  }: {
    title: string,
    value: string | (() => React$Node),
    changes?: string,
    helpText: string,
    helpTerm: string,
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
        <Card title={title} changes={changes} {...props} />
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
