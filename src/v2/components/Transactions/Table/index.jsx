// @flow

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import HelpLink from 'v2/components/HelpLink';
import TypeLabel from 'v2/components/UI/TypeLabel';
import type {TableHeadProps} from 'v2/@types/table';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useStyles from './styles';

const tHeads: TableHeadProps[] = [
  {
    name: 'hash',
    text: '',
    term: '',
  },
  {
    name: 'block',
    text: '',
    term: '',
  },
  {
    name: 'time',
    text: '',
    term: '',
  },
  {
    name: 'application id',
    text: '',
    term: '',
  },
  {
    name: 'type',
    text: '',
    term: '',
  },
  {
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
        <TableCell align="center">
          <Link to={`/transactions/${transaction.id}`} className={classes.name}>
            {transaction.id}
          </Link>
        </TableCell>
        <TableCell>
          <Link to={`/blocks/${transaction.blockId}`} className={classes.name}>
            {transaction.blockId}
          </Link>
        </TableCell>
        <TableCell title={transaction.timestamp}>
          {asTime(transaction.timestamp)}
        </TableCell>
        <TableCell>
          <Link
            to={`/applications/${transaction.instructions[0].programId}`}
            className={classes.name}
          >
            {transaction.instructions[0].programId}
          </Link>
        </TableCell>
        <TableCell>
          TODO <TypeLabel type="loader" label="loader" />
        </TableCell>
        <TableCell>TODO</TableCell>
      </TableRow>
    );
  };

  const renderCard = transaction => {
    return (
      <div className={classes.card}>
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

  const renderTH = ({name, ...rest}: TableHeadProps) => (
    <TableCell key={name}>
      {name}
      <HelpLink {...rest} />
    </TableCell>
  );

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table>
          <TableHead className={classes.head}>
            <TableRow>{map(renderTH)(tHeads)}</TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.body,
            }}
          >
            {map(renderRow)(transactions)}
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(transactions)}
        </div>
      )}
    </div>
  );
};

export default observer(TransactionsTable);
