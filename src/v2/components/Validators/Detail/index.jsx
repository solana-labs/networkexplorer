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
import theme, {mapStyle, markerStyle} from 'v2/theme';
import MapTooltip from 'v2/components/UI/MapTooltip';
import HelpLink from 'v2/components/HelpLink';
import getColor from 'v2/utils/getColor';

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
  const {
    cluster: {voting, cluster},
  } = NodesStore;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {params} = match;
  const currentNode = find({pubkey: params.id})(cluster);
  if (!currentNode) {
    return <div>Loading...</div>;
  }
  const node = compose(
    mergeWith(currentNode, {
      coordinates: [currentNode.lng, currentNode.lat],
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
        <circle cx={0} cy={0} r={5} style={markerCircleStyle} />
      </MapTooltip>
    </Marker>
  );

  const specs = [
    {
      label: 'Website',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'Voting power',
      hint: '',
      value: `${node.stake}`,
    },
    {
      label: 'Address',
      hint: '',
      value: `${node.pubkey}`,
    },
    {
      label: 'Missed blocks',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'keybase',
      hint: '',
      value: 'TODO',
    },
    {
      label: 'commission',
      hint: '',
      value: `${node.commission}%`,
    },
    {
      label: 'details',
      hint: '',
      value: 'TODO',
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
      <div className={classes.value}>{value}</div>
    </li>
  );

  return (
    <Container>
      <div className={classes.root}>
        <SectionHeader title=" Validator Detail">
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
