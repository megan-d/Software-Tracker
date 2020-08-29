import React, { useContext, useState, useEffect, Fragment } from 'react';
import Wrapper from '../layout/Wrapper';
import AlertBanner from '../layout/AlertBanner';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { ProfileContext } from '../../context/profiles/ProfileContext';
import Spinner from '../layout/Spinner';
import styled from 'styled-components';

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
      {isLoading ? (
        <Spinner />
      ) : !profile && isLoading ? (
        <Spinner />
      ) : !profile && !isLoading ? (<div>
        <p>Please click the button below to create a profile.</p>
        <StyledGreyLink to={'/createprofile'}>Create Profile</StyledGreyLink>
      </div>) : profile && !isLoading ? (
        <Fragment>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>Username: {user.username}</p>
          <p>Bio: {profile.bio}</p>
          <ul>My Technical Skills:</ul>
          {profile.skills.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </Fragment>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default Profile;
