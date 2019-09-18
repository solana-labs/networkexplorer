// @flow
import {Container, useTheme} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React, {useEffect} from 'react';
import {map, find} from 'lodash/fp';
import {Match} from 'react-router-dom';

import getUptime from 'v2/utils/getUptime';
import SectionHeader from 'v2/components/UI/SectionHeader';
import NodesStore from 'v2/stores/nodes';
import HelpLink from 'v2/components/HelpLink';
import Button from 'v2/components/UI/Button';
import Avatar from 'v2/components/UI/Avatar';
import Mixpanel from 'v2/mixpanel';
import CopyBtn from 'v2/components/UI/CopyBtn';

import {LAMPORT_SOL_RATIO} from 'v2/constants';
import ValidatorsMap from 'v2/components/ValidatorsMap';
import useStyles from './styles';

const ValidatorsDetail = ({match}: {match: Match}) => {
  const {validators, inactiveValidators, totalStaked} = NodesStore;

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {params} = match;

  useEffect(() => {
    Mixpanel.track(`Clicked Validator ${params.id}`);
  }, [params.id]);

  let node =
    find({nodePubkey: params.id})(validators) ||
    find({nodePubkey: params.id})(inactiveValidators);

  const uptime = getUptime(node);

  if (!node) {
    return <div>Loading...</div>;
  }

  const {
    nodePubkey,
    gossip,
    activatedStake,
    commission,
    identity = {},
    coordinates,
  } = node;
  const markers = [{gossip, coordinates, name: nodePubkey}];
  const specs = [
    {
      label: 'Address',
      hint: '',
      value() {
        return (
          <div className={classes.address}>
            <span className={classes.value}>{nodePubkey} </span>
            <CopyBtn text={nodePubkey} />
          </div>
        );
      },
    },
    {
      label: 'Staked SOL',
      hint: '',
      value: `${(activatedStake * LAMPORT_SOL_RATIO).toFixed(8)} (${(
        100 *
        (activatedStake / totalStaked)
      ).toFixed(3)}%)`,
    },
    {
      label: 'Website',
      hint: '',
      value() {
        return identity.website ? (
          <a target="_blank" rel="noopener noreferrer" href={identity.website}>
            {identity.website}
          </a>
        ) : (
          ''
        );
      },
    },
    {
      label: 'Uptime',
      hint: '',
      value: `${uptime}%`,
    },
    {
      label: 'keybase',
      hint: '',
      value() {
        return identity.keybaseUsername ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://keybase.io/${identity.keybaseUsername}`}
          >
            {identity.keybaseUsername}
          </a>
        ) : (
          ''
        );
      },
    },
    {
      label: 'Missed blocks',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'details',
      hint: '',
      value: identity.details || '',
    },
    {
      label: 'commission',
      hint: '',
      value: `${(100 * (commission / 0xff)).toFixed(3)}%`,
    },
  ];

  const renderSpec = ({label, value}: {label: string, value: string}) => (
    <li key={label}>
      <div className={classes.label}>
        {label}
        <HelpLink />
      </div>
      <div className={classes.value}>
        {typeof value === 'function' ? value() : value}
      </div>
    </li>
  );

  return (
    <Container>
      <SectionHeader title="Validator Detail">
        {!isMobile && (
          <div className={classes.validatorName}>
            <Avatar pubkey={nodePubkey} avatarUrl={identity.avatarUrl} />
            <span>{identity.name || nodePubkey}</span>
          </div>
        )}
        {!identity.keybaseUsername && (
          <div className={classes.headerBtn}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              href="https://github.com/solana-labs/tour-de-sol#publishing-information-about-your-validator"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect To Keybase
            </Button>
          </div>
        )}
      </SectionHeader>
      <div className={classes.body}>
        <ul className={classes.spec}>
          {isMobile && (
            <li>
              <div className={classes.label}>Name</div>
              <div className={classes.value}>
                <div className={classes.validatorName}>
                  <span />
                  {nodePubkey}
                </div>
              </div>
            </li>
          )}
          {map(renderSpec)(specs)}
        </ul>
        <div className={classes.map}>
          <ValidatorsMap markers={markers} />
        </div>
      </div>
    </Container>
  );
};

export default observer(ValidatorsDetail);
