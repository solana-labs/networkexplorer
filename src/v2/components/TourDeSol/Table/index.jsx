// @flow

import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import NodesStore from 'v2/stores/nodes';
import HelpLink from '../../HelpLink';

import useStyles from './styles';

const ValidatorsTable = ({separate}: {separate: boolean}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const {
    cluster: {voting = []},
  } = NodesStore;

  const renderRow = row => {
    return (
      <TableRow hover key={row.nodePubkey}>
        <TableCell>1</TableCell>
        <TableCell>
          <Link
            to={`/rc/validators/${row.nodePubkey}`}
            className={classes.name}
          >
            <span />
            <div>{row.nodePubkey}</div>
          </Link>
        </TableCell>
        <TableCell>{row.stake}</TableCell>
        <TableCell>TODO</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    return (
      <div
        className={cn(classes.card, separate && classes.cardVertical)}
        key={card.nodePubkey}
      >
        <Link to={`/rc/validators/${card.nodePubkey}`} className={classes.name}>
          <span />
          <div>{card.nodePubkey}</div>
        </Link>
        <Grid container>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Stake</div>
            <div>{card.stake}</div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Uptime</div>
            <div>TODO</div>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography>
          Active Validators
          <HelpLink text="" term="" />
        </Typography>
        <Typography variant="h5">{voting.length}</Typography>
        {!separate && (
          <Link to="/rc/validators/all" className={classes.link}>
            See all &gt;
          </Link>
        )}
      </div>
      {showTable ? (
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell width={100}>Ranking</TableCell>
              <TableCell width={230}>Name</TableCell>
              <TableCell>Stake</TableCell>
              <TableCell width={110}>Uptime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.body,
            }}
          >
            {map(renderRow)(voting)}
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(voting)}
        </div>
      )}
    </div>
  );
};

export default observer(ValidatorsTable);
