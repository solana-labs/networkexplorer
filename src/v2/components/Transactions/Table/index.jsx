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
  transactions: any[],
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const renderRow = transaction => {
    return (
      <TableRow hover key={transaction.id}>
        <TableCell align="center">
          <Link to={`/transaction/${transaction.id}`} className={classes.name}>
            7887319
          </Link>
        </TableCell>
        <TableCell>
          <Link to={`/blocks/${transaction.block}`} className={classes.name}>
            7887319
          </Link>
        </TableCell>
        <TableCell>55 sec ago</TableCell>
        <TableCell>
          <Link
            to={`/applications/${transaction.app}`}
            className={classes.name}
          >
            7887319
          </Link>
        </TableCell>
        <TableCell>
          <TypeLabel type="loader" label="loader" />
        </TableCell>
      </TableRow>
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
            <TableRow hover>
              <TableCell align="center">
                <Link to={`/transactions/234`} className={classes.name}>
                  <div>5CpdpKwKUBJgD4Bd...</div>
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/blocks/456`} className={classes.name}>
                  7887319
                </Link>
              </TableCell>
              <TableCell>55 sec ago</TableCell>
              <TableCell>
                <Link to={`/applications/123`} className={classes.name}>
                  <div>5CpdpKwKUBJgD4Bd...</div>
                </Link>
              </TableCell>
              <TableCell>
                <TypeLabel type="loader" label="loader" />
              </TableCell>
              <TableCell>5</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          <div className={classes.card}>
            <ul>
              <li>
                <div className={classes.cardTitle}>Hash</div>
                <Link to={`/transaction/234`} className={classes.name}>
                  <div>5CpdpKwKUBJgD4Bd...</div>
                </Link>
              </li>
              <li>
                <div className={classes.cardTitle}>Block</div>
                <Link to={`/blocks/456`} className={classes.name}>
                  7887319
                </Link>
              </li>
              <li>
                <div className={classes.cardTitle}>Time</div>
                <div>55 sec ago</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Application ID</div>
                <Link to={`/applications/123`} className={classes.name}>
                  <div>5CpdpKwKUBJgD4Bd...</div>
                </Link>
              </li>
              <li>
                <div className={classes.cardTitle}>Type</div>
                <TypeLabel type="loader" label="loader" />
              </li>
              <li>
                <div className={classes.cardTitle}>Confirmations</div>
                <div>5</div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(TransactionsTable);
