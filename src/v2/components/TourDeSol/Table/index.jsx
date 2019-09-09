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
  const {activeValidators} = NodesStore;

  const renderRow = row => {
    const uptime = getUptime(row);
    const {identity = {}, nodePubkey, activatedStake} = row;
    return (
      <TableRow hover key={nodePubkey}>
        <TableCell>1</TableCell>
        <TableCell>
          <Link to={`/validators/${nodePubkey}`} className={classes.name}>
            <Avatar pubkey={nodePubkey} avatarUrl={identity.avatarUrl} />
            <div>{identity.name || nodePubkey}</div>
          </Link>
        </TableCell>
        <TableCell>{(activatedStake * LAMPORT_SOL_RATIO).toFixed(8)}</TableCell>
        <TableCell>{uptime}%</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    const uptime = getUptime(card);
    const {identity = {}, nodePubkey, activatedStake} = card;
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
            <div>{(activatedStake * LAMPORT_SOL_RATIO).toFixed(4)} </div>
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
          <HelpLink
            text="The number of validators currently confirming the legitimacy of entries added to the ledger."
            term=""
          />
        </Typography>
        <Typography variant="h5">{activeValidators.length}</Typography>
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
              <TableCell>Name</TableCell>
              <TableCell width={150}>Staked SOL</TableCell>
              <TableCell width={110}>Uptime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            classes={{
              root: classes.body,
            }}
          >
            {map(renderRow)(activeValidators)}
          </TableBody>
        </Table>
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(activeValidators)}
        </div>
      )}
    </div>
  );
};

export default observer(ValidatorsTable);
