import {Typography} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Markers,
  ZoomableGroup,
} from 'react-simple-maps';
import {eq, map} from 'lodash/fp';
import NodesStore from 'v2/stores/nodes';
import OverviewStore from 'v2/stores/networkOverview';
import Socket from 'v2/stores/socket';
import MapTooltip from 'v2/components/UI/MapTooltip';
import {mapStyle, markerStyle} from 'v2/theme';

import Loader from '../../Loader';
import useStyles from './styles';

const mapStyles = {
  default: mapStyle,
  hover: mapStyle,
  pressed: mapStyle,
};

const NodesMap = () => {
  const classes = useStyles();
  const {mapMarkers} = NodesStore;
  const {globalStats} = OverviewStore;
  const {isLoading} = Socket;

  if (isLoading) {
    return <Loader />;
  }

  const mapConfig = {
    projection: {
      scale: 85,
      rotation: [-11, 0, 0],
    },
    style: {
      width: '100%',
    },
    center: [0, 20],
  };

  const renderMarker = marker => (
    <Marker
      key={marker.name}
      style={markerStyle(eq(globalStats['!entLastLeader'], marker.name))}
      marker={marker}
    >
      <MapTooltip
        classes={{tooltip: classes.tooltip}}
        title={() => (
          <>
            <div className={classes.tooltipTitle}>NODE: {marker.name}</div>
            <div className={classes.tooltipDesc}>Gossip: {marker.gossip}</div>
          </>
        )}
      >
        <circle
          cx={0}
          cy={0}
          r={5}
        />
      </MapTooltip>
    </Marker>
  );
  return (
    <div className={classes.card}>
      <Typography>Nodes Map</Typography>
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
          <Markers>{map(renderMarker)(mapMarkers)}</Markers>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default observer(NodesMap);
