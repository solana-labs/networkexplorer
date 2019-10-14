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
import useStyles from './styles';

const fields: TableHeadProps[] = [
  {
    label: 'Blocks',
    name: 'blocks',
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

  const renderRow = block => {
    return (
      <TableRow hover key={block.id}>
        <TableCell align="center">
          <Link to={`/blocks/${block.id}`}>{block.id}</Link>
        </TableCell>
        <TableCell width={100}>{block.slot}</TableCell>
        <TableCell width={140}>{asTime(block.timestamp)}</TableCell>
        <TableCell width={200}>TODO</TableCell>
        <TableCell width={140}>TODO</TableCell>
        <TableCell>
          <ValidatorName pubkey={block.leader} name={block.leader} avatar="" />
        </TableCell>
      </TableRow>
    );
  };

  const renderCard = block => {
    return (
      <div className={classes.card} key={block.id}>
        <ul>
          <li>
            <div className={classes.cardTitle}>Block</div>
            <div>{block.id}</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Slot</div>
            <div>{block.slot}</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Time</div>
            <div title={block.timestamp}>{asTime(block.timestamp)}</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Transactions</div>
            <div>TODO</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Confidence</div>
            <div>TODO</div>
          </li>
          <li>
            <div className={classes.cardTitle}>Leader</div>
            <ValidatorName
              pubkey={block.leader}
              name={block.leader}
              avatar=""
            />
          </li>
        </ul>
      </div>
    );
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
