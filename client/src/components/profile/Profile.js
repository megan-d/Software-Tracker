import React, { useContext, useState, useEffect, Fragment } from 'react';
import Wrapper from '../layout/Wrapper';
import AlertBanner from '../layout/AlertBanner';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProfileContext } from '../../context/profiles/ProfileContext';
import Spinner from '../layout/Spinner';

const Profile = (props) => {
  const { user } = useContext(AuthContext);
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
      <p>PROFILE</p>
      <AlertBanner />
      {!profile && isLoading ? (
        <Spinner />
      ) : profile && !isLoading ? (
        <Fragment>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>Username: {user.username}</p>
          <p>Bio: {profile.bio}</p>
        </Fragment>
      ) : (
        <div>
          <p>Please click the button below to create a profile.</p>
          <Link to={'/createprofile'}>Create Profile</Link>
        </div>
      )}
    </Wrapper>
  );
};

export default Profile;
