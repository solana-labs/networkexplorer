import React from 'react';
import Label from 'v2/components/UI/Label';
import _ from 'lodash';
import {observer} from 'mobx-react-lite';
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import ValidatorName from 'v2/components/UI/ValidatorName';

const ApplicationDetails = ({programAccounts}: {programAccounts: Object}) => {
  const renderAccount = (account, i) => {
    return (
      <TableRow key={account.pubkey}>
        <TableCell>
          <Label text={`Account ${i + 1}`} hint="" />
        </TableCell>
        <TableCell>
          <ValidatorName
            pubkey={account.pubkey}
            name={account.pubkey}
            avatar=""
          />
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
