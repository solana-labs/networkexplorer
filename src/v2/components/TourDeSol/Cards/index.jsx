// @flow
import {map} from 'lodash/fp';
import React from 'react';
import {observer} from 'mobx-react-lite';
import NodesStore from 'v2/stores/nodes';
import Card from 'v2/components/UI/StatCard';

import useStyles from './styles';

const Cards = ({
  stageDurationBlocks = null,
  blocksLeftInStage = null,
  daysLeftInStage = null,
}) => {
  const classes = useStyles();
  const {
    network,
    validators,
    inactiveValidators,
    supply,
    totalStaked,
    networkInflationRate,
  } = NodesStore;

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
      title: 'Total SOL In Circulation',
      value: (supply / Math.pow(2, 34)).toFixed(2),
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Total Staked SOL',
      value: totalStaked,
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
      title: '# of Active Validators',
      value: validators.length,
      changes: '',
      period: 'since yesterday',
    },
    {
      title: '# of Inactive Validators',
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
  }) => <Card key={title} title={title} value={value} changes={changes} />;

  return <div className={classes.cards}>{map(renderStats)(cards)}</div>;
};

export default observer(Cards);
