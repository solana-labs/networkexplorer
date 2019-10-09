// @flow
import React from 'react';
import MapTooltip from 'v2/components/UI/MapTooltip';
import Avatar from 'v2/components/UI/Avatar';

import useStyles from './styles';

const Marker = ({scale, marker}: {scale: number, marker: any}) => {
  const classes = useStyles();
  const transformScale = scale < 4 ? scale / 4 : 1;
  return (
    <MapTooltip
      classes={{tooltip: classes.tooltip}}
      title={() => (
        <>
          <div className={classes.tooltipTitle}>NODE: {marker.name}</div>
          <div className={classes.tooltipDesc}>Gossip: {marker.gossip}</div>
        </>
      )}
    >
      <div
        className={classes.marker}
        style={{transform: `scale(${transformScale})`}}
      >
        <Avatar
          width={40}
          height={40}
          avatarUrl={marker.avatarUrl}
          name={marker.name}
          pubkey={marker.pubkey}
        />
      </div>
    </MapTooltip>
  );
};

export default Marker;
