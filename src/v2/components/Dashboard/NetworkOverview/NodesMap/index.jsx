import {Typography} from '@material-ui/core';
import {observer} from 'mobx-react-lite';
import React from 'react';
import NodesStore from 'v2/stores/nodes';
import Socket from 'v2/stores/socket';
import Loader from 'v2/components/UI/Loader';
import ValidatorsMap from 'v2/components/ValidatorsMap';

import useStyles from './styles';

const NodesMap = () => {
  const classes = useStyles();
  const {validators} = NodesStore;
  const {isLoading} = Socket;
  if (isLoading) {
    return <Loader width="533" height="290" />;
  }

  return (
    <div className={classes.card} style={{height: '100%'}}>
      <Typography className={classes.mapTitle}>
        Active Validators Map
      </Typography>
      <ValidatorsMap markers={validators} />
    </div>
  );
};

export default observer(NodesMap);
