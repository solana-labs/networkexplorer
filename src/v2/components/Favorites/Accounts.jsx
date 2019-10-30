// @flow

import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map, values} from 'lodash/fp';
import Table from 'v2/components/UI/Table';
import type {TableHeadProps} from 'v2/@types/table';
import TableCard from 'v2/components/UI/TableCard';
import FavoritesStore from 'v2/stores/favorites';

import useStyles from './styles';

const fields: TableHeadProps[] = [
  {
    id: 'id',
    label: 'Account Id',
    text: '',
    term: '',
  },
  {
    id: 'name',
    label: 'nickname',
    text: '',
    term: '',
  },
  {
    id: 'balance',
    label: 'balance',
    text: '',
    term: '',
  },
  {
    id: 'transactions',
    label: 'transactions',
    text: '',
    term: '',
  },
];

const AccountsTable = ({separate}: {separate: boolean}) => {
  const {endpointFavorites} = FavoritesStore;
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const renderRow = ({data: account}) => {
    const {id, owner} = account;
    return (
      <TableRow hover key={id}>
        <TableCell align="center">
          <Link to={`/accounts/${id}`}>{id}</Link>
        </TableCell>
        <TableCell>{owner}</TableCell>
        <TableCell>0.006 SOL | $1.12</TableCell>
        <TableCell>1234</TableCell>
      </TableRow>
    );
  };

  const renderCard = account => {
    const {id, owner} = account;
    const data = [
      {
        label: 'Account Id',
        value: id,
      },
      {
        label: 'Nickname',
        value: owner,
      },
    ];
    return <TableCard key={id} data={data} />;
  };

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table
          fields={fields}
          renderRow={renderRow}
          data={values(endpointFavorites.accounts)}
        />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(values(endpointFavorites.accounts))}
        </div>
      )}
    </div>
  );
};

export default observer(AccountsTable);
