import React, { useEffect, useContext, Fragment } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import Wrapper from '../../layout/Wrapper';
import Button from '@material-ui/core/Button';
import Spinner from '../../layout/Spinner';
import ProjectCard from './ProjectCard';
import styled from 'styled-components';

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Projects = (props) => {
  const { projects, isLoading, errors, getUserProjects } = useContext(
    ProjectContext,
  );
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserProjects();
  }, []);

  let myProjects = projects.filter(
    (el) => el.manager === user._id || el.owner === user._id,
  );
  let collabProjects = projects.filter((el) => el.developers.some((developer) => developer === user._id));

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      <h2>Projects</h2>
      <p>
        View your own projects as well as projects you are a collaborator on
      </p>
      <Button variant='contained' color='secondary' href='/createproject'>
        Add Project
      </Button>
      <hr></hr>
      {isLoading ? (
        <Spinner />
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
