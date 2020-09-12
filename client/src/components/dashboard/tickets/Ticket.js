import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StyledGreyLink, StyledGreyButton, StyledDeleteButton } from '../../../styles/styledComponents/StyledLinks';
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
    minWidth: '180px',
    width: '180px',
    margin: 0,
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
    { title: 'Type of Change', field: 'typeOfChange', align: 'left' },
    { title: 'Date', field: 'date', type: 'date', align: 'right' },
  ];

  let history = useHistory();

  return (
    <Wrapper>
      {!ticket || isLoading || !ticket.project.sprints ? (
        <Spinner />
      ) : (
        <Fragment>
          <div style={{display: 'flex'}}>
          <ConfirmationNumberIcon style={{marginRight: '10px', color: '#43aa8b'}}/>
          <h2 className='page-heading'>{ticket.title}</h2>
          </div>
          <hr className='hr'></hr>
          <div>Description: {ticket.description}</div>
          <div>Assigned Dev: {ticket.assignedDeveloper.username}</div>
          <ul>Ticket comments:</ul>
          {ticket.comments.length === 0 && !isLoading ? (
            <li>There are no comments for this ticket</li>
          ) : (
            ticket.comments.map((el) => <li key={el._id}>{el.text}</li>)
          )}
          <MaterialTable
          style={{width: '360px'}}
          localization={{
            header: {
              actions: '',
            },
          }}
          title='Ticket History'
          columns={columns}
          data={ticket.history}
          options={{
            filtering: false,
            search: false,
            align: 'center'
          }}
        />
          <StyledGreyLink
            variant='contained'
            color='primary'
            to={`/projects/tickets/comment/${ticket._id}`}
          >
            Comment on Ticket
          </StyledGreyLink>
          <StyledGreyLink
            variant='contained'
            color='primary'
            to={`/projects/tickets/updateticket/${ticket._id}`}
          >
            Edit Ticket
          </StyledGreyLink>
          {ticket.project.sprints.length === 0 ? (
            ''
          ) : (
            <Fragment>
              
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel htmlFor='sprint'>Select Sprint:</InputLabel>
                <Select
                className={classes.dropdown}
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
              <StyledGreyButton
              style={{display: 'inline-block'}}
                variant='contained'
                color='default'
                onClick={async () => {
                  await addTicketToSprint(
                    sprint,
                    ticket._id,
                    ticket.project._id,
                    props.history,
                  );
                }}
              >
                Add Ticket to Sprint
              </StyledGreyButton>
              
            </Fragment>
          )}
          <StyledDeleteButton
            variant='contained'
            startIcon={<DeleteIcon />}
            onClick={async () =>
              deleteTicket(ticket.project._id, ticket._id, props.history)
            }
          >
            Delete Ticket
          </StyledDeleteButton>
          <AlertBanner />
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Ticket;
