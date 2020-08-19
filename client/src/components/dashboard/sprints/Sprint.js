import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { SprintContext } from '../../../context/sprints/SprintContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: white;
  background: grey;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 160px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  font-family: Roboto, sans-serif;
`;

const Sprint = (props) => {
  const { sprint, getSprintDetails, deleteSprint, isLoading } = useContext(
    SprintContext,
  );
  const { project, getProjectForSprint } = useContext(ProjectContext);

  useEffect(() => {
    getSprintDetails(props.match.params.id);
    getProjectForSprint(props.match.params.id);
  }, []);

  return (
    <Wrapper>
      {!sprint ? (
        <Spinner />
      ) : (
        <Fragment>
          <ConfirmationNumberIcon />
          <div>{sprint.title}</div>
          <div>{sprint.description}</div>
          <ul>Sprint comments:</ul>
          {sprint.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this sprint</p>
          ) : (
            sprint.comments.map((el) => <li key={el._id}>{el.text}</li>)
          )}
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/sprints/comment/${sprint._id}`}
          >
            Comment on Sprint
          </StyledLink>
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/sprints/updatesprint/${sprint._id}`}
          >
            Edit Sprint
          </StyledLink>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={async () =>
              deleteSprint(project._id, sprint._id, props.history)
            }
          >
            Delete Sprint
          </Button>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Sprint;
