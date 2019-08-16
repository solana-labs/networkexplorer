// @flow

import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {RouterHistory, withRouter} from 'react-router-dom';
import React from 'react';
import {map, propEq, eq} from 'lodash/fp';
import Mixpanel from 'v2/mixpanel';
import EndpointSelector from '../EndpointSelector';

import {ReactComponent as dashboard} from './assets/dashboard.svg';
import {ReactComponent as transactions} from './assets/transactions.svg';
import {ReactComponent as validators} from './assets/validators.svg';
import {ReactComponent as tourdesol} from './assets/tourdesol.svg';
import {ReactComponent as applications} from './assets/applications.svg';
import {ReactComponent as blocks} from './assets/blocks.svg';
import {ReactComponent as favorites} from './assets/favorites.svg';
import useStyles from './styles';

const icons = {
  dashboard,
  transactions,
  validators,
  tourdesol,
  applications,
  blocks,
  favorites,
};

const navTracks = {
  dashboard: 'Clicked Overview',
  transactions: 'Clicked Transactions Page',
  validators: 'Clicked Validators Page',
  tourdesol: 'Clicked TDS Page',
  applications: 'Clicked Applications page',
  blocks: 'Clicked Blocks page',
  favorites: 'Clicked Favorites page',
};

const NavBar = ({
  location,
  history,
  isOpen,
  toggleDrawer,
}: {
  location: Location,
  history: RouterHistory,
  isOpen: boolean,
  toggleDrawer: (val: boolean) => void,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showDrawer = useMediaQuery(theme.breakpoints.up('md'));
  const routes = [
    {
      link: 'dashboard',
    },
    {
      link: 'validators',
    },
    {
      link: 'tour-de-sol',
      icon: 'tourdesol',
      title: 'tour de sol',
    },
    {
      link: 'transactions',
      disabled: true,
    },
    {
      link: 'applications',
      disabled: true,
    },
    {
      link: 'blocks',
      disabled: true,
    },
    {
      link: 'favorites',
      disabled: true,
    },
  ];
  const renderLink = ({link, title, icon, disabled}: {link: string, title: string, icon: string, disabled?: boolean}) => {
    const Icon = icons[icon || link];
    const isDashboard = eq('dashboard', link);
    const selected =
      location.pathname.includes(link) ||
      (propEq('pathname', '/')(location) && isDashboard);
    const changeRoute = () => {
      Mixpanel.track(navTracks[link]);
      history.push(`/${isDashboard ? '' : link}`);
      toggleDrawer(false)();
    };
    return (
      <ListItem
        onClick={changeRoute}
        selected={selected}
        button
        component="a"
        key={link}
        disabled={disabled}
        classes={{root: classes.item, selected: classes.itemSelected}}
      >
        <ListItemIcon className={classes.icon}>
          <Icon />
        </ListItemIcon>
        <ListItemText
          classes={{primary: classes.itemText, root: classes.itemTextRoot}}
          primary={title || link}
        />
        {disabled && <div className={classes.coming}>Coming Soon</div>}
      </ListItem>
    );
  };

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        anchor={showDrawer ? 'left' : 'right'}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        variant={!showDrawer ? 'temporary' : 'permanent'}
        classes={{
          root: classes.drawerRoot,
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <IconButton
          onClick={toggleDrawer(false)}
          className={classes.menuButton}
        >
          <CloseIcon className={classes.menuIcon} fontSize="large" />
        </IconButton>
        <List component="div" classes={{root: classes.listRoot}}>
          {map(renderLink)(routes)}
          <div className={classes.endpointSelector}>
            <div className={classes.endpointSelectorTitle}>Network:</div>
            <EndpointSelector />
          </div>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default withRouter(NavBar);
