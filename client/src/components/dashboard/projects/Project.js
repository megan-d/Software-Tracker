import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import AlertBanner from '../../layout/AlertBanner';
import styled from 'styled-components';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import DevelopersList from '../developer/DevelopersList';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const colors = [
  'orange',
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'black',
  'pink',
  'lightgreen',
];

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

function ListItemLink(props) {
  return (
    <Link
      {...props}
      style={{ textDecoration: 'none', color: 'grey' }}
    />
  );
}

const Project = (props) => {
  const classes = useStyles();

  const {
    project,
    getProjectDetails,
    deleteProject,
    isLoading,
    clearProject,
  } = useContext(ProjectContext);

  const { clearTicket } = useContext(TicketContext);
  const { user } = useContext(AuthContext);

  // const [assignedDev, updateAssignedDev] = useState();

  useEffect(() => {
    getProjectDetails(props.match.params.projectid);
    return () => {
      clearTicket();
      clearProject();
    };
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

          {project.developers[0].username &&
            !isLoading &&
            // <DevelopersList />
            project.developers.map((el, index) => {
              return (
                <ListItem button key={el._id}>
                  <ListItemIcon>
                    <Avatar
                      className={classes.root}
                      style={{
                        height: '40px',
                        width: '40px',
                        color: '#e5e0db',
                        backgroundColor: colors[index],
                      }}
                    >
                      {el.firstName.charAt(0).toUpperCase()}
                      {el.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemLink to={'/projects'}>
                    <ListItemText primary={el.username} />
                  </ListItemLink>
                </ListItem>
              );
            })}

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
