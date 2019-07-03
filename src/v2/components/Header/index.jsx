// @flow

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from 'v2/components/UI/Logo';
import Search from 'v2/components/Search';

import {ReactComponent as LiveIcon} from './assets/liveIcon.svg';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();
  const onSearch = () => {};
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
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {};

export default Header;
