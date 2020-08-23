import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { SprintContext } from '../../../context/sprints/SprintContext';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
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

//*****ADD TICKET TO SPRINT ACTION************
const addTicketToSprint = async (sprintId, ticketId, projectId, history) => {
  //Create config with headers
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

  try {
      
      const res = await axios.get(`/api/projects/sprints/${sprintId}/${ticketId}`, config);
    
    history.push(`/projects/${projectId}`);
  } catch (err) {
    let errors = err.response.data.errors;
    // if (errors) {
    //   //if errors, loop through them and dispatch the showAlert action from AlertContext
    //   errors.forEach((el) => showAlert(el.msg, 'error'));
    // }
  }
};

const Ticket = (props) => {
  const classes = useStyles();

  const { ticket, getTicketDetails, deleteTicket, isLoading } = useContext(
    TicketContext,
  );

  const { project, getProjectDetails } = useContext(
    ProjectContext,
  );

  const [formData, updateFormData] = useState({
    sprint: '',
  });

  const { sprint } = formData;

  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });


  useEffect(() => {
    getTicketDetails(props.match.params.ticketid);
  }, []);

  return (
    <Wrapper>
      {!ticket || isLoading || !ticket.project ? (
        <Spinner />
      ) : (
        <Fragment>
          <ConfirmationNumberIcon />
          <div>{ticket.title}</div>
          <div>{ticket.description}</div>
          <button onClick={() => addTicketToSprint("5f403120b0fe8173ef098188", ticket._id, ticket.project._id, props.history)}>Add ticket to sprint</button>
          <ul>Ticket comments:</ul>
          {ticket.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this ticket</p>
          ) : (
            ticket.comments.map((el) => <li key={el._id}>{el.text}</li>)
          )}
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/tickets/comment/${ticket._id}`}
          >
            Comment on Ticket
          </StyledLink>
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/tickets/updateticket/${ticket._id}`}
          >
            Edit Ticket
          </StyledLink>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel htmlFor='sprint'>Add Ticket to Sprint:</InputLabel>
            <Select
              native
              value={sprint}
              onChange={(e) => onChange(e)}
              label='Select Ticket'
              inputProps={{
                name: 'sprint',
                id: 'sprint',
              }}
            >
              <option aria-label='None' value='' />
              {ticket.project.sprints.map((el) => 
                  <option value={el._id} key={el._id}>{el.title}</option>
              )}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            color='primary'
            onClick={async () => {
              await addTicketToSprint(sprint, ticket._id, ticket.project._id, props.history)
            }
            }
          >
            Add Selected Ticket
          </Button>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={async () =>
              deleteTicket(ticket.project._id, ticket._id, props.history)
            }
          >
            Delete Ticket
          </Button>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Ticket;
