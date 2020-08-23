import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import AlertBanner from '../../layout/AlertBanner';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import AvatarIcon from '../../layout/AvatarIcon';

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

  

const Project = (props) => {
  const { project, getProjectDetails, deleteProject, isLoading } = useContext(
    ProjectContext,
  );

  const { clearTicket } = useContext(TicketContext);
  const { user } = useContext(AuthContext);

  // const [assignedDev, updateAssignedDev] = useState();

  useEffect(() => {
    getProjectDetails(props.match.params.projectid);
    clearTicket();
  }, []);

  const ticketColumns = [
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    { title: 'Priority', field: 'priority' },
    { title: 'Due date', field: 'dateDue', type: 'date' },
    { title: 'Status', field: 'status' },
    // { title: 'Assigned Dev', field: 'assignedDeveloper' },
  ];

  const sprintColumns = [
    { title: 'Title', field: 'title' },
    { title: 'StartDate', field: 'startDate', type: 'date' },
    { title: 'Planned End Date', field: 'plannedEndDate', type: 'date' },
    { title: 'Status', field: 'status' },
  ];

  let history = useHistory();

  //Put the add ticket functionality here where tickets are shown for the project.
  //Only show delete and edit buttons if the user owns the project or is an admin
  return (
    <Wrapper>
      {!project || isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <AlertBanner />
          <h2>{project.name}</h2>
          <p>Description: {project.description}</p>
          <p>Target completion date: {project.targetCompletionDate}</p>
          
          <MaterialTable
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Tickets'
            columns={ticketColumns}
            data={project.tickets.map((el) => {
              return {
                id: el._id,
                title: el.title,
                type: el.type,
                priority: el.priority,
                dateDue: el.dateDue,
                status: el.status,
                // assignedDeveloper: <AvatarIcon user={'H'} />,
              };
            })}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30],
              toolbar: true,
              paging: true,
              options: {
                rowStyle: {
                  padding: '0px',
                },
              },
            }}
            onRowClick={async (event, rowData) => {
              history.push(`/ticket/${rowData.id}`);
            }}
          />
          <MaterialTable
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Sprints'
            columns={sprintColumns}
            data={project.sprints.map((el) => {
              return {
                id: el._id,
                title: el.title,
                startDate: el.startDate,
                plannedEndDate: el.plannedEndDate,
                status: el.status,
              };
            })}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30],
              toolbar: true,
              paging: true,
              options: {
                rowStyle: {
                  padding: '0px',
                },
              },
            }}
            onRowClick={async (event, rowData) => {
              history.push(`/sprint/${rowData.id}`);
            }}
          />
          <ul>Developers on project:</ul>
          {project.developers.map((el, index) => (
            <li key={index}>{el}</li>
          ))}

          <ul>Project comments:</ul>
          {project.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this project</p>
          ) : (
            project.comments.map((el) => <li key={el._id}>{el.comment}</li>)
          )}

          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/submitticket/${project._id}`}
          >
            Add Ticket
          </StyledLink>
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/createsprint/${project._id}`}
          >
            Add Sprint
          </StyledLink>
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/comment/${project._id}`}
          >
            Comment on Project
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
