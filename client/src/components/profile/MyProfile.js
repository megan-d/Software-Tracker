import React, { useContext, useState, useEffect, Fragment } from 'react';
import Wrapper from '../layout/Wrapper';
import AlertBanner from '../layout/AlertBanner';
import moment from 'moment';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProfileContext } from '../../context/profiles/ProfileContext';
import {
  StyledRedLink,
  StyledGreyLink,
  StyledDeleteButton,
} from '../../styles/styledComponents/StyledLinks';
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

// function ListItemLink(props) {
//   return <ListItem button component='a' {...props} />;
// }

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
      <h2 className='page-heading'>Developer Profile</h2>
      <hr className='hr'></hr>
      <AlertBanner />
      {(isLoading || profile === null) && <Spinner />}

      {!isLoading && profile ? (
        <Fragment>
          <p>
            {profile.user.firstName} {profile.user.lastName}
          </p>
          <p>Username: {profile.user.username}</p>
          <p>Bio: {profile.bio}</p>
          <p>
            Date joined:{' '}
            <Moment format='MM/DD/YYYY'>{moment(profile.created)}</Moment>
          </p>

          <List aria-label='tech items'>
            My technical skills:
            {profile.skills.map((el, index) => (
              <Fragment>
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={el} />
                </ListItem>
                <Divider
                  variant='inset'
                  component='li'
                  style={{ listStyle: 'none' }}
                />
              </Fragment>
            ))}
          </List>
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
              <p>
                Select the button below to delete your profile AND account.
                Warning: This cannot be undone.{' '}
              </p>
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
        <div>
          <p>Please click the button below to create a profile.</p>
          <StyledGreyLink to={'/createprofile'}>Create Profile</StyledGreyLink>
        </div>
      )}
    </Wrapper>
  );
};

export default MyProfile;
