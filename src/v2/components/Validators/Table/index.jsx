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
import Socket from '../../../stores/socket';
import Loader from '../../UI/Loader';
import useStyles from './styles';

const ValidatorsTable = ({separate}: {separate: boolean}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const {activeValidators, inactiveValidators} = NodesStore;
  const {isLoading} = Socket;

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Loader width="100%" height={100} />
      </div>
    );
  }

  const renderRow = row => {
    const uptime = row.uptime && getUptime(row);
    const {identity = {}, nodePubkey, activatedStake, commission} = row;
    return (
      <TableRow hover key={nodePubkey}>
        <TableCell align="center">
          <Link to={`/validators/${nodePubkey}`} className={classes.name}>
            <Avatar pubkey={nodePubkey} avatarUrl={identity.avatarUrl} />
            <div>{identity.name || nodePubkey}</div>
          </Link>
        </TableCell>
        <TableCell>
          {(activatedStake &&
            (activatedStake * LAMPORT_SOL_RATIO).toFixed(8)) ||
            'N/A'}
        </TableCell>
        <TableCell>{commission || 'N/A'}</TableCell>
        <TableCell>{(uptime && uptime + '%') || 'Unavailable'}</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    const uptime = card.uptime && getUptime(card);
    const {identity = {}, nodePubkey, activatedStake, commission} = card;
    return (
      <div
        className={cn(classes.card, separate && classes.cardVertical)}
        key={nodePubkey}
      >
        <Link to={`/validators/${nodePubkey}`} className={classes.name}>
          <Avatar pubkey={nodePubkey} avatarUrl={identity.avatarUrl} />
          <div>{identity.name || nodePubkey}</div>
        </Link>
        <Grid container spacing={1}>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Stake</div>
            <div>
              {(activatedStake &&
                (activatedStake * LAMPORT_SOL_RATIO).toFixed(4)) ||
                'N/A'}
            </div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Commission</div>
            <div>{commission || 'N/A'}</div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Uptime</div>
            <div>{(uptime && uptime + '%') || 'Unavailable'}</div>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div className={cn(classes.root, separate && classes.separateRoot)}>
      {!separate && (
        <div className={classes.header}>
          <Typography>Validators</Typography>
          <Typography variant="h5">
            {activeValidators.length + inactiveValidators.length}
          </Typography>

          <Link to="/validators/all" className={classes.link}>
            See all &gt;
          </Link>
        </div>
      )}
      {showTable ? (
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align="center">Name/Moniker</TableCell>
              <TableCell width={170}>Staked SOL</TableCell>
              <TableCell width={170}>Commission</TableCell>
              <TableCell width={130}>Uptime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.body,
            }}
          >
            {map(renderRow)(activeValidators)}
            {map(renderRow)(inactiveValidators)}
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(activeValidators)}
          {map(renderCard)(inactiveValidators)}
        </div>
      )}
    </div>
  );
};

export default observer(ValidatorsTable);
