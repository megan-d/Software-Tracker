import React, { Fragment, useContext, useEffect, useHistory, useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { SprintContext } from '../../../context/sprints/SprintContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import styled from 'styled-components';
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: '300px',
    display: 'block'
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: '85%',
    maxWidth: '85%',
  },
  buttons: {
    marginRight: '10px',
    marginTop: '20px',
  },
  findButton: {
    fontSize: '11px',
    marginBottom: '10px',
    marginTop: '1px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dropdown: {
    minWidth: '300px',
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  searchButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

const Sprint = (props) => {
  const classes = useStyles();

  const { sprint, getSprintDetails, deleteSprint, isLoading, getProjectForSprint } = useContext(
    SprintContext,
  );

  const { tickets } = useContext(
    TicketContext,
  );

  

  const ticketColumns = [
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    { title: 'Priority', field: 'priority' },
    { title: 'Due date', field: 'dateDue', type: 'date' },
    { title: 'Status', field: 'status' },
    // { title: 'Assigned Dev', field: 'assignedDeveloper' },
  ];

  // let history = useHistory();

  useEffect(() => {
    getSprintDetails(props.match.params.sprintid);
  }, []);

  return (
    <Wrapper>
      {!sprint || isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <GroupWorkIcon />
          <div>{sprint.title}</div>
          <div>{sprint.description}</div>
          <ul>Sprint comments:</ul>
          {sprint.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this sprint</p>
          ) : (
            sprint.comments.map((el) => <li key={el._id}>{el.text}</li>)
          )}
          <MaterialTable
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Tickets'
            columns={ticketColumns}
            data={sprint.tickets.map((el) => {
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
              props.history.push(`/ticket/${rowData.id}`);
            }}
          />
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
              deleteSprint(sprint.project._id, sprint._id, props.history)
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
