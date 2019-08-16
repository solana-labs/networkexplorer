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
import Avatar from 'v2/components/UI/Avatar';

import {LAMPORT_SOL_RATIO} from '../../../constants';
import HelpLink from '../../HelpLink';
import useStyles from './styles';

const ValidatorsTable = ({separate}: {separate: boolean}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const {validators} = NodesStore;

  const renderRow = row => {
    const uptime = getUptime(row);
    const {identity = {}, nodePubkey, stake} = row;
    return (
      <TableRow hover key={nodePubkey}>
        <TableCell>1</TableCell>
        <TableCell>
          <Link to={`/validators/${nodePubkey}`} className={classes.name}>
            <Avatar pubkey={nodePubkey} avatarUrl={identity.avatarUrl} />
            <div>{identity.name || nodePubkey}</div>
          </Link>
        </TableCell>
        <TableCell>{(stake * LAMPORT_SOL_RATIO).toFixed(8)}</TableCell>
        <TableCell>{uptime}%</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    const uptime = getUptime(card);
    const {identity = {}, nodePubkey, stake} = card;
    return (
      <div
        className={cn(classes.card, separate && classes.cardVertical)}
        key={card.nodePubkey}
      >
        <Link to={`/validators/${card.nodePubkey}`} className={classes.name}>
          <Avatar pubkey={card.nodePubkey} avatarUrl={identity.avatarUrl} />
          <div>{identity.name || nodePubkey}</div>
        </Link>
        <Grid container>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Stake</div>
            <div>{(stake * LAMPORT_SOL_RATIO).toFixed(4)} </div>
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
        <Typography>
          Active Validators
          <HelpLink text="" term="" />
        </Typography>
        <Typography variant="h5">{validators.length}</Typography>
        {!separate && (
          <Link to="/validators/all" className={classes.link}>
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
              <TableCell>Stake SOL</TableCell>
              <TableCell width={110}>Uptime</TableCell>
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
