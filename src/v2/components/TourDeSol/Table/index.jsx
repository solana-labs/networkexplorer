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
import Avatar from 'v2/components/UI/Avatar';

import HelpLink from '../../HelpLink';
import useStyles from './styles';

const ValidatorsTable = ({
  activeValidators,
  separate,
}: {
  activeValidators: Array,
  separate: boolean,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));

  const renderRow = row => {
    const {name, pubkey, avatarUrl, activatedStake, uptimePercent, rank} = row;
    return (
      <TableRow hover key={pubkey}>
        <TableCell>{rank}</TableCell>
        <TableCell>
          <Link to={`/validators/${pubkey}`} className={classes.name}>
            <Avatar pubkey={pubkey} avatarUrl={avatarUrl} />
            <div>{name || pubkey}</div>
          </Link>
        </TableCell>
        <TableCell>{activatedStake.toFixed(8)}</TableCell>
        <TableCell>{uptimePercent}%</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    const {name, pubkey, avatarUrl, activatedStake, uptimePercent} = card;
    return (
      <div
        className={cn(classes.card, separate && classes.cardVertical)}
        key={pubkey}
      >
        <Link to={`/validators/${pubkey}`} className={classes.name}>
          <Avatar pubkey={pubkey} avatarUrl={avatarUrl} />
          <div>{name || pubkey}</div>
        </Link>
        <Grid container>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Stake</div>
            <div>{activatedStake.toFixed(4)} </div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Uptime</div>
            <div>{uptimePercent}%</div>
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
