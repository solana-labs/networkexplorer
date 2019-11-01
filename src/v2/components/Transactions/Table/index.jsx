// @flow

import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import TypeLabel from 'v2/components/UI/TypeLabel';
import Table from 'v2/components/UI/Table';
import type {TableHeadProps} from 'v2/@types/table';
import TableCard from 'v2/components/UI/TableCard';
import asTime from 'v2/utils/asTime';

import useStyles from './styles';

const fields: TableHeadProps[] = [
  {
    id: 'hash',
    label: 'hash',
    text: '',
    term: '',
  },
  {
    label: 'block',
    name: 'block',
    text: '',
    term: '',
  },
  {
    label: 'time',
    name: 'time',
    text: '',
    term: '',
  },
  {
    label: 'program id',
    name: 'program id',
    text: '',
    term: '',
  },
  {
    label: 'type',
    name: 'type',
    text: '',
    term: '',
  },
  {
    label: 'confirmations',
    name: 'confirmations',
    text: '',
    term: '',
  },
];

const TransactionsTable = ({
  separate,
  transactions,
}: {
  separate: boolean,
  transactions: Array,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const renderRow = ({data: transaction}) => {
    return (
      <TableRow hover key={transaction.id}>
        <TableCell title={transaction.id}>
          <Link to={`/transactions/${transaction.id}`}>{transaction.id}</Link>
        </TableCell>
        <TableCell title={transaction.blockId}>
          <Link to={`/blocks/${transaction.blockId}`}>
            {transaction.blockId}
          </Link>
        </TableCell>
        <TableCell width={135} title={transaction.timestamp}>
          {asTime(transaction.timestamp)}
        </TableCell>
        <TableCell width={230} title={transaction.instructions[0].programId}>
          <Link
            to={`/programs/${transaction.instructions[0].programId}`}
            className={classes.name}
          >
            {transaction.instructions[0].programId}
          </Link>
        </TableCell>
        <TableCell width={110}>
          <div>
            <TypeLabel type="loader" label="TODO" />
          </div>
        </TableCell>
        <TableCell width={200}>TODO</TableCell>
      </TableRow>
    );
  };

  const renderCard = transaction => {
    const {id, blockId, timestamp, instructions} = transaction;
    const data = [
      {
        label: 'Hash',
        value: (
          <Link to={`/transactions/${id}`}>
            <div>{id}</div>
          </Link>
        ),
      },
      {
        label: 'Block',
        value: (
          <Link to={`/blocks/${blockId}`}>
            <div>{blockId}</div>
          </Link>
        ),
      },
      {
        label: 'Time',
        value: asTime(timestamp),
      },
      {
        label: 'Program ID',
        value: (
          <Link to={`/programs/${instructions[0].programId}`}>
            <div>{instructions[0].programId}</div>
          </Link>
        ),
      },
      {
        label: 'Type',
        value: <TypeLabel type="loader" label="TODO" />,
      },
      {
        label: 'Confirmations',
        value: 'TODO',
      },
    ];
    return <TableCard key={id} data={data} />;
  };

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table fields={fields} renderRow={renderRow} data={transactions} />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(transactions)}
        </div>
      )}
    </div>
  );
};

export default observer(TransactionsTable);
