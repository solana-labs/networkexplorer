// @flow
import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import HelpLink from 'v2/components/HelpLink';

import useStyles from './styles';

type StatCardProps = {
  title?: string,
  value?: string | (() => React$Node),
  changes?: string | (() => React$Node),
};

const StatCard = (props: StatCardProps) => {
  const classes = useStyles();
  const {title, value, changes} = props;
  const renderValue = () => {
    if (!value) return;
    if (typeof value === 'function') {
      return value();
    }
    return (
      <Typography noWrap align="center" variant="h2" className={classes.value}>
        {value}
      </Typography>
    );
  };
  const renderChanges = () => {
    if (!changes) return null;
    if (typeof changes === 'function') {
      return changes();
    }
    return <span>{changes}%</span>;
  };
  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="body1">
        {title}
        <HelpLink text="" term="" />
      </Typography>
      {renderValue()}
      <Typography align="center" variant="h2" className={classes.changes}>
        {renderChanges()}
      </Typography>
    </Paper>
  );
};

export default StatCard;
