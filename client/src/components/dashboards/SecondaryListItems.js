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
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SecondaryListItems = () =>
 (
    <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader> */}
    <Link to='/submit' style={{ textDecoration: 'none', color: 'black' }}>
    <ListItem button>
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Submit Ticket" />
    </ListItem>
    </Link>
    
    <Link to='/settings' style={{ textDecoration: 'none', color: 'black'  }}>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Profile Settings" />
    </ListItem>
    </Link>
    
  </div>
);

export default SecondaryListItems;