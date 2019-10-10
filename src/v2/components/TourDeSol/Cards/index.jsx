// @flow
import {map} from 'lodash/fp';
import React from 'react';
import {observer} from 'mobx-react-lite';
import Card from 'v2/components/UI/StatCard';

import Loader from '../../UI/Loader';
import useStyles from './styles';

const Cards = ({
  isLoading,
  clusterStats,
}: {
  isLoading: Boolean,
  clusterStats: Object,
}) => {
  const classes = useStyles();
  const {
    stageDurationBlocks,
    slotsLeftInStage,
    daysLeftInStage,
    activeValidators,
    inactiveValidators,
    totalSupply,
    totalStaked,
    networkInflationRate,
  } = clusterStats;

  const cards = [
    {
      title: 'Stage Duration Blocks',
      value: stageDurationBlocks || '...',
      changes: '',
      period: 'since yesterday',
      helpText: 'The length of a current stage in blocks.',
      helpTerm: '',
    },
    {
      title: 'Blocks Left In Stage',
      value: slotsLeftInStage || '...',
      changes: '',
      period: 'since yesterday',
      helpText:
        'The number of blocks remaining before the conclusion of the current stage.',
      helpTerm: '',
    },
    {
      title: 'Days Left In Stage',
      value: daysLeftInStage || '...',
      changes: '',
      period: 'since yesterday',
      helpText: 'Approximate number of days remaining in the stage.',
      helpTerm: '',
    },
    {
      title: 'Circulating SOL',
      value: totalSupply && totalSupply.toFixed(2),
      changes: '',
      period: 'since yesterday',
      helpText: 'The total number of SOL in existence.',
      helpTerm: '',
    },
    {
      title: 'Staked SOL',
      value: totalStaked && totalStaked.toFixed(8),
      changes: '',
      period: 'since yesterday',
      helpText: 'Amount of SOL staked to validators and activated',
      helpTerm: '',
    },
    {
      title: 'Current Network Inflation Rate',
      value:
        networkInflationRate && (networkInflationRate * 100.0).toFixed(3) + '%',
      changes: '',
      period: 'since yesterday',
      helpText: "The network's current annual SOL inflation rate.",
      helpTerm: '',
    },
    {
      title: 'Active Validators',
      value: activeValidators,
      changes: '',
      period: 'since yesterday',
      helpText:
        'The number of validators that are online and actively participating in the network.',
      helpTerm: '',
    },
    {
      title: 'Inactive Validators',
      value: inactiveValidators,
      changes: '',
      period: 'since yesterday',
      helpText:
        'The number of validators not online and/or actively participating in network.',
      helpTerm: '',
    },
    {
      title: 'Circulating Supply Staked',
      value: 'TODO',
      changes: '',
      period: 'since yesterday',
      helpText:
        'The % of SOL staked, as a % of overall circulating SOL. This is a measurement of network participation.',
      helpTerm: '',
    },
  ];

  const renderStats = ({
    title,
    ...props
  }: {
    title: string,
    value: string | (() => React$Node),
    changes?: string,
  }) =>
    isLoading ? (
      <Loader key={title} width="100%" height="138" y={-3} />
    ) : (
      <Card key={title} title={title} {...props} />
    );

  return <div className={classes.cards}>{map(renderStats)(cards)}</div>;
};

export default observer(Cards);
