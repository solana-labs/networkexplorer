// @flow
import React from 'react';
import _ from 'lodash';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
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
  const renderAccount = (account, i) => (
    <div className={classes.account}>
      <Label text={`Account ${i + 1}`} hint="" />
      <Link to={`/account/${id}`} className={classes.accountLink}>
        <Avatar avatarUrl="" name="" width={33} height={33} pubkey={id} />
        <div className={classes.address}>{account}</div>
      </Link>
    </div>
  );
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item md={5}>
          <Label text="Application id" hint="" />
          <div className={classes.id}>
            <div className={classes.address}>{id}</div>
            TODO:
            <TypeLabel type="other" label="other" />
            <TypeLabel type="consensus" label="consensus" />
          </div>
        </Grid>
        <Grid item md={7}>
          {_.map(accounts, renderAccount)}
        </Grid>
      </Grid>
    </div>
  );
};

export default Application;
