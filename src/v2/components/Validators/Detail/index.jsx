// @flow
import {Container, useTheme} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React, {useEffect} from 'react';
import {map, find, eq} from 'lodash/fp';
import {Match} from 'react-router-dom';

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Markers,
  ZoomableGroup,
} from 'react-simple-maps';
import SectionHeader from 'v2/components/UI/SectionHeader';
import NodesStore from 'v2/stores/nodes';
import OverviewStore from 'v2/stores/networkOverview';
import {mapStyle, markerStyle} from 'v2/theme';
import MapTooltip from 'v2/components/UI/MapTooltip';
import HelpLink from 'v2/components/HelpLink';
import Button from 'v2/components/UI/Button';
import Avatar from 'v2/components/UI/Avatar';
import Mixpanel from 'v2/mixpanel';
import CopyBtn from 'v2/components/UI/CopyBtn';

import {LAMPORT_SOL_RATIO} from '../../../constants';
import useStyles from './styles';

const mapStyles = {
  default: mapStyle,
  hover: mapStyle,
  pressed: mapStyle,
};

const ValidatorsDetail = ({match}: {match: Match}) => {
  const {validators, inactiveValidators} = NodesStore;
  const {globalStats} = OverviewStore;

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

  if (!node) {
    return <div>Loading...</div>;
  }

  const {nodePubkey, gossip, activatedStake, commission, identity = {}} = node;

  const renderMarker = () => (
    <Marker
      style={markerStyle(eq(globalStats['!entLastLeader'], nodePubkey))}
      marker={node}
    >
      <MapTooltip
        classes={{tooltip: classes.tooltip}}
        title={() => (
          <>
            <div className={classes.tooltipTitle}>NODE: {nodePubkey}</div>
            <div className={classes.tooltipDesc}>Gossip: {gossip}</div>
          </>
        )}
      >
        <circle cx={0} cy={0} r={5} />
      </MapTooltip>
    </Marker>
  );

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
      label: 'Voting power',
      hint: '',
      value: (activatedStake * LAMPORT_SOL_RATIO).toFixed(8),
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
      label: 'Missed blocks',
      hint: '',
      value: 'TODO',
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
      label: 'commission',
      hint: '',
      value: `${(100 * (commission / 0xff)).toFixed(3)}%`,
    },
    {
      label: 'details',
      hint: '',
      value: identity.details || '',
    },
    {
      label: 'Amount of delegated sol',
      hint: '',
      value: 'TODO',
    },
  ];

  const mapConfig = {
    projection: {
      scale: 85,
      rotation: [-11, 0, 0],
    },
    style: {
      width: '100%',
      height: 'auto',
    },
    center: [0, 20],
  };

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
        <div>
          <ComposableMap
            projectionConfig={mapConfig.projection}
            width={390}
            height={240}
            style={mapConfig.style}
          >
            <ZoomableGroup center={mapConfig.center} disablePanning>
              <Geographies
                geography={`${process.env.PUBLIC_URL}/resources/world-50m-simplified.json`}
              >
                {(geographies, projection) =>
                  geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      tabable={false}
                      geography={geography}
                      projection={projection}
                      style={mapStyles}
                    />
                  ))
                }
              </Geographies>
              <Markers>{node.coordinates && renderMarker()}</Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </Container>
  );
};

export default observer(ValidatorsDetail);
