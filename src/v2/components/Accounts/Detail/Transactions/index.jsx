// @flow
import React from 'react';
import {observer} from 'mobx-react-lite';
import {TableCell, TableRow} from '@material-ui/core';
import {Link} from 'react-router-dom';
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
  const renderRow = ({data: transaction}) => {
    return (
      <TableRow key={transaction.hash}>
        <TableCell>{transaction.hash}</TableCell>
        <TableCell>
          <Link to={`/blocks/${transaction.block}`}>{transaction.block}</Link>
        </TableCell>
        <TableCell>
          <div>
            {transaction.time}
            <span className={classes.timeType}>{transaction.timeType}</span>
          </div>
        </TableCell>
        <TableCell>
          <Link to={`/applications/${transaction.application_id}`}>
            {transaction.application_id}
          </Link>
        </TableCell>
        <TableCell>
          <div>
            <TypeLabel type={transaction.type} label={transaction.type} />
          </div>
        </TableCell>
        <TableCell width={200}>{transaction.confirmations}</TableCell>
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
