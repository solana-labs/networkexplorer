// @flow
import {get, maxBy, minBy, map} from 'lodash/fp';
import React, {useState} from 'react';
import cn from 'classnames';
import {ResponsiveLine} from '@nivo/line';
import OverviewStore from 'v2/stores/networkOverview';

import HelpLink from 'v2/components/HelpLink';
import useStyles from './styles';

type Point = {
  data: {
    x: string,
    y: number,
    date: string,
  },
};

const Tooltip = ({point: {data}}: {point: Point}) => {
  const classes = useStyles();
  if (!data) return null;
  return (
    <div className={classes.tooltip}>
      <div className={classes.tooltipDot} />
      <div className={classes.tooltipTitle}>AVG TPS:{data.y}</div>
      <div className={classes.tooltipDate}>{data.date}</div>
    </div>
  );
};

const Chart = props => {
  const [range, setRange] = useState('24h');
  const classes = useStyles();
  const {txnChartData} = OverviewStore;
  const data = [
    {
      id: 'txn',
      data: txnChartData,
    },
  ];

  const min = get('y')(minBy('y')(txnChartData));
  const max = get('y')(maxBy('y')(txnChartData));

  const rangeBtns = ['24h', '1m', '6m', '1y', 'all'];

  const lineProperties = {
    animate: true,
    useMesh: true,
    layers: ['lines', 'mesh'],
    enableSlices: false,
    yScale: {
      type: 'linear',
      stacked: false,
      min,
      max,
    },
    xScale: {
      type: 'time',
      format: '%Y%m%dT%H:%M',
      precision: 'minute',
    },
    colors: ['#00FFAD'],
    curve: 'monotoneX',
    data,
  };

  const switchRange = val => () => setRange(val);

  const renderRangeBtn = val => (
    <button
      className={cn(classes.rangeBtn, {[classes.rangeActive]: val === range})}
      onClick={switchRange(val)}
    >
      {val}
    </button>
  );

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes.title}>
          Balance <HelpLink text="" term="" />
        </div>
        <div>{map(renderRangeBtn)(rangeBtns)}</div>
      </div>
      <div className={classes.graph}>
        <ResponsiveLine {...lineProperties} tooltip={Tooltip} />
      </div>
    </div>
  );
};

export default Chart;
