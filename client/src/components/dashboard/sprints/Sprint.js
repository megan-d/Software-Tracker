import React, {
  Fragment,
  useContext,
  useEffect,
  useHistory,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import {
  StyledGreyLink,
  StyledDeleteButton,
} from '../../../styles/styledComponents/StyledLinks';
import { SprintContext } from '../../../context/sprints/SprintContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import styled from 'styled-components';
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
    display: 'block',
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
  button: {
    backgroundColor: '#f94144',
    color: 'white',
    fontSize: 14,
    maxWidth: 180,
    width: 180,
    height: 40,
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}));

const Sprint = (props) => {
  const classes = useStyles();

  const {
    sprint,
    getSprintDetails,
    deleteSprint,
    isLoading,
    getProjectForSprint,
    removeTicketFromSprint,
    clearSprint,
  } = useContext(SprintContext);

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
    return () => clearSprint();
  }, []);

  return (
    <Wrapper>
      {!sprint || isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div style={{display: 'flex'}}>
          <GroupWorkIcon style={{marginRight: '10px', color: '#43aa8b'}}/>
          <h2 className='page-heading'>{sprint.title}</h2>
          </div>
          <hr className='hr'></hr>
          <div>{sprint.description}</div>
          {sprint.developers.length > 0 && (
            <Fragment>
              <ul>Sprint developers:</ul>
              {sprint.developers.map((el, index) => <li key={index}>{el.username}</li>)}
            </Fragment>
          )}

          <ul>Sprint comments:</ul>
          {sprint.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this sprint</p>
          ) : (
            sprint.comments.map((el) => <li key={el._id}>{el.comment}</li>)
          )}
          {/* <ul>Sprint developers:</ul>

          {sprint.developers.length > 0 && sprint.developers[0].username
            ? sprint.developers.map((el, index) => <li key={index}>{el}</li>)
            : ''} */}

          <MaterialTable
            localization={{
              header: {
                actions: 'Remove',
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
            actions={[
              {
                icon: 'remove_circle',
                tooltip: 'Remove Ticket from Sprint',
                onClick: (event, rowData) => {
                  //CREATE FUNCTION TO REMOVE TICKET FROM SPRINT
                  removeTicketFromSprint(sprint._id, rowData.id, props.history);
                  props.history.push(`/sprint/${sprint._id}`);
                },
              },
            ]}
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
              actionsColumnIndex: -1,
            }}
            onRowClick={async (event, rowData) => {
              props.history.push(`/ticket/${rowData.id}`);
            }}
          />
          <StyledGreyLink
            variant='contained'
            color='primary'
            to={`/projects/sprints/comment/${sprint._id}`}
          >
            Comment on Sprint
          </StyledGreyLink>
          <StyledGreyLink
            variant='contained'
            color='primary'
            to={`/projects/sprints/updatesprint/${sprint._id}`}
          >
            Edit Sprint
          </StyledGreyLink>

          <StyledDeleteButton
            variant='contained'
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={async () =>
              deleteSprint(sprint.project._id, sprint._id, props.history)
            }
          >
            Delete Sprint
          </StyledDeleteButton>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Sprint;
