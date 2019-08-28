// @flow
import {map} from 'lodash/fp';
import React from 'react';
import {observer} from 'mobx-react-lite';
import NodesStore from 'v2/stores/nodes';
import Card from 'v2/components/UI/StatCard';

import Socket from '../../../stores/socket';
import Loader from '../../UI/Loader';
import useStyles from './styles';
import {LAMPORT_SOL_RATIO} from '../../../constants';

const Cards = ({
  stageDurationBlocks = null,
  blocksLeftInStage = null,
  daysLeftInStage = null,
}) => {
  const classes = useStyles();
  const {
    validators,
    inactiveValidators,
    supply,
    totalStaked,
    networkInflationRate,
  } = NodesStore;
  const {isLoading} = Socket;

  const cards = [
    {
      title: 'Stage Duration Blocks',
      value: stageDurationBlocks || '...',
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Blocks Left In Stage',
      value: blocksLeftInStage || '...',
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Days Left In Stage',
      value: daysLeftInStage || '...',
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Circulating SOL',
      value: (supply / Math.pow(2, 34)).toFixed(2),
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Staked SOL',
      value: (totalStaked * LAMPORT_SOL_RATIO).toFixed(8),
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Current Network Inflation Rate',
      value: (networkInflationRate * 100.0).toFixed(3) + '%',
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Active Validators',
      value: validators.length,
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Inactive Validators',
      value: inactiveValidators.length,
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Circulating Supply Staked',
      value: 'TODO',
      changes: '',
      period: 'since yesterday',
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
  }) =>
    isLoading ? (
      <Loader key={title} width="100%" height="138" y={-3} />
    ) : (
      <Card key={title} title={title} value={value} changes={changes} />
    );

  return <div className={classes.cards}>{map(renderStats)(cards)}</div>;
};

export default observer(Cards);
