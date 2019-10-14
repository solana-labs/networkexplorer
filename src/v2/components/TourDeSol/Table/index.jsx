// @flow

import React from 'react';
import {Typography, TableCell, TableRow, Grid} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map} from 'lodash/fp';
import Table from 'v2/components/UI/Table';
import HelpLink from 'v2/components/HelpLink';
import ValidatorName from 'v2/components/UI/ValidatorName';
import useStyles from './styles';

const fields = [
  {
    label: 'ranking',
    name: 'ranking',
    text: '',
    term: '',
  },
  {
    label: 'name',
    name: 'name',
    text: '',
    term: '',
  },
  {
    label: 'Staked sol',
    name: 'staked_sol',
    text: '',
    term: '',
  },
  {
    label: 'Uptime',
    name: 'uptime',
    text: '',
    term: '',
  },
];

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
        <TableCell width={150}>{rank}</TableCell>
        <TableCell>
          <ValidatorName pubkey={pubkey} name={name} avatar={avatarUrl} />
        </TableCell>
        <TableCell width={200}>{activatedStake.toFixed(8)}</TableCell>
        <TableCell width={150}>{uptimePercent}%</TableCell>
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
        <ValidatorName pubkey={pubkey} name={name} avatar={avatarUrl} />
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
        <Table fields={fields} renderRow={renderRow} data={activeValidators} />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(activeValidators)}
        </div>
      )}
    </div>
  );
};

export default observer(ValidatorsTable);
