// @flow
import {Typography} from '@material-ui/core';
import React from 'react';

import decor from './assets/decorate.png';
import useStyles from './styles';

const SectionHeader = ({children}: {children: React$Node}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.decor} src={decor} width={99} alt="" />
      <Typography className={classes.title} variant="h3">
        {children}
      </Typography>
    </div>
  );
};

export default SectionHeader;
