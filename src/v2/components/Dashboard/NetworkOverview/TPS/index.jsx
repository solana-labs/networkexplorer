// @flow

import {Typography} from '@material-ui/core';
import {maxBy, minBy, get} from 'lodash/fp';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {ResponsiveLine} from '@nivo/line';
import OverviewStore from 'v2/stores/networkOverview';

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
      <div className={classes.tooltipTitle}>AVG TPS:{data.y}</div>
      <div className={classes.tooltipDate}>{data.date}</div>
    </div>
  );
};

const TPS = () => {
  const classes = useStyles();
  const {txnChartData, globalStats, statsChanges} = OverviewStore;
  const data = [
    {
      id: 'txn',
      data: txnChartData,
    },
  ];

  const min = get('y')(minBy('y')(txnChartData));
  const max = get('y')(maxBy('y')(txnChartData));

  const lineProperties = {
    animate: true,
    useMesh: true,
    layers: ['lines', 'mesh'],
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

  return (
    <div className={classes.card}>
      <Typography>Current TPS</Typography>
      <div className={classes.values}>
        <Typography className={classes.val} variant="h2">
          {globalStats.tpsCount || 0}
        </Typography>
        {statsChanges && (
          <Typography align="right" variant="h2" className={classes.changes}>
            {statsChanges.tpsCount}%
          </Typography>
        )}
      </div>
      <div className={classes.graph}>
        {Boolean(txnChartData.length) && (
          <ResponsiveLine {...lineProperties} tooltip={Tooltip} />
        )}
      </div>
    </div>
  );
};

export default observer(TPS);
