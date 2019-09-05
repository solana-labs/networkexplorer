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

import useStyles from './styles';

type THead = {
  name: string,
  text: string,
  term: string,
  width?: number,
};

const tHeads: THead[] = [
  {
    name: 'Account Id',
    text: '',
    term: '',
  },
  {
    name: 'nickname',
    text: '',
    term: '',
  },
  {
    name: 'balance',
    text: '',
    term: '',
  },
  {
    name: 'transactions',
    text: '',
    term: '',
  },
];

const AccountsTable = ({separate}: {separate: boolean}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const blocks = [];

  const renderRow = application => {
    return (
      <TableRow hover key={application.id}>
        <TableCell align="center">
          <Link to={`/applications/${application.id}`} className={classes.name}>
            7887319
          </Link>
        </TableCell>
        <TableCell>TESTNAME</TableCell>
        <TableCell>0.006 SOL | $1.12</TableCell>
        <TableCell>1234</TableCell>
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
                <Link to={`/applications/1234`} className={classes.name}>
                  7887319
                </Link>
              </TableCell>
              <TableCell>TESTNAME</TableCell>
              <TableCell>0.006 SOL | $1.12</TableCell>
              <TableCell>1234</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          <div className={classes.card}>
            <ul>
              <li>
                <div className={classes.cardTitle}>Application id</div>
                <div>7887219</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Nickname</div>
                <div>TESTNAME</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Balance</div>
                <div>0.006 SOL | $1.12</div>
              </li>
              <li>
                <div className={classes.cardTitle}>Transactions</div>
                <div>2345</div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(AccountsTable);
