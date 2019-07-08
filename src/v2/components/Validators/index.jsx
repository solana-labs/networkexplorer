// @flow
import {Container, Grid} from '@material-ui/core';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {map} from 'lodash/fp';
import Card from 'v2/components/UI/StatCard';
import SectionHeader from 'v2/components/UI/SectionHeader';
import NodesStore from 'v2/stores/nodes';

import Button from '../UI/Button';
import ValidatorsMap from './ValidatorsMap';
import ValidatorsTable from './Table';
import useStyles from './styles';

const Validators = () => {
  const classes = useStyles();
  const {cluster, clusterChanges} = NodesStore;
  const cards = [
    {
      title: 'Total Circulating SOL',
      value: cluster.supply / Math.pow(2, 34).toFixed(2),
      changes: clusterChanges.supply,
      period: 'since yesterday',
    },
    {
      title: 'Total Bonded Tokens',
      value: '100,000',
      changes: '-2.45',
      period: 'since yesterday',
    },
    {
      title: '# Active Validators',
      value: cluster.nodes.length,
      changes: clusterChanges.nodes,
      period: 'since yesterday',
    },
  ];

  const renderStats = ({
    title,
    value,
    changes = null,
    period,
  }: {
    title: string,
    value: string | (() => React$Node),
    changes: () => React$Node,
    period: string,
  }) => (
    <div key={title} className={classes.card}>
      <Card
        key={title}
        zeroMinWidth
        title={title}
        value={value}
        changes={() => (
          <div className={classes.changes}>
            <div>{changes}%</div>
            <div className={classes.period}>{period}</div>
          </div>
        )}
      />
    </div>
  );

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader>
          Validators Overview
          <div className={classes.becomeBtn}>
            <Button variant="contained" color="primary">
              Become a validator
            </Button>
          </div>
        </SectionHeader>
        <Grid spacing={2} container alignItems="flex-start">
          <Grid item xs={12} md={9} zeroMinWidth>
            <ValidatorsMap />
          </Grid>
          <Grid item xs={12} md={3} zeroMinWidth>
            {map(renderStats)(cards)}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} zeroMinWidth>
            <ValidatorsTable />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default observer(Validators);
