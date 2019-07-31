// @flow
import {map} from 'lodash/fp';
import React from 'react';
import {observer} from 'mobx-react-lite';
import NodesStore from 'v2/stores/nodes';
import Card from 'v2/components/UI/StatCard';

import useStyles from './styles';

const Cards = () => {
  const classes = useStyles();
  const {cluster, validators} = NodesStore;

  const cards = [
    {
      title: 'Stage Duration Blocks',
      value: 'TODO',
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Days Left In Stage',
      value: 'TODO',
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Total SOL In Circulation',
      value: cluster.supply / Math.pow(2, 34).toFixed(2),
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Total Staked Tokens',
      value: 'TODO',
      changes: '',
      period: 'since yesterday',
    },
    {
      title: 'Current Network Inflation Rate',
      value: 'TODO',
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
      value: 'TODO',
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
