// @flow
import {map} from 'lodash/fp';
import React from 'react';
import {Grid} from '@material-ui/core';
import Label from 'v2/components/UI/Label';

import useStyles from './styles';

const ApplicationStatus = () => {
  const classes = useStyles();
  const specs = [
    {
      label: 'status',
      value: 'success',
    },
    {
      label: 'confirmations',
      value: '5',
    },
  ];
  const renderSpec = ({label, value}: {label: string, value: string}) => (
    <li key={label}>
      <Label text={label} hint="" />
      <div className={classes.value}>
        {typeof value === 'function' ? value() : value}
      </div>
    </li>
  );
  return (
    <Grid container>
      <Grid item sm={7}>
        <ul className={classes.spec}>{map(renderSpec)(specs)}</ul>
      </Grid>
      <Grid item sm={5}>
        <Label text="confidence" hint="" />
        <div className={classes.circle}>
          90%
          <div />
        </div>
      </Grid>
    </Grid>
  );
};

export default ApplicationStatus;
