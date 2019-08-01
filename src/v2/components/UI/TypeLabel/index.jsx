// @flow
import React from 'react';
import cn from 'classnames';

import useStyles from './styles';

type Type = 'other' | 'consensus' | 'system' | 'loader';

const TypeLabel = ({type, label}: {type: Type, label: string}) => {
  const classes = useStyles();
  return (
    <div className={cn(classes.root, classes[type])}>
      <span className={classes.text}>{label}</span>
    </div>
  );
};

export default TypeLabel;
