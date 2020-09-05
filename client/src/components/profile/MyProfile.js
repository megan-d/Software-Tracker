import React, { useContext, useState, useEffect, Fragment } from 'react';
import Wrapper from '../layout/Wrapper';
import AlertBanner from '../layout/AlertBanner';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProfileContext } from '../../context/profiles/ProfileContext';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Spinner from '../layout/Spinner';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledGreyLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #808080;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  width: 160px;
  max-width: 160px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0px;
  display: block;
  height: 40px;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const StyledRedLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #f50757;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  width: 80px;
  max-width: 160px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  height: 40px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}

const MyProfile = (props) => {
  const classes = useStyles();
  const { user, deleteUser } = useContext(AuthContext);
  const {
    profile,
    profiles,
    getCurrentUserProfile,
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
      <h2>Developer Profile</h2>
      <hr></hr>
      <AlertBanner />
      {(isLoading || profile === null) && <Spinner />}

      {!isLoading && profile ? (
        <Fragment>
          <p>
            {profile.user.firstName} {profile.user.lastName}
          </p>
          <p>Username: {profile.user.username}</p>
          <p>Bio: {profile.bio}</p>
          <div className={classes.root}>
            <List component='h3' aria-label='tech items'>
              My technical skills:
              {profile.skills.map((el, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={el} />
                </ListItem>
              ))}
            </List>
          </div>
          <ul>Profile comments:</ul>
          {profile.comments.length === 0 && !isLoading ? (
            <li>There are no comments for this profile</li>
          ) : (
            profile.comments.map((el) => <li key={el._id}>{el.comment}</li>)
          )}
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

              <Button
                variant='contained'
                color='secondary'
                startIcon={<DeleteIcon />}
                onClick={async () => deleteUser(props.history)}
              >
                Delete Profile and Account
              </Button>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <div>
          <p>Please click the button below to create a profile.</p>
          <StyledGreyLink to={'/createprofile'}>Create Profile</StyledGreyLink>
        </div>
      )}
    </Wrapper>
  );
};

export default MyProfile;
