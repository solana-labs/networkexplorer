// @flow
import React from 'react';
import {map} from 'lodash/fp';
import {Grid} from '@material-ui/core';
import Label from 'v2/components/UI/Label';
import Avatar from 'v2/components/UI/Avatar';
import TypeLabel from 'v2/components/UI/TypeLabel';

import useStyles from './styles';

type TApplication = {
  id: string,
  accounts: string[],
};

const Application = ({id, accounts}: TApplication) => {
  const classes = useStyles();
  const renderAccount = account => (
    <div className={classes.account}>
      <Label text="account 1" hint="" />
      <Avatar
        avatarUrl=""
        name=""
        width={33}
        height={33}
        pubkey="0xAA15A3E6b97d09653b8b8d9c9e1D80daf5ba81e8"
      />
      <div className={classes.address}>
        0xAA15A3E6b97d09653b8b8d9c9e1D80daf5ba81e8
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={5}>
          <Label text="Application id" hint="" />
          <div className={classes.id}>
            <div className={classes.address}>{id}</div>
            <TypeLabel type="other" label="other" />
            <TypeLabel type="consensus" label="consensus" />
          </div>
        </Grid>
        <Grid item sm={7}>
          {map(renderAccount)(accounts)}
          {renderAccount()}
        </Grid>
      </Grid>
    </div>
  );
};

export default Application;
