import React, { Fragment, useContext, useEffect } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';

const Project = (props) => {
  const {
    project,
    isLoading,
    getProjectDetails,
    updateProject,
    deleteProject,
  } = useContext(ProjectContext);

  useEffect(() => {
    getProjectDetails(props.match.params.id);
  }, [getProjectDetails]);

  

  //Put the add ticket functionality here where tickets are shown for the project
  return (
    <Wrapper>
      {!project ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2>{project.name}</h2>
          <div>{project.description}</div>
          <Button
            variant='contained'
            color='secondary'
            onClick={async () => deleteProject(project._id, props.history)}
          >
            Delete Project
          </Button>
          <Link
            variant='contained'
            color='primary'
            to='/editproject'
          >
            Edit Project Details
          </Link>
          <Button variant='contained' color='default'>
            Add Developer to Project
          </Button>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Project;
