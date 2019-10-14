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
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

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
    label: 'application id',
    name: 'application id',
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

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const renderRow = transaction => {
    return (
      <TableRow hover key={transaction.id}>
        <TableCell>
          <Link to={`/transactions/${transaction.id}`}>{transaction.id}</Link>
        </TableCell>
        <TableCell>
          <Link to={`/blocks/${transaction.blockId}`}>
            {transaction.blockId}
          </Link>
        </TableCell>
        <TableCell width={135}>{asTime(transaction.timestamp)}</TableCell>
        <TableCell width={230}>
          <Link
            to={`/applications/${transaction.instructions[0].programId}`}
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
    return (
      <div className={classes.card} key={transaction.id}>
        <ul>
          <li>
            <div className={classes.cardTitle}>Hash</div>
            <Link
              to={`/transactions/${transaction.id}`}
              className={classes.name}
            >
              <div>{transaction.id}</div>
            </Link>
          </li>
          <li>
            <div className={classes.cardTitle}>Block</div>
            <Link
              to={`/blocks/${transaction.blockId}`}
              className={classes.name}
            >
              {transaction.blockId}
            </Link>
          </li>
          <li>
            <div className={classes.cardTitle}>Time</div>
            <div title={transaction.timestamp}>
              {asTime(transaction.timestamp)}
            </div>
          </li>
          <li>
            <div className={classes.cardTitle}>Application ID</div>
            <Link
              to={`/applications/${transaction.instructions[0].programId}`}
              className={classes.name}
            >
              <div>{transaction.instructions[0].programId}</div>
            </Link>
          </li>
          <li>
            <div className={classes.cardTitle}>Type</div>
            TODO <TypeLabel type="loader" label="loader" />
          </li>
          <li>
            <div className={classes.cardTitle}>Confirmations</div>
            <div>TODO</div>
          </li>
        </ul>
      </div>
    );
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
