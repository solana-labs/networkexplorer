// @flow

import React, {useState} from 'react';
import {
  Typography,
  TableCell,
  TableRow,
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
import Table from 'v2/components/UI/Table';
import Socket from 'v2/stores/socket';
import Loader from 'v2/components/UI/Loader';
import HelpLink from 'v2/components/HelpLink';
import ValidatorName from 'v2/components/UI/ValidatorName';
import TableCard from 'v2/components/UI/TableCard';

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
  const {activeValidators, inactiveValidators} = NodesStore;

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

  const renderRow = ({data: row}) => {
    const {
      identity = {},
      nodePubkey,
      stakedSol,
      stakedSolPercent,
      calcCommission,
      calcUptime,
    } = row;
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
          <div>{stakedSol ? `${stakedSol} (${stakedSolPercent}%)` : 'N/A'}</div>
        </TableCell>
        <TableCell>{calcCommission ? `${calcCommission}%` : 'N/A'}</TableCell>
        <TableCell>{calcUptime ? `${calcUptime}%` : 'Unavailable'}</TableCell>
      </TableRow>
    );
  };
  const renderCard = card => {
    const {
      identity = {},
      nodePubkey,
      stakedSol,
      stakedSolPercent,
      calcCommission,
      calcUptime,
    } = card;
    const data = [
      {
        label: 'Name',
        value: (
          <ValidatorName
            pubkey={nodePubkey}
            name={identity.name}
            avatar={identity.avatarUrl}
          />
        ),
      },
      {
        label: 'Stake',
        value: stakedSol ? `${stakedSol} (${stakedSolPercent}%)` : 'N/A',
      },
      {
        label: 'Commission',
        value: <div>{calcCommission ? `${calcCommission}%` : 'N/A'}</div>,
      },
      {
        label: 'Uptime',
        value: calcUptime ? `${calcUptime}%` : 'Unavailable',
      },
    ];
    return <TableCard vertical={separate} key={nodePubkey} data={data} />;
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
