import React from 'react';
import Avatar from 'v2/components/UI/Avatar';
import Label from 'v2/components/UI/Label';
import _ from 'lodash';
// import useStyles from './styles';
import {observer} from 'mobx-react-lite';
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core';

const ApplicationDetails = ({programAccounts}: {programAccounts: Object}) => {
  // const classes = useStyles();

  const renderAccount = (account, i) => {
    return (
      <TableRow key={account.pubkey}>
        <TableCell>
          <Label text={`Account ${i + 1}`} hint="" />
        </TableCell>
        <TableCell>
          <Avatar
            avatarUrl=""
            name=""
            width={33}
            height={33}
            pubkey={account.pubkey}
          />
          <span>{account.pubkey}</span>
        </TableCell>
        <TableCell>Balance: {account.lamports}</TableCell>
      </TableRow>
    );
  };

  return (
    <Table>
      <TableBody>{_.map(programAccounts, renderAccount)}</TableBody>
    </Table>
  );
};

export default observer(ApplicationDetails);
