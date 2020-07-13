import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GroupWorkIcon from '@material-ui/icons/GroupWork';



const MainListItems = () =>
 (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>

      <ListItemText primary="Dashboard"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Projects" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <ConfirmationNumberIcon />
      </ListItemIcon>
      <ListItemText primary="My Tickets" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupWorkIcon />
      </ListItemIcon>
      <ListItemText primary="My Sprints" />
    </ListItem>
    
  </div>
);

export default MainListItems;