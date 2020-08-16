import React, { useEffect, useContext, Fragment } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import ProjectCard from './ProjectCard';
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

const Projects = (props) => {
  const { projects, isLoading, getUserProjects, clearProject } = useContext(
    ProjectContext,
  );
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserProjects();
    clearProject();
  }, []);

  // let history = useHistory();

  //Get projects where user is the manager or owner and put them under "My Projects"
  let myProjects = projects.filter(
    (el) => el.owner === user._id,
  );
  let managing = projects.filter((el) => el.manager === user._id && el.owner !== user._id);
  //Get projects where user is a collaborating developer and put them under "Projects I'm collaborating on"
  let collabProjects = projects.filter((el) => el.developers.some((developer) => developer === user._id));

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      <h2>Projects</h2>
      <p>
        View your own projects as well as projects you are managing and collaborating on
      </p>
      <StyledLink to='/createproject'>
        Add Project
      </StyledLink>
      <hr></hr>
      {isLoading ? (
        <Spinner />
      ) : projects.length === 0 ? (
        <p>There are no projects available. Please select the Add Project button to add a project.</p>
      ) : (
        <Fragment>
          <h3>My Projects</h3>
          <StyledCards>
            {myProjects.map((el) => {
              return (
                <ProjectCard
                  key={el._id}
                  name={el.name}
                  description={el.description}
                  id={el._id}
                />
              );
            })}
          </StyledCards>

          <h3>Projects I'm managing</h3>
          <StyledCards>
            {managing.map((el) => {
              return (
                <ProjectCard
                  key={el._id}
                  name={el.name}
                  description={el.description}
                  id={el._id}
                />
              );
            })}
          </StyledCards>

          <h3>Projects I'm collaborating on</h3>
          <StyledCards>
            {collabProjects.map((el) => {
              return (
                <ProjectCard
                  key={el._id}
                  name={el.name}
                  description={el.description}
                  id={el._id}
                />
              );
            })}
          </StyledCards>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Projects;
