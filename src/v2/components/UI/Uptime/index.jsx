// @flow
import React from 'react';

import useStyles from './styles';

const Uptime = ({
  lastEpochUptimePercent,
  cumulativeUptimePercent,
  uptimeEpochs,
  uptimeComplete,
}: {
  lastEpochUptimePercent: number,
  cumulativeUptimePercent: number,
  uptimeEpochs: number,
  uptimeComplete: boolean,
}) => {
  const classes = useStyles();

  const uptimeDescription =
    lastEpochUptimePercent &&
    cumulativeUptimePercent &&
    uptimeEpochs &&
    `Last Epoch Uptime: ${lastEpochUptimePercent.toFixed(
      1,
    )}%; Recent Cumulative Uptime: ${cumulativeUptimePercent.toFixed(
      3,
    )}%; Epochs: ${uptimeEpochs}`;

  const uptimeDisplay =
    (cumulativeUptimePercent &&
      `${cumulativeUptimePercent.toFixed(cumulativeUptimePercent ? 4 : 2)}%`) ||
    'Unavailable';

  return (
    <div className={classes.root} title={uptimeDescription}>
      {uptimeDisplay}
      {!uptimeComplete && (
        <span
          title={`NOTE: Uptime calculation only contains ${uptimeEpochs} epochs`}
        >
          ***
        </span>
      )}
    </div>
  );
};

export default Uptime;
