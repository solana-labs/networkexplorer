// @flow
import React from 'react';
import {Paper, Tooltip, Typography} from '@material-ui/core';
import HelpLink from 'v2/components/HelpLink';

import useStyles from './styles';

type StatCardProps = {
  title?: string,
  value?: string | (() => React$Node),
  changes?: string | (() => React$Node),
  helpTerm?: string,
  helpText?: string,
};

const StatCard = (props: StatCardProps) => {
  const classes = useStyles();
  const {title, value, changes = null, helpTerm, helpText} = props;
  const renderValue = () => {
    if (!value && !(value === 0)) return;
    if (typeof value === 'function') {
      return value();
    }
    return (
      <Tooltip
        classes={{tooltip: classes.tooltip}}
        placement="top"
        title={value}
      >
        <Typography
          noWrap
          align="center"
          variant="h2"
          className={classes.value}
        >
          {value}
        </Typography>
      </Tooltip>
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
      <Typography
        className={classes.header}
        component="div"
        align="center"
        variant="body1"
      >
        <span>{title}</span>
        <HelpLink text={helpText} term={helpTerm} />
      </Typography>
      {renderValue()}
      <Typography align="center" variant="h2" className={classes.changes}>
        {renderChanges()}
      </Typography>
    </Paper>
  );
};

export default StatCard;
