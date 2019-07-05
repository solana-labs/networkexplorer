import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import MoreIcon from '@material-ui/icons/MoreVert';
import Switch from '@material-ui/core/Switch';
import {getMetricsDashboardUrl} from '../EndpointConfig';

class Bx2AppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleDashboard = event => {
    window.open(getMetricsDashboardUrl());
  };

  handleMap = event => {
    if (this.props.handleMap) {
      this.props.handleMap(event);
    }
  };

  handleSearch = event => {
    if (this.props.handleSearch) {
      this.props.handleSearch(event);
    }
  };

  handleSwitch = event => {
    if (this.props.handleSwitch) {
      this.props.handleSwitch(event);
    }
  };

  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({mobileMoreAnchorEl: event.currentTarget});
  };

  handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl: null});
  };

  render() {
    const {anchorEl, mobileMoreAnchorEl} = this.state;
    const {classes} = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      ></Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Grid container justify="center">
            <Grid item style={{width: '1520px'}}>
              <Toolbar>
                <Typography
                  className={classes.title}
                  variant="h6"
                  color="inherit"
                  noWrap
                >
                  <a href="https://solana.com" target="_new">
                    <img
                      src="/solana.svg"
                      alt="Solana Logo"
                      style={{width: '54px'}}
                    />
                  </a>
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onKeyPress={ev => {
                      if (ev.key === 'Enter') {
                        this.handleSearch(ev);
                        ev.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton color="inherit" onClick={this.handleDashboard}>
                    <DashboardIcon />
                  </IconButton>
                  <IconButton color="inherit" onClick={this.handleMap}>
                    <MapIcon />
                  </IconButton>
                  <Switch
                    checked={this.props.enabled}
                    onChange={this.handleSwitch}
                    color="secondary"
                    title={
                      (this.props.enabled ? 'Pause' : 'Resume') +
                      ' realtime updates'
                    }
                  />
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </Grid>
          </Grid>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Bx2AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Bx2AppBar;
