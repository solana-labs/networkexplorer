import React from 'react';
import PropTypes from 'prop-types';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {Link} from 'react-router-dom';

class Bx2NavDrawer extends React.Component {
  render() {
    //const {classes} = this.props;

    return (
      <Drawer variant="permanent">
        <List>
          <ListItem button key="Browse" component={Link} to="/v2/browse">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Browse" />
          </ListItem>
          <ListItem
            button
            key="Transactions"
            component={Link}
            to="/v2/transactions"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
          <ListItem
            button
            key="Validators"
            component={Link}
            to="/v2/validators"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Validators" />
          </ListItem>
          <ListItem button key="TourDeSol" component={Link} to="/v2/tourdesol">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Tour De Sol" />
          </ListItem>
          <ListItem
            button
            key="Applications"
            component={Link}
            to="/v2/applications"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItem>
          <ListItem button key="Blocks" component={Link} to="/v2/blocks">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Blocks" />
          </ListItem>
          <ListItem button key="Favorites" component={Link} to="/v2/favorites">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

Bx2NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Bx2NavDrawer;
