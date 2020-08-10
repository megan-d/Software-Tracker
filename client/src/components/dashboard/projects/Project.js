import React, { Fragment, useContext, useEffect } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';

const Project = (props) => {
  const { project, isLoading, getProjectDetails } = useContext(ProjectContext);

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
          <h2>{project.name}</h2>
          <div>{project.description}</div>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Project;
