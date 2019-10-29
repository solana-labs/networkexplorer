// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'v2/components/UI/Avatar';

import useStyles from './styles';

const ValidatorName = ({
  pubkey,
  name,
  avatar,
  to,
}: {
  pubkey: string,
  name: string,
  avatar: string,
  to?: string,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Link to={to || `/validators/${pubkey}`} className={classes.root}>
        <Avatar pubkey={pubkey} avatarUrl={avatar} />
        <div>{name || pubkey}</div>
      </Link>
    </div>
  );
};

export default ValidatorName;
