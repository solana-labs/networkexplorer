// @flow

import {Select, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {map} from 'lodash/fp';
import Logo from 'v2/components/UI/Logo';
import Search from 'v2/components/Search';
import socketActions from 'v2/stores/socket';
import {updateBaseUrl} from 'v2/api';

import * as EndpointConfig from '../../../EndpointConfig';
import NavBar from '../NavBar';
import {ReactComponent as LiveIcon} from './assets/liveIcon.svg';
import useStyles from './styles';

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const {endpointName, updateEndpointName} = socketActions;
  const classes = useStyles();
  const onSearch = () => {};
  const handleEndpointChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const endpointName = event.currentTarget.value;
    EndpointConfig.setEndpointName(endpointName);
    updateEndpointName(endpointName);
    socketActions.init();
    updateBaseUrl();
  };
  const endPointsList = EndpointConfig.getEndpoints();
  const renderEndpointOption = endpoint => (
    <option key={endpoint.name} value={endpoint.name}>
      {endpoint.friendlyName}
    </option>
  );

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar className={classes.root} position="fixed" color="secondary">
        <Toolbar classes={{root: classes.inner}}>
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
          <Select
            className={classes.networkSelect}
            value={endpointName}
            onChange={handleEndpointChange}
            native
          >
            {map(renderEndpointOption)(endPointsList)}
          </Select>
          <IconButton
            onClick={toggleDrawer(!isDrawerOpen)}
            className={classes.menuButton}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavBar toggleDrawer={toggleDrawer} isOpen={isDrawerOpen} />
    </>
  );
};

export default observer(Header);
