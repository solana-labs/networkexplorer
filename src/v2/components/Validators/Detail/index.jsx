// @flow
import {Container, useTheme} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React from 'react';
import {map, find, compose, mergeWith} from 'lodash/fp';
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
import {mapStyle, markerStyle} from 'v2/theme';
import MapTooltip from 'v2/components/UI/MapTooltip';
import Bx2HelpLink from 'v2/Bx2HelpLink';

import useStyles from './styles';

const mapStyles = {
  default: mapStyle,
  hover: mapStyle,
  pressed: mapStyle,
};

const ValidatorsDetail = ({match}: {match: Match}) => {
  const {
    cluster: {voting, cluster},
  } = NodesStore;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {params} = match;
  const currentCluster = find({pubkey: params.id})(cluster);
  if (!currentCluster) {
    return <div>Loading...</div>;
  }
  const node = compose(
    mergeWith(currentCluster, {
      coordinates: [currentCluster.lng, currentCluster.lat],
    }),
    find({nodePubkey: params.id}),
  )(voting);

  const renderMarker = () => (
    <Marker style={markerStyle} marker={node}>
      <MapTooltip
        classes={{tooltip: classes.tooltip}}
        title={() => (
          <>
            <div className={classes.tooltipTitle}>NODE: {node.nodePubkey}</div>
            <div className={classes.tooltipDesc}>Gossip: {node.gossip}</div>
          </>
        )}
      >
        <circle
          cx={0}
          cy={0}
          r={5}
          style={{
            stroke: '#00FFAD',
          }}
        />
      </MapTooltip>
    </Marker>
  );

  const specs = [
    {
      label: 'Website',
      hint: '',
      value: 'solana.com',
    },
    {
      label: 'voting power',
      hint: '',
      value: '286,431',
    },
    {
      label: 'Address',
      hint: '',
      value: 'cosmos1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u0tvx7u',
    },
    {
      label: 'Missed blocks',
      hint: '',
      value: '43',
    },
    {
      label: 'keybase',
      hint: '',
      value: 'A21D897660B856AC',
    },
    {
      label: 'commission',
      hint: '',
      value: `${node.commission}%`,
    },
    {
      label: 'details',
      hint: '',
      value:
        'Operated by Chris Remus (Twitter @cjremus) / Validating since the Validator Working Group formed in October 2017',
    },
    {
      label: 'Amount of delegated sol',
      hint: '',
      value: '5.47%',
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
        <Bx2HelpLink />
      </div>
      <div className={classes.value}>{value}</div>
    </li>
  );

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader>
          Validator Detail
          {!isMobile && (
            <div className={classes.validatorName}>
              <span />
              {node.nodePubkey}
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
                    {node.nodePubkey}
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
