// @flow

import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import cn from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import Table from 'v2/components/UI/Table';
import type {TableHeadProps} from 'v2/@types/table';
import ValidatorName from 'v2/components/UI/ValidatorName';
import TableCard from 'v2/components/UI/TableCard';

import useStyles from './styles';

const fields: TableHeadProps[] = [
  {
    label: 'Block',
    name: 'block',
    text: '',
    term: '',
  },
  {
    label: 'slot',
    name: 'slot',
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
    label: 'transactions',
    name: 'transactions',
    text: '',
    term: '',
  },
  {
    label: 'confidence',
    name: 'confidence',
    text: '',
    term: '',
  },
  {
    label: 'leader',
    name: 'leader',
    text: '',
    term: '',
  },
];

const BlocksTable = ({
  blocks,
  separate,
}: {
  blocks: Array,
  separate: boolean,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const asTime = x => {
    return formatDistanceToNow(Date.parse(x), {addSuffix: true});
  };

  const renderRow = ({data: block}) => {
    return (
      <TableRow hover key={block.id}>
        <TableCell align="center" title={block.id}>
          <Link to={`/blocks/${block.id}`}>{block.id}</Link>
        </TableCell>
        <TableCell width={100}>{block.slot}</TableCell>
        <TableCell width={140} title={block.timestamp}>
          {asTime(block.timestamp)}
        </TableCell>
        <TableCell width={200}>TODO</TableCell>
        <TableCell width={140}>TODO</TableCell>
        <TableCell>
          <ValidatorName pubkey={block.leader} name={block.leader} avatar="" />
        </TableCell>
      </TableRow>
    );
  };

  const renderCard = block => {
    const {id, slot, timestamp, leader} = block;
    const data = [
      {
        label: 'Block',
        value: id,
      },
      {
        label: 'Slot',
        value: slot,
      },
      {
        label: 'Time',
        value: asTime(timestamp),
      },
      {
        label: 'Transactions',
        value: 'TODO',
      },
      {
        label: 'Confidence',
        value: 'TODO',
      },
      {
        label: 'Leader',
        value: <ValidatorName pubkey={leader} name={leader} avatar="" />,
      },
    ];
    return <TableCard key={block.id} data={data} />;
  };

  return (
    <div className={classes.root}>
      {showTable ? (
        <Table fields={fields} data={blocks} renderRow={renderRow} />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(blocks)}
        </div>
      )}
    </div>
  );
};

export default observer(BlocksTable);
