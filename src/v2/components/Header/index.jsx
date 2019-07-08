// @flow

import Select from '@material-ui/core/Select';
import React from 'react';
import {observer} from 'mobx-react-lite';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from 'v2/components/UI/Logo';
import Search from 'v2/components/Search';
import socketActions from 'v2/stores/socket';
import {map} from 'lodash/fp';

import * as EndpointConfig from '../../../EndpointConfig';
import {ReactComponent as LiveIcon} from './assets/liveIcon.svg';
import useStyles from './styles';

const Header = () => {
  const {endpointName, updateEndpointName} = socketActions;
  const classes = useStyles();
  const onSearch = () => {};
  const handleEndpointChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const endpointName = event.currentTarget.value;
    EndpointConfig.setEndpointName(endpointName);
    updateEndpointName(endpointName);
    socketActions.init();
  };
  const endPointsList = EndpointConfig.getEndpoints();
  const renderEndpointOption = endpoint => (
    <option key={endpoint} value={endpoint}>
      {endpoint}
    </option>
  );
  return (
    <AppBar className={classes.root} position="fixed" color="secondary">
      <Toolbar>
        <Logo />
        <div className={classes.search}>
          <Search onSubmit={onSearch} />
        </div>
        <div className={classes.realTime}>
          <p>Real-time updated:</p>
          <div>
            Every 5 sec <LiveIcon />
          </div>
        </div>
        <Select value={endpointName} onChange={handleEndpointChange} native>
          {map(renderEndpointOption)(endPointsList)}
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Header);
