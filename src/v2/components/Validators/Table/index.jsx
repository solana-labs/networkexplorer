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
import getUptime from 'v2/utils/getUptime';

import useStyles from './styles';

const ValidatorsTable = ({separate}: {separate: boolean}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const {validators} = NodesStore;
  const renderRow = row => {
    const uptime = getUptime(row);
    return (
      <TableRow hover key={row.nodePubkey}>
        <TableCell align="center">
          <Link
            to={`/rc/validators/${row.nodePubkey}`}
            className={classes.name}
          >
            <span />
            <div>{row.nodePubkey}</div>
          </Link>
        </TableCell>
        <TableCell>{row.stake} Lamports</TableCell>
        <TableCell>{row.commission}</TableCell>
        <TableCell>{uptime}%</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    const uptime = getUptime(card);
    return (
      <div
        className={cn(classes.card, separate && classes.cardVertical)}
        key={card.nodePubkey}
      >
        <Link to={`/rc/validators/${card.nodePubkey}`} className={classes.name}>
          <span />
          <div>{card.nodePubkey}</div>
        </Link>
        <Grid container spacing={1}>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Stake</div>
            <div>{card.stake} Lamports</div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Commission</div>
            <div>{card.commission}</div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Uptime</div>
            <div>{uptime}%</div>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography>Validators</Typography>
        <Typography variant="h5">{validators.length}</Typography>
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
              <TableCell align="center">Name/Moniker</TableCell>
              <TableCell>Stake</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Uptime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.body,
            }}
          >
            {map(renderRow)(validators)}
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(validators)}
        </div>
      )}
    </div>
  );
};

export default observer(ValidatorsTable);
