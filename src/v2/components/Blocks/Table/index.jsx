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

import HelpLink from '../../HelpLink';
import useStyles from './styles';

type THead = {
  name: string,
  text: string,
  term: string,
  width?: number,
};

const tHeads: THead[] = [
  {
    name: 'blocks',
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
    name: 'uncles',
    text: '',
    term: '',
  },
  {
    name: 'miner',
    text: '',
    term: '',
    width: 200,
  },
];

const BlocksTable = ({separate}: {separate: boolean}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const blocks = [];

  const renderRow = block => {
    return (
      <TableRow hover key={block.id}>
        <TableCell align="center">
          <Link to={`/blocks/${block.id}`} className={classes.name}>
            7887319
          </Link>
        </TableCell>
        <TableCell>55 sec ago</TableCell>
        <TableCell>126</TableCell>
        <TableCell>5</TableCell>
        <TableCell>
          <Avatar avatarUrl="" />
          {block.pubkey}
        </TableCell>
      </TableRow>
    );
  };
  const renderTH = ({name, width, ...rest}: THead) => (
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
            <TableRow hover>
              <TableCell align="center">
                <Link to={`/blocks/123`} className={classes.name}>
                  7887319
                </Link>
              </TableCell>
              <TableCell>55 sec ago</TableCell>
              <TableCell>126</TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <div className={classes.miner}>
                  <Avatar avatarUrl="" />
                  <div>0xAA15A3E6b97...</div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          <div className={classes.card}>
            <ul>
              <li>
                <div className={classes.cardTitle}>Block</div>
                <div>7887219</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Time</div>
                <div>55 sec ago</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Transactions</div>
                <div>126</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Uncles</div>
                <div>5</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Miner</div>
                <div className={classes.miner}>
                  <Avatar avatarUrl="" />
                  <div>0xAA15A3E6b97...</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(BlocksTable);
