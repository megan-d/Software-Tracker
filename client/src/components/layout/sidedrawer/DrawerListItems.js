import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import { AuthContext } from '../../../context/auth/AuthContext';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const DrawerListItems = ({ sidedrawerClick }) => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <Fragment>
      <div className='main-list-items'>
        {/* If role is developer or manager, show developer/manager sidedrawer list */}

        <StyledLink
          to='/dashboard'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </StyledLink>

        <StyledLink to='/projects'>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Projects' />
          </ListItem>
        </StyledLink>

        <StyledLink to='/tickets'>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary='My Assigned Tickets' />
          </ListItem>
        </StyledLink>

        <StyledLink to='/sprints'>
          <ListItem button>
            <ListItemIcon>
              <GroupWorkIcon />
            </ListItemIcon>
            <ListItemText primary='My Assigned Sprints' />
          </ListItem>
        </StyledLink>
      </div>

      <Divider />

      <div className='secondary-list-items'>
        {/* <StyledLink to='/submit'>
    <ListItem button>
    <ListItemIcon>
    <AddCircleIcon />
    </ListItemIcon>
    <ListItemText primary='Submit Ticket' />
    </ListItem>
    </StyledLink>  */}

        <StyledLink to='/profile'>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary='My Profile' />
          </ListItem>
        </StyledLink>

        <StyledLink to='/' onClick={logoutUser}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </StyledLink>

        {/* If role is admin, show admin sidedrawer list */}
      </div>
    </Fragment>
  );
};

export default DrawerListItems;
