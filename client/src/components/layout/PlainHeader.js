import React, { useContext, Fragment } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../context/auth/AuthContext';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
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
    background: '#204051',
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

const PlainHeader = (props) => {
  const classes = useStyles();

  const { isAuthenticated, logoutUser, isLoading } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            <StyledLink
              to='/'
              style={{ fontFamily: 'Caveat, cursive', fontSize: '30px' }}
            >
              --DASH-->
            </StyledLink>
          </Typography>

          {!isLoading && (
            <Fragment>
              {isAuthenticated ? (
                <Fragment>
                  <Button color='inherit' href='/dashboard'>
                    My Dashboard
                  </Button>
                  <Button color='inherit' href='/profiles'>
                    Developers
                  </Button>
                  <Button color='inherit' href='/forum'>
                    Forum
                  </Button>
                  <Button color='inherit' onClick={logoutUser}>
                    Logout
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Button color='inherit' href='/login'>
                    Login
                  </Button>
                  <Button color='inherit' href='/register'>
                    Register
                  </Button>
                  <Button color='inherit' href='/'>
                    Demo
                  </Button>
                </Fragment>
              )}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PlainHeader;
