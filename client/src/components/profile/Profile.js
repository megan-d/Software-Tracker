import React, { useContext, useState, useEffect, Fragment } from 'react';
import Wrapper from '../layout/Wrapper';
import AlertBanner from '../layout/AlertBanner';
import {
  StyledRedLink,
  StyledGreyLink,
  StyledDeleteButton,
} from '../../styles/styledComponents/StyledLinks';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import Moment from 'react-moment';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProfileContext } from '../../context/profiles/ProfileContext';
import Spinner from '../layout/Spinner';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  fixedHeight: {
    minHeight: 250,
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  profileHeading: {
    fontWeight: 700,
    marginBottom: 16,
  },
  profileSubheading: {
    fontWeight: 700,
    marginBottom: 6,
  },
  profileContent: {
    marginBottom: 8,
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { user, deleteUser } = useContext(AuthContext);
  const {
    profile,
    profiles,
    getProfileById,
    isLoading,
    clearProfile,
  } = useContext(ProfileContext);

  //Load user profile on mount
  useEffect(() => {
    getProfileById(props.match.params.userid);
    return () => {
      clearProfile();
    };
  }, []);

  return (
    <Wrapper>
      <div className='flex'>
        <PersonIcon className='page-heading-icon' />
        <h2 className='page-heading'>Developer Profile</h2>
      </div>
      <hr className='hr'></hr>
      <AlertBanner />
      {(isLoading || profile === null) && <Spinner />}

      {!isLoading && profile ? (
        <Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <h4 className={classes.profileSubheading}>Name: </h4>
                <p className={classes.profileContent}>
                  {profile.user.firstName} {profile.user.lastName}
                </p>
                <h4 className={classes.profileSubheading}>Username: </h4>
                <p className={classes.profileContent}>
                  {profile.user.username}
                </p>
                {profile.bio && (
                  <Fragment>
                    <h4 className={classes.profileSubheading}>Bio:</h4>
                    <p className={classes.profileContent}>{profile.bio}</p>
                  </Fragment>
                )}

                <h4 className={classes.profileSubheading}>Date Joined: </h4>
                <Moment format='MM/DD/YYYY'>{moment(profile.created)}</Moment>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <h4 className={classes.profileSubheading}>My Technical Skills:</h4>
                {profile.skills.length > 0 && !isLoading ? (
                  <List aria-label='tech items'>
                    {profile.skills.map((el, index) => (
                      <Fragment key={index}>
                        <ListItem>
                          <ListItemAvatar>
                            <CheckCircleOutlineOutlinedIcon className='list-icon' />
                          </ListItemAvatar>
                          <ListItemText
                            primary={el}
                            style={{ fontSize: '14px' }}
                          />
                        </ListItem>
                        <Divider
                          variant='inset'
                          component='li'
                          style={{ listStyle: 'none' }}
                        />
                      </Fragment>
                    ))}
                  </List>
                ) : <p>No listed skills</p>}
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <ul className={classes.profileHeading}>Profile comments:</ul>
              {profile.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this profile</p>
          ) : profile.comments.length > 0 && isLoading ? (
            profile.comments.map((el, index) => 
            <li key={el._id}>{el.comment}</li>
            ))
             : ('')}
            </Paper>
          </Grid>

          
          <StyledGreyLink
            variant='contained'
            color='primary'
            to={`/profiles/comment/${user._id}`}
          >
            Comment
          </StyledGreyLink>

          {(user._id === profile.user._id || user.role === 'admin') && (
            <Fragment>
              <StyledGreyLink
                variant='contained'
                color='primary'
                to={`/profiles/updateprofile/${user._id}`}
              >
                Edit Profile
              </StyledGreyLink>

              <StyledDeleteButton
                style={{ minWidth: '230px' }}
                variant='contained'
                color='secondary'
                startIcon={<DeleteIcon />}
                onClick={async () => deleteUser(props.history)}
              >
                Delete Profile and Account
              </StyledDeleteButton>
            </Fragment>
          )}
        </Fragment>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default Profile;
