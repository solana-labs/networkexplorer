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
import Avatar from 'v2/components/UI/Avatar';
import type {TableHeadProps} from 'v2/@types/table';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import HelpLink from '../../HelpLink';
import useStyles from './styles';

const tHeads: TableHeadProps[] = [
  {
    name: 'blocks',
    text: '',
    term: '',
  },
  {
    name: 'slot',
    text: '',
    term: '',
  },
  {
    name: 'time',
    text: '',
    term: '',
  },
  {
    name: 'transactions',
    text: '',
    term: '',
  },
  {
    name: 'confidence',
    text: '',
    term: '',
  },
  {
    name: 'leader',
    text: '',
    term: '',
    width: 200,
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
          <Link to={`/blocks/${block.id}`} className={classes.name}>
            {block.id}
          </Link>
        </TableCell>
        <TableCell>{block.slot}</TableCell>
        <TableCell title={block.timestamp}>{asTime(block.timestamp)}</TableCell>
        <TableCell>TODO</TableCell>
        <TableCell>TODO</TableCell>
        <TableCell>
          <Avatar avatarUrl="" />
          {block.leader}
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
            <div className={classes.leader}>
              <Avatar avatarUrl="" />
              <div>{block.leader}</div>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const renderTH = ({name, width, ...rest}: TableHeadProps) => (
    <TableCell key={name} width={width}>
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
            {map(renderRow)(blocks)}
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(blocks)}
        </div>
      )}
    </div>
  );
};

export default observer(BlocksTable);
