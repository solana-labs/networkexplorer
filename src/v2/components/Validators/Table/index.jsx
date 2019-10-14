// @flow

import React from 'react';
import {Typography, TableCell, TableRow, Grid} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {map, concat} from 'lodash/fp';
import NodesStore from 'v2/stores/nodes';
import getUptime from 'v2/utils/getUptime';
import Table from 'v2/components/UI/Table';
import {LAMPORT_SOL_RATIO} from 'v2/constants';
import Socket from 'v2/stores/socket';
import Loader from 'v2/components/UI/Loader';
import HelpLink from 'v2/components/HelpLink';

import ValidatorName from 'v2/components/UI/ValidatorName';
import useStyles from './styles';

const fields = [
  {
    id: 'identity.name',
    label: 'Name/Moniker',
    text: '',
    term: '',
  },
  {
    id: 'activatedStake',
    label: 'Staked SOL',
    text: '',
    term: '',
  },
  {
    id: 'commission',
    label: 'Commission',
    text: '',
    term: '',
  },
  {
    id: 'uptime.uptime.[0].percentage',
    label: 'Uptime',
    text: 'term',
  },
];

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
        <TableCell>
          <ValidatorName
            pubkey={nodePubkey}
            name={identity.name}
            avatar={identity.avatarUrl}
          />
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
        <ValidatorName
          pubkey={nodePubkey}
          name={identity.name}
          avatar={identity.avatarUrl}
        />
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

  const allValidators = concat(activeValidators)(inactiveValidators);

  return (
    <div className={cn(classes.root, separate && classes.separateRoot)}>
      {!separate && (
        <div className={classes.header}>
          <Typography>Validators</Typography>
          <HelpLink text="" term="" />
          <Typography variant="h5">{allValidators.length}</Typography>
          <Link to="/validators/all" className={classes.link}>
            See all &gt;
          </Link>
        </div>
      )}
      {showTable ? (
        <Table
          fields={fields}
          data={allValidators}
          initialSort="identity.name"
          renderRow={renderRow}
        />
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
