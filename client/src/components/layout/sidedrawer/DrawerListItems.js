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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';

const DrawerListItems = ({ sidedrawerClick }) => (
  <Fragment>
    <div className='main-list-items'>
      {/* If role is developer or manager, show developer/manager sidedrawer list */}
      
      <ListItem button onClick={() => sidedrawerClick('Dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem button onClick={() => sidedrawerClick('Projects')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary='My Projects' />
      </ListItem>
      <ListItem button onClick={() => sidedrawerClick('Tickets')}>
        <ListItemIcon>
          <ConfirmationNumberIcon />
        </ListItemIcon>
        <ListItemText primary='My Tickets' />
      </ListItem>
      <ListItem button onClick={() => sidedrawerClick('Sprints')}>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <ListItemText primary='My Sprints' />
      </ListItem>
      
    </div>

    <Divider />

    <div className='secondary-list-items'>
      <ListItem button onClick={() => sidedrawerClick('Submit Ticket')}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Submit Ticket' />
      </ListItem>

      <ListItem button onClick={() => sidedrawerClick('Profile Settings')}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Profile Settings' />
      </ListItem>

      <ListItem button onClick={() => sidedrawerClick('Logout')}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>


  {/* If role is admin, show admin sidedrawer list */}
    </div>
  </Fragment>
);

export default DrawerListItems;
