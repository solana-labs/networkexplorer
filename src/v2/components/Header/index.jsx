// @flow

import {AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useState} from 'react';
import {observer} from 'mobx-react-lite';
import Logo from 'v2/components/UI/Logo';
import Search from 'v2/components/Search';
import EndpointSelector from 'v2/components/EndpointSelector';
import {ReactComponent as GithubIcon} from 'v2/assets/icons/github.svg';

import NavBar from '../NavBar';
import useStyles from './styles';

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();
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
            <Search />
          </div>
          <div className={classes.github}>
            <p>
              report issues/
              <br />
              feedback on github:
            </p>
            <a
              className={classes.icon}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/solana-labs/blockexplorer/issues"
            >
              <GithubIcon />
            </a>
          </div>
          <div className={classes.realTime}>
            <p>
              Real-time
              <br /> updates:
            </p>
            <div>Every 5 sec</div>
          </div>
          <div className={classes.endpointSelector}>
            <div className={classes.selectTitle}>Cluster:</div>
            <EndpointSelector />
          </div>
          <IconButton
            onClick={toggleDrawer(!isDrawerOpen)}
            className={classes.menuButton}
          >
            <MenuIcon className={classes.menuIcon} fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavBar toggleDrawer={toggleDrawer} isOpen={isDrawerOpen} />
    </>
  );
};

export default observer(Header);
