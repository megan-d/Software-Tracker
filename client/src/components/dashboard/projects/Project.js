import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { StyledGreyLink, StyledDeleteButton } from '../../../styles/styledComponents/StyledLinks';
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
  // '#F94144',
  '#F3722C',
  '#F8961E',
  '#F9C74F',
  '#90BE6D',
  '#43AA8B',
  '#577590',
  '##f3f3f3'
];

function ListItemLink(props) {
  return <Link {...props} style={{ textDecoration: 'none', color: 'grey' }} />;
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
      clearProject();
      clearTicket();
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
          <h2 className='page-heading'>{project.name}</h2>
          <hr className='hr'></hr>
          <p>Description: {project.description}</p>
          <p>Target completion date: {project.targetCompletionDate}</p>
          <MaterialTable
          style={{marginTop: '20px'}}
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Tickets'
            columns={ticketColumns}
            data={project.tickets.map((el) => {
              return {
                key: el._id,
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
              headerStyle: {
                backgroundColor: '#204051',
                color: '#fafafa',
              },
            }}
            onRowClick={async (event, rowData) => {
              history.push(`/ticket/${rowData.id}`);
            }}
          />
          <MaterialTable
          style={{marginTop: '20px'}}
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Sprints'
            columns={sprintColumns}
            data={project.sprints.map((el) => {
              return {
                key: el._id,
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
              headerStyle: {
                backgroundColor: '#204051',
                color: '#fafafa',
              },
            }}
            onRowClick={async (event, rowData) => {
              history.push(`/sprint/${rowData.id}`);
            }}
          />

          <h4>Developers on Project:</h4>
          {project.developers.length > 0 && project.developers[0].username ?
            (project.developers.map((el, index) => {
              return (
                <ListItemLink to={`/profiles/${el._id}`} key={index}>
                <ListItem button >
                  <ListItemIcon>
                    <Avatar
                      className={classes.root}
                      style={{
                        height: '40px',
                        width: '40px',
                        color: '#fafafa',
                        backgroundColor: colors[index],
                      }}
                    >
                      {el.firstName.charAt(0).toUpperCase()}
                      {el.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemIcon>
                  
                    <ListItemText primary={el.username}/>
                  
                </ListItem>
                </ListItemLink>
              );
            })): ('')}

          <h4>Project Tech Stack:</h4>
          {!project.techStack ? ('') : project.techStack.length === 0 && !isLoading ? (
            <p>No listed technologies</p>
          ) : (
            project.techStack.map((el, index) => {
              return <p key={index}>{el}</p>;
            })
          )}

          <ul>Project comments:</ul>
          {project.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this project</p>
          ) : (
            project.comments.map((el) => <li key={el._id}>{el.comment}</li>)
          )}

          <StyledGreyLink
            variant='contained'
            to={`/projects/submitticket/${project._id}`}
          >
            Add Ticket
          </StyledGreyLink>
          <StyledGreyLink
            variant='contained'
            to={`/projects/createsprint/${project._id}`}
          >
            Add Sprint
          </StyledGreyLink>
          <StyledGreyLink
            variant='contained'
            to={`/projects/comment/${project._id}`}
          >
            Comment on Project
          </StyledGreyLink>
          {user._id === project.owner ? (
            <Fragment>
              <StyledGreyLink
                variant='contained'
                to={`/projects/${project._id}/edit`}
              >
                Edit Project
              </StyledGreyLink>
              <StyledDeleteButton
                variant='contained'
                startIcon={<DeleteIcon />}
                onClick={async () => deleteProject(project._id, props.history)}
                className={classes.button}
              >
                Delete Project
              </StyledDeleteButton>
            </Fragment>
          ) : null}
          {user._id === project.manager && user._id !== project.owner ? (
            <Fragment>
              <StyledGreyLink
                variant='contained'
                to={`/projects/${project._id}/edit`}
              >
                Edit Project
              </StyledGreyLink>
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Project;
