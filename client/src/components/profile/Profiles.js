import React, { useEffect, useContext, Fragment } from 'react';
import { ProfileContext } from '../../context/profiles/ProfileContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import Wrapper from '../layout/Wrapper';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import styled from 'styled-components';

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: white;
  background: grey;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 100px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
`;

const Profiles = (props) => {
  const {
    profiles,
    profile,
    isLoading,
    getProfiles,
    clearProfile,
    clearProfiles,
  } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getProfiles();
    return () => clearProfiles();
  }, []);

  const colors = [
    'orange',
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'black',
    'pink',
    'lightgreen',
  ];

  // let history = useHistory();

  // //Get projects where user is the manager or owner and put them under "My Projects"
  // let myProjects = projects.filter(
  //   (el) => el.owner === user._id,
  // );
  // let managing = projects.filter((el) => el.manager === user._id && el.owner !== user._id);
  // //Get projects where user is a collaborating developer and put them under "Projects I'm collaborating on"
  // let collaboratingProjects = projects.filter((el) => el.developers.some((developer) => developer === user._id));
  // let collabProjects = collaboratingProjects.filter((el) => el.owner !== user._id);

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      <h2>Developer Profiles</h2>
      <p>
        View developer profiles to learn more about the community and find
        developers to collaborate with
      </p>
      {/* <StyledLink to='/createproject'>
        Add Project
      </StyledLink> */}
      <hr></hr>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <StyledCards>
            {profiles.map((el, index) => {
              return (
                <ProfileCard
                  key={el._id}
                  firstName={el.user.firstName.charAt(0).toUpperCase()}
                  lastName={el.user.lastName.charAt(0).toUpperCase()}
                  username={el.user.username}
                  skills={el.skills}
                  id={el.user._id}
                  color={colors[index]}
                />
              );
            })}
          </StyledCards>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Profiles;
