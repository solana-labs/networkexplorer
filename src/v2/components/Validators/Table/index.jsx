// @flow

import React, {useState} from 'react';
import {
  Typography,
  TableCell,
  TableRow,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import cn from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {eq, map, concat} from 'lodash/fp';
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
  const [tab, setTab] = useState('active');
  const classes = useStyles();
  const theme = useTheme();
  const showTable = useMediaQuery(theme.breakpoints.up('md'));
  const {activeValidators, inactiveValidators, totalStaked} = NodesStore;
  const {isLoading} = Socket;
  const isActiveTab = eq(tab);
  const switchTab = tab => () => setTab(tab);
  const selectTab = e => setTab(e.target.value);
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
          {activatedStake && (
            <div>
              {(activatedStake * LAMPORT_SOL_RATIO).toFixed(8) || 'N/A'} (
              {(100 * (activatedStake / totalStaked)).toFixed(3)}%)
            </div>
          )}
        </TableCell>
        <TableCell>
          {commission || 'N/A'}
          {Boolean(commission) &&
            ` (${(100 * (commission / 0xff)).toFixed(3)}%)`}
        </TableCell>
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
              {(activatedStake * LAMPORT_SOL_RATIO).toFixed(8) || 'N/A'} (
              {(100 * (activatedStake / totalStaked)).toFixed(3)}%)
            </div>
          </Grid>
          <Grid item xs={4} zeroMinWidth>
            <div className={classes.cardTitle}>Commission</div>
            <div>
              {commission || 'N/A'}
              {Boolean(commission) &&
                ` (${(100 * (commission / 0xff)).toFixed(3)}%)`}
            </div>
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
      <div className={classes.header}>
        <div className={classes.tabNav}>
          <button
            className={cn(classes.tabBtn, {
              [classes.activeTabBtn]: isActiveTab('active'),
            })}
            type="button"
            onClick={switchTab('active')}
          >
            ({activeValidators.length}) Active Validators
          </button>
          <button
            className={cn(classes.tabBtn, {
              [classes.activeTabBtn]: isActiveTab('inactive'),
            })}
            type="button"
            onClick={switchTab('inactive')}
          >
            ({inactiveValidators.length}) Inactive Validators
          </button>
          <HelpLink text="" term="" />
        </div>
        {!separate && (
          <>
            <Typography variant="h5">{allValidators.length}</Typography>
            <Link to="/validators/all" className={classes.link}>
              See all &gt;
            </Link>
          </>
        )}
      </div>
      <div className={classes.tabSelect}>
        <Select
          className={classes.tabSelectRoot}
          value={tab}
          onChange={selectTab}
        >
          <MenuItem value="active">Active Validators</MenuItem>
          <MenuItem value="inactive">Inactive Validators</MenuItem>
        </Select>
        <HelpLink text="" term="" />
      </div>
      {showTable ? (
        <Table
          fields={fields}
          data={isActiveTab('active') ? activeValidators : inactiveValidators}
          initialSort="identity.name"
          renderRow={renderRow}
        />
      ) : (
        <div className={cn(classes.list, separate && classes.vertical)}>
          {map(renderCard)(
            isActiveTab('active') ? activeValidators : inactiveValidators,
          )}
        </div>
      )}
    </div>
  );
};

export default observer(ValidatorsTable);
