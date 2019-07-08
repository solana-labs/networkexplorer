// @flow

import {Drawer, List, ListItem, ListItemIcon} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
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
}: {
  location: Location,
  history: RouterHistory,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const showDriver = useMediaQuery(theme.breakpoints.up('md'));
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
      propEq('pathname', `/${link}`)(location) ||
      (propEq('pathname', '/')(location) && isDashboard);
    const changeRoute = () => history.push(`/rc/${isDashboard ? '' : link}`);
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
      </ListItem>
    );
  };
  return (
    <div className={classes.root}>
      <Drawer
        variant={!showDriver ? 'temporary' : 'permanent'}
        classes={{
          root: classes.drawerRoot,
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List component="div">{map(renderLink)(routes)}</List>
      </Drawer>
    </div>
  );
};

export default withRouter(NavBar);
