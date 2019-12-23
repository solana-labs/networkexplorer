// @flow
import React from 'react';
import MapTooltip from 'v2/components/UI/MapTooltip';
import Avatar from 'v2/components/UI/Avatar';
import ValidatorName from 'v2/components//UI/ValidatorName';

import useStyles from './styles';
import Uptime from '../UI/Uptime';

const Marker = ({scale, marker}: {scale: number, marker: any}) => {
  const classes = useStyles();
  const transformScale = scale < 4 ? scale / 4 : 1;
  const {
    nodePubkey,
    identity = {},
    calcCommission,
    uptimeStats,
    stakedSol,
    stakedSolPercent,
  } = marker;
  const {
    lastEpochUptimePercent,
    cumulativeUptimePercent,
    uptimeEpochs,
    uptimeComplete,
  } = uptimeStats || {};
  return (
    <MapTooltip
      classes={{tooltip: classes.tooltip}}
      title={() => (
        <div className={classes.inner}>
          <ValidatorName
            pubkey={nodePubkey}
            name={identity.name}
            avatar={identity.avatarUrl}
          />
          <div className={classes.info}>
            <div>
              Total Sol:{' '}
              {stakedSol ? `${stakedSol} (${stakedSolPercent}%)` : 'N/A'}
            </div>
            <div>
              Commission: {calcCommission ? `${calcCommission}%` : 'N/A'}
            </div>
            <div>
              {' '}
              Uptime:{' '}
              <Uptime
                lastEpochUptimePercent={lastEpochUptimePercent}
                cumulativeUptimePercent={cumulativeUptimePercent}
                uptimeEpochs={uptimeEpochs}
                uptimeComplete={uptimeComplete}
              />
            </div>
          </div>
        </div>
      )}
    >
      <div
        className={classes.marker}
        style={{transform: `scale(${transformScale})`}}
      >
        <Avatar
          width={40}
          height={40}
          avatarUrl={identity.avatarUrl}
          name={identity.name}
          pubkey={nodePubkey}
        />
      </div>
    </MapTooltip>
  );
};

export default Marker;
