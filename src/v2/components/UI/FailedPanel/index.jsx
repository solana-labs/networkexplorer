import {Typography} from '@material-ui/core';
import React from 'react';
import {ReactComponent as WarnIcon} from 'v2/assets/icons/warn.svg';

import useStyles from './styles';

const FailedPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <WarnIcon fill="#f71ef4" />
        <Typography className={classes.text}>
          Data currently unavailable. Report issues on{' '}
          <a
            href="https://github.com/solana-labs/networkexplorer/issues"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default FailedPanel;
