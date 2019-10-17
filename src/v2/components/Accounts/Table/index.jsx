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
    label: 'Account Id',
    name: 'Account Id',
    text: '',
    term: '',
  },
  {
    label: 'Type',
    name: 'type',
    text: '',
    term: '',
  },
  {
    label: 'Time',
    name: 'time',
    text: '',
    term: '',
  },
];

const AccountsTable = ({
  separate,
  accounts,
}: {
  separate: boolean,
  accounts: Array,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const renderRow = account => {
    return (
      <TableRow hover key={account.programId}>
        <TableCell>
          <Link to={`/accounts/${account.programId}`}>{account.programId}</Link>
        </TableCell>
        <TableCell>
          <div>
            <TypeLabel type="other" label="TODO" />
          </div>
        </TableCell>
        <TableCell title={account.timestamp}>
          {asTime(account.timestamp)}
        </TableCell>
      </TableRow>
    );
  };

  const renderCard = account => {
    return (
      <div className={classes.card}>
        <ul>
          <li>
            <div className={classes.cardTitle}>Account id</div>
            <div>{account.programId}</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Type</div>
            <div>
              TODO <TypeLabel type="other" label="other" />
            </div>
          </li>
          <li>
            <div className={classes.cardTitle}>Time</div>
            <div title={account.timestamp}>{asTime(account.timestamp)}</div>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table fields={fields} renderRow={renderRow} data={accounts} />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(accounts)}
        </div>
      )}
    </div>
  );
};

export default observer(AccountsTable);
