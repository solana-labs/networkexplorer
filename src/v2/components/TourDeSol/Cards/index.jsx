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
    activeValidators,
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
      helpText: 'The length of a current stage in blocks.',
      helpTerm: '',
    },
    {
      title: 'Blocks Left In Stage',
      value: blocksLeftInStage || '...',
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
      helpText: 'Amount of SOL staked to validators and activated',
      helpTerm: '',
    },
    {
      title: 'Current Network Inflation Rate',
      value: (networkInflationRate * 100.0).toFixed(3) + '%',
      changes: '',
      period: 'since yesterday',
      helpText: "The network's current annual SOL inflation rate.",
      helpTerm: '',
    },
    {
      title: 'Active Validators',
      value: activeValidators.length,
      changes: '',
      period: 'since yesterday',
      helpText:
        'The number of validators that are online and actively participating in the network.',
      helpTerm: '',
    },
    {
      title: 'Inactive Validators',
      value: inactiveValidators.length,
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
