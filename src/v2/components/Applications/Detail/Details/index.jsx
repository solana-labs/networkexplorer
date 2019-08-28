import React from 'react';
import Avatar from 'v2/components/UI/Avatar';
import Label from 'v2/components/UI/Label';

import useStyles from './styles';

const ApplicationDetails = () => {
  const classes = useStyles();
  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <Label text="to" hint="" />
        <div>
          <Avatar avatarUrl="" name="" width={33} height={33} pubkey="123" />
          <span>0xAA15A3E6b97d09653b8b8d9c9e1D80daf5ba81e8</span>
        </div>
      </li>
      <li className={classes.item}>
        <Label text="from" hint="" />
        <div>
          <Avatar avatarUrl="" name="" width={33} height={33} pubkey="123" />
          <span>0xAA15A3E6b97d09653b8b8d9c9e1D80daf5ba81e8</span>
        </div>
      </li>
    </ul>
  );
};

export default ApplicationDetails;
