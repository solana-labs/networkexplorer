// @flow
import React from 'react';
import {observer} from 'mobx-react-lite';
import {TableCell, TableRow} from '@material-ui/core';
import Table from 'v2/components/UI/Table';
import TypeLabel from 'v2/components/UI/TypeLabel';

import useStyles from './styles';

const fields = [
  {
    id: 'hash',
    label: 'Hash',
    text: '',
    term: '',
  },
  {
    id: 'block',
    label: 'Block',
    text: '',
    term: '',
  },
  {
    id: 'time',
    label: 'Time',
    text: '',
    term: '',
  },
  {
    id: 'application_id',
    label: 'Application Id',
    text: '',
    term: '',
  },
  {
    id: 'type',
    label: 'Type',
    text: '',
    term: '',
  },
  {
    id: 'confirmations',
    label: 'Confirmations',
    text: '',
    term: '',
  },
];

const demoData = [
  {
    hash: '5CpdpKwKUBJgD4Bdase123as12asd21312',
    block: '7887219',
    time: '55 sec ago',
    timeType: 'in',
    application_id: '5CpdpKwKUBJgD4Bdase123as12asd21312',
    type: 'other',
    confirmations: 5,
  },
];

const Transactions = ({transactions}: {transactions: Array}) => {
  const classes = useStyles();
  const renderRow = transaction => {
    return (
      <TableRow key={transaction.hash}>
        <TableCell>{transaction.hash}</TableCell>
        <TableCell>{transaction.block}</TableCell>
        <TableCell>
          {transaction.time}
          <span className={classes.timeType}>{transaction.timeType}</span>
        </TableCell>
        <TableCell>{transaction.application_id}</TableCell>
        <TableCell>
          <TypeLabel type={transaction.type} label={transaction.type} />
        </TableCell>
        <TableCell>{transaction.confirmations}</TableCell>
      </TableRow>
    );
  };

  return (
    <Table
      initialOrder="hash"
      renderRow={renderRow}
      data={demoData}
      fields={fields}
    />
  );
};

export default observer(Transactions);
