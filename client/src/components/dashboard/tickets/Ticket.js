import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { TicketContext } from '../../../context/tickets/TicketContext';
import AlertBanner from '../../layout/AlertBanner';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import styled from 'styled-components';
import { Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MaterialTable from 'material-table';

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
}));

const Ticket = (props) => {
  const classes = useStyles();

  const {
    ticket,
    getTicketDetails,
    deleteTicket,
    isLoading,
    addTicketToSprint,
    clearTicket
  } = useContext(TicketContext);

  const [formData, updateFormData] = useState({
    sprint: '',
  });

  const { sprint } = formData;

  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getTicketDetails(props.match.params.ticketid);
    return () => clearTicket();
  }, []);

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    {
      title: 'Priority',
      field: 'priority',
    },
    { title: 'Due date', field: 'dateDue', type: 'date' },
    { title: 'Status', field: 'status' },
  ];

  let history = useHistory();

  return (
    <Wrapper>
      {!ticket || isLoading || !ticket.project.sprints ? (
        <Spinner />
      ) : (
        <Fragment>
          <ConfirmationNumberIcon />
          <div>Title: {ticket.title}</div>
          <div>Description: {ticket.description}</div>
          <div>Assigned Dev: {ticket.assignedDeveloper.username}</div>
          <ul>Ticket comments:</ul>
          {ticket.comments.length === 0 && !isLoading ? (
            <li>There are no comments for this ticket</li>
          ) : (
            ticket.comments.map((el) => <li key={el._id}>{el.text}</li>)
          )}
          <MaterialTable
          localization={{
            header: {
              actions: '',
            },
          }}
          title='Ticket History'
          columns={columns}
          data={ticket.history}
        />
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
          {ticket.project.sprints.length === 0 ? (
            ''
          ) : (
            <Fragment>
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
                  {ticket.project.sprints.map((el) => (
                    <option value={el._id} key={el._id}>
                      {el.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant='contained'
                color='primary'
                onClick={async () => {
                  await addTicketToSprint(
                    sprint,
                    ticket._id,
                    ticket.project._id,
                    props.history,
                  );
                }}
              >
                Add Selected Ticket
              </Button>
            </Fragment>
          )}
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
          <AlertBanner />
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Ticket;
