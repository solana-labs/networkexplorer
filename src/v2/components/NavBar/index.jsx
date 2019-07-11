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

import {ReactComponent as dashboard} from './assets/dashboard.svg';
import {ReactComponent as transactions} from './assets/transactions.svg';
import {ReactComponent as validators} from './assets/validators.svg';
import {ReactComponent as tourDeSol} from './assets/tour-de-sol.svg';
import {ReactComponent as applications} from './assets/applications.svg';
import {ReactComponent as blocks} from './assets/blocks.svg';
import {ReactComponent as favorites} from './assets/favorites.svg';
import useStyles from './styles';

const icons = {
  dashboard,
  transactions,
  validators,
  'tour-de-sol': tourDeSol,
  applications,
  blocks,
  favorites,
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
    'dashboard',
    'transactions',
    'validators',
    'tour-de-sol',
    'applications',
    'blocks',
    'favorites',
  ];
  const renderLink = link => {
    const Icon = icons[link];
    const isDashboard = eq('dashboard', link);
    const selected =
      location.pathname.includes(link) ||
      (propEq('pathname', '/rc/')(location) && isDashboard);
    const changeRoute = () => {
      if (selected) {
        return;
      }
      history.push(`/rc/${isDashboard ? '' : link}`);
    };
    return (
      <ListItem
        onClick={changeRoute}
        selected={selected}
        button
        component="a"
        key={link}
        className={classes.item}
      >
        <ListItemIcon className={classes.icon}>
          <Icon />
        </ListItemIcon>
        <ListItemText classes={{primary: classes.itemText}} primary={link} />
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
          <CloseIcon fontSize="large" />
        </IconButton>
        <List component="div">{map(renderLink)(routes)}</List>
      </SwipeableDrawer>
    </div>
  );
};

export default withRouter(NavBar);
