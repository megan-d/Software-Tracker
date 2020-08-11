import React, { Fragment, useContext, useEffect } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import AlertBanner from '../../layout/AlertBanner';

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
  }, []);

  //Put the add ticket functionality here where tickets are shown for the project
  return (
    <Wrapper>
      {!project ? (
        <Spinner />
      ) : (
        <Fragment>
          <AlertBanner />
          <h2>{project.name}</h2>
          <h3>{project.description}</h3>
          <h4>Developers on project:</h4>
          {project.developers.map((el) => (
            <p>{el}</p>
          ))}
          <Button
            variant='contained'
            color='secondary'
            onClick={async () => deleteProject(project._id, props.history)}
          >
            Delete Project
          </Button>
          <Link variant='contained' color='primary' to={`/projects/${project._id}/edit`}>
            Edit Project Details or Add Developer to Project
          </Link>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Project;
