import React, { Fragment, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AlertBanner from '../../layout/AlertBanner';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import Wrapper from '../../layout/Wrapper';

export default function EditProject(props) {
  const {
    projects,
    project,
    updateProject,
    getProjectDetails
  } = useContext(ProjectContext);

  let history = useHistory();

  const edits = {
    developer: "megab"
  }

  useEffect(() => {
    getProjectDetails(props.match.params.id);
  }, []);

  return (
    <Wrapper>
        <AlertBanner />
      <Button
        variant='contained'
        color='primary'
        onClick={async () => updateProject(edits, project._id, props.history)}
      >
        Submit
      </Button>
    </Wrapper>
  );
}
