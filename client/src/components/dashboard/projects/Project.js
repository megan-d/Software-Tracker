import React, { Fragment, useContext, useEffect } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import AlertBanner from '../../layout/AlertBanner';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';

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

const Project = (props) => {
  const { project, getProjectDetails, deleteProject } = useContext(
    ProjectContext,
  );

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getProjectDetails(props.match.params.id);
  }, []);

  //Put the add ticket functionality here where tickets are shown for the project.
  //Only show delete and edit buttons if the user owns the project or is an admin
  return (
    <Wrapper>
      {!project ? (
        <Spinner />
      ) : (
        <Fragment>
          <AlertBanner />
          <h2>{project.name}</h2>
          <h3>{project.description}</h3>
          <ul>Project tickets:</ul>
          {project.tickets.map((el) => (
            <li key={el._id}>{el.title}</li>
          ))}
          <ul>Developers on project:</ul>
          {project.developers.map((el, index) => (
            <li key={index}>{el}</li>
          ))}

          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/${project._id}/submitticket`}
          >
            Add Ticket
          </StyledLink>
          {user._id === project.owner ? (
            <Fragment>
              <StyledLink
                variant='contained'
                color='primary'
                to={`/projects/${project._id}/edit`}
              >
                Edit Project
              </StyledLink>
              <Button
                variant='contained'
                color='secondary'
                startIcon={<DeleteIcon />}
                onClick={async () => deleteProject(project._id, props.history)}
              >
                Delete Project
              </Button>
            </Fragment>
          ) : null}
          {user._id === project.manager && user._id !== project.owner ? (
            <Fragment>
              <StyledLink
                variant='contained'
                color='primary'
                to={`/projects/${project._id}/edit`}
              >
                Edit Project
              </StyledLink>
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Project;
