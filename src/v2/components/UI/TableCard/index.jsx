import React from 'react';
import cn from 'classnames';
import {map} from 'lodash/fp';

import useStyles from './styles';

const TableCard = ({data, vertical = false}) => {
  const classes = useStyles();
  const renderItem = ({label, value}) => (
    <li key={label}>
      <div className={classes.cardTitle}>{label}</div>
      <div>{value}</div>
    </li>
  );
  return (
    <div className={cn(classes.card, vertical && classes.vertical)}>
      <ul>{map(renderItem)(data)}</ul>
    </div>
  );
};

export default TableCard;
