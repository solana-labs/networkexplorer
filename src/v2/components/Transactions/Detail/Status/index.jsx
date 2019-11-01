// @flow
import {map} from 'lodash/fp';
import React from 'react';
import {Grid} from '@material-ui/core';
import Label from 'v2/components/UI/Label';
import InfoRow from 'v2/components/InfoRow';

import useStyles from './styles';

const ProgramStatus = ({transaction}) => {
  const classes = useStyles();
  const specs = [
    {
      label: 'status',
      value: 'success',
    },
    {
      label: 'confirmations',
      value: 'TODO',
    },
  ];
  const renderSpec = info => <InfoRow key={info.label} {...info} />;
  return (
    <Grid container>
      <Grid item sm={7}>
        <div className={classes.spec}>{map(renderSpec)(specs)}</div>
      </Grid>
      <Grid item sm={5}>
        <Label text="confidence" hint="" />
        <div className={classes.circle}>
          TODO 90%
          <div />
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgramStatus;
