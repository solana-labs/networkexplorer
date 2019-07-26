// @flow
import {Container, useTheme} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React, {useEffect} from 'react';
import {map, find} from 'lodash/fp';
import {Match} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
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
import theme, {mapStyle, markerStyle} from 'v2/theme';
import MapTooltip from 'v2/components/UI/MapTooltip';
import HelpLink from 'v2/components/HelpLink';
import getColor from 'v2/utils/getColor';
import Button from 'v2/components/UI/Button';
import Avatar from 'v2/components/UI/Avatar';

import {ReactComponent as CopyIcon} from '../../../assets/icons/copy.svg';
import Mixpanel from '../../../mixpanel';
import useStyles from './styles';

const mapStyles = {
  default: mapStyle,
  hover: mapStyle,
  pressed: mapStyle,
};

const markerCircleStyle = {
  stroke: getColor('main')(theme),
};

const ValidatorsDetail = ({match}: {match: Match}) => {
  const {validators} = NodesStore;

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {params} = match;

  useEffect(() => {
    Mixpanel.track(`Clicked Validator ${params.id}`);
  }, [params.id]);

  const node = find({nodePubkey: params.id})(validators);

  if (!node) {
    return <div>Loading...</div>;
  }

  const {nodePubkey, gossip, stake, commission, identity = {}} = node;

  const renderMarker = () => (
    <Marker style={markerStyle} marker={node}>
      <MapTooltip
        classes={{tooltip: classes.tooltip}}
        title={() => (
          <>
            <div className={classes.tooltipTitle}>NODE: {nodePubkey}</div>
            <div className={classes.tooltipDesc}>Gossip: {gossip}</div>
          </>
        )}
      >
        <circle cx={0} cy={0} r={5} style={markerCircleStyle} />
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
            <CopyToClipboard text={nodePubkey}>
              <div>
                <CopyIcon />
              </div>
            </CopyToClipboard>
          </div>
        );
      },
    },
    {
      label: 'Voting power',
      hint: '',
      value: stake,
    },
    {
      label: 'Website',
      hint: '',
      value() {
        return identity.website ? (
          <a href={identity.website}>{identity.website}</a>
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
          <a href={`https://keybase.io/${identity.keybaseUsername}`}>
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
      value: `${commission}%`,
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
      <div className={classes.root}>
        <SectionHeader title="Validator Detail">
          {!isMobile && (
            <div className={classes.validatorName}>
              <Avatar name={identity.name} avatarUrl={identity.avatarUrl} />
              <span>{identity.name || nodePubkey}</span>
            </div>
          )}
          <div className={classes.headerBtn}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              href="https://github.com/solana-labs/tour-de-sol#validator-public-key-registration"
            >
              Connect To Keybase
            </Button>
          </div>
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
                <Markers>{renderMarker()}</Markers>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default observer(ValidatorsDetail);
