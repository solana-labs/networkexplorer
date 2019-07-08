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
import {map} from 'lodash/fp';
import nodesStore from 'v2/stores/nodes';
import MapTooltip from 'v2/components/UI/MapTooltip';
import {mapStyle, markerStyle} from 'v2/theme';

import useStyles from './styles';

const mapStyles = {
  default: mapStyle,
  hover: mapStyle,
  pressed: mapStyle,
};

const ValidatorsMap = () => {
  const classes = useStyles();
  const {mapMarkers} = nodesStore;

  const mapConfig = {
    projection: {
      scale: 150,
      rotation: [-11, 0, 0],
    },
    style: {
      width: '100%',
      height: 'auto',
    },
    center: [0, 20],
  };

  const renderMarker = marker => (
    <Marker key={marker.name} style={markerStyle} marker={marker}>
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
          style={{
            stroke: '#00FFAD',
          }}
        />
      </MapTooltip>
    </Marker>
  );
  return (
    <div className={classes.card}>
      <Typography>Active Validators Map</Typography>
      <ComposableMap
        projectionConfig={mapConfig.projection}
        width={690}
        height={410}
        style={mapConfig.style}
      >
        <ZoomableGroup center={mapConfig.center} disablePanning>
          <Geographies
            geography={`${process.env.PUBLIC_URL}/resources/world-50m-simplified.json`}
          >
            {(geographies, projection) =>
              geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      tabable={false}
                      geography={geography}
                      projection={projection}
                      style={mapStyles}
                    />
                  ),
              )
            }
          </Geographies>
          <Markers>{map(renderMarker)(mapMarkers)}</Markers>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default observer(ValidatorsMap);
