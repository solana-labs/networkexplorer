// @flow
import {Container, Grid} from '@material-ui/core';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {map} from 'lodash/fp';
import Card from 'v2/components/UI/StatCard';
import SectionHeader from 'v2/components/UI/SectionHeader';
import NodesStore from 'v2/stores/nodes';
import Mixpanel from 'v2/mixpanel';
import Button from 'v2/components/UI/Button';
import Socket from 'v2/stores/socket';
import Loader from 'v2/components/UI/Loader';

import ValidatorsMap from './ValidatorsMap';
import ValidatorsTable from './Table';
import useStyles from './styles';
import {LAMPORT_SOL_RATIO} from '../../constants';

const Validators = () => {
  const classes = useStyles();
  const {supply, validators, fetchClusterInfo, totalStaked} = NodesStore;
  const {isLoading} = Socket;
  useEffect(() => {
    fetchClusterInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cards = [
    {
      title: 'Circulating SOL',
      value: (supply / Math.pow(2, 34)).toFixed(2),
      changes: '',
      period: 'since yesterday',
      helpText: 'The total number of SOL in existence.',
      helpTerm: '',
    },
    {
      title: 'Staked SOL',
      value: (totalStaked * LAMPORT_SOL_RATIO).toFixed(8),
      changes: '',
      period: 'since yesterday',
      helpText: 'The total number of SOL staked to validators and activated.',
      helpTerm: '',
    },
    {
      title: 'Active Validators',
      value: validators.length,
      changes: '',
      period: 'since yesterday',
      helpText:
        'The number of validators that are online and actively participating in the network.',
      helpTerm: '',
    },
  ];

  const renderStats = ({
    title,
    changes = null,
    period,
    ...props
  }: {
    title: string,
    value: string | (() => React$Node),
    changes: () => React$Node,
    period: string,
    helpText: string,
    helpTerm: string,
  }) => (
    <div key={title} className={classes.card}>
      {isLoading ? (
        <Loader width="100%" height="150" y={-3} />
      ) : (
        <Card
          key={title}
          zeroMinWidth
          title={title}
          changes={() => (
            <div className={classes.changes}>
              {changes && <div>{changes}%</div>}
              <div className={classes.period}>{period}</div>
            </div>
          )}
          {...props}
        />
      )}
    </div>
  );

  const handleValidator = () => Mixpanel.track('Clicked Become a Validator');

  return (
    <Container>
      <SectionHeader title="Validators Overview">
        <div className={classes.becomeBtn}>
          <Button
            onClick={handleValidator}
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
          {isLoading ? (
            <div className={classes.loader}>
              <Loader width="100%" height="480" y={-10} />
            </div>
          ) : (
            <ValidatorsMap />
          )}
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
    </Container>
  );
};

export default observer(Validators);
