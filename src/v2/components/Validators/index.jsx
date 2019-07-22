// @flow
import {Container, Grid} from '@material-ui/core';
import React, {useEffect} from 'react';
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
  const {cluster, validators, fetchClusterInfo, totalBondedTokens} = NodesStore;
  useEffect(() => {
    fetchClusterInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cards = [
    {
      title: 'Total Circulating SOL',
      value: cluster.supply / Math.pow(2, 34).toFixed(2),
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Total Bonded Tokens',
      value: totalBondedTokens,
      changes: '',
      period: 'since yesterday',
    },
    {
      title: '# Active Validators',
      value: validators.length,
      changes: '',
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
            {changes && <div>{changes}%</div>}
            <div className={classes.period}>{period}</div>
          </div>
        )}
      />
    </div>
  );

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title="Validators Overview">
          <div className={classes.becomeBtn}>
            <Button
              href="https://solana.com/network/"
              variant="contained"
              color="primary"
            >
              Become a validator
            </Button>
          </div>
        </SectionHeader>
        <Grid spacing={2} container>
          <Grid item xs={12} md={9} zeroMinWidth>
            <ValidatorsMap />
          </Grid>
          <Grid item xs={12} md={3} zeroMinWidth>
            <div className={classes.stats}>{map(renderStats)(cards)}</div>
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
