import React, { useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import Wrapper from '../../layout/Wrapper';
import Button from '@material-ui/core/Button';
import Spinner from '../../layout/Spinner';

const Projects = (props) => {
  const { projects, isLoading, errors, getUserProjects } = useContext(
    ProjectContext,
  );

  useEffect(() => {
    getUserProjects();
  }, [getUserProjects]);

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
          {projects.map((el) => {
            return <p key={el._id}>{el.name}</p>;
          })}
          <h3>Projects I'm collaborating on</h3>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Projects;
