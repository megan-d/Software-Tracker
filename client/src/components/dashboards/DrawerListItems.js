import React, { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import Divider from '@material-ui/core/Divider';

const DrawerListItems = ({ sidedrawerClick }) => (
  <Fragment>
    <div className='main-list-items'>
      <ListItem button onClick={() => sidedrawerClick('dashboardHome')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>

        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem button onClick={() => sidedrawerClick('projects')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='My Projects' />
      </ListItem>
      <ListItem button onClick={() => sidedrawerClick('tickets')}>
        <ListItemIcon>
          <ConfirmationNumberIcon />
        </ListItemIcon>
        <ListItemText primary='My Tickets' />
      </ListItem>
      <ListItem button onClick={() => sidedrawerClick('sprints')}>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <ListItemText primary='My Sprints' />
      </ListItem>
    </div>

    <Divider />

    <div className='secondary-list-items'>
      <ListItem button onClick={() => sidedrawerClick('submit')}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Submit Ticket' />
      </ListItem>

      <ListItem button onClick={() => sidedrawerClick('profile')}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Profile Settings' />
      </ListItem>
    </div>
  </Fragment>
);

export default DrawerListItems;
