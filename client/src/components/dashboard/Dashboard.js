import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import PopMenu from '../layout/PopMenu';
import SideDrawer from '../layout/sidedrawer/SideDrawer';
import DeveloperDashboard from './developer/DeveloperDashboard';
import Projects from '../dashboard/projects/Projects';
import Tickets from '../dashboard/tickets/Tickets';
import Sprints from '../dashboard/sprints/Sprints';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#ad3968',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

//Set up test user before database is set up
const user = {
  name: 'Luke',
  email: 'luke@demo.com',
  password: '123',
  role: 'developer',
  date: Date.now(),
};

const manager = {
  name: 'Cindy',
  email: 'cindy@demo.com',
  password: '123',
  role: 'manager',
  date: Date.now(),
};

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dashboardComponent, setDashboardComponent] = useState('Dashboard');

  const handleSideDrawerClick = (clicked) => {
    setDashboardComponent(clicked);
  };

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            {dashboardComponent}
          </Typography>
          <PopMenu />
        </Toolbar>
      </AppBar>
      <SideDrawer
        sidedrawerClick={handleSideDrawerClick}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          {/* If role is developer, show developer dashboard. If admin, show admin. If manager, show manager. */}
          {user.role === 'developer' && dashboardComponent === 'Dashboard' ? (
            <DeveloperDashboard />
          ) : user.role === 'developer' && dashboardComponent === 'Projects' ? (
            <Projects />
          ) : user.role === 'developer' && dashboardComponent === 'Tickets' ? (
            <Tickets />
          ) : user.role === 'developer' && dashboardComponent === 'Sprints' ? (
            <Sprints />
          ) : <h4>Access denied. Please login or sign up.</h4>}

          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  );
}
