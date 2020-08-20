import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertBanner from '../../layout/AlertBanner';
import { TicketContext } from '../../../context/tickets/TicketContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';

const StyledGreyLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #808080;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 160px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const StyledRedLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #f50757;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 150px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const StyledBlueButton = styled.button`
  color: white;
  font-family: Roboto, sans-serif;
  cursor: pointer;
  background-color: #3f51b5;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 150px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
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
    margin: theme.spacing(0),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttons: {
    marginRight: '10px',
    marginTop: '20px',
  },
  findButton: {
    fontSize: '11px',
    marginBottom: '10px',
    marginTop: '1px',
  },
  dropdown: {
    minWidth: '120px',
  },
}));

export default function UpdateTicket(props) {
  const classes = useStyles();

  const { ticket, updateTicket, getTicketDetails, getProjectForTicket, project } = useContext(TicketContext);

  const [formData, updateFormData] = useState({
    title: '',
    type: '',
    description: '',
    priority: '',
    assignedDeveloper: '',
    history: '',
    status: '',
    resolutionSummary: '',
  });

  const [dateDue, setDueDate] = useState(null);

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const [dateCompleted, setCompletedDate] = useState(null);

  const handleCompletionDateChange = (date) => {
    setCompletedDate(date);
  };

  useEffect(() => {
    getTicketDetails(props.match.params.ticketid);
    getProjectForTicket(props.match.params.ticketid);
  }, []);

  //TODO: Need to fix how target completion date is shown in placeholder text.
  //TODO: Need to find way to display username rather than id. Try populate.

  // const [completionDate, setSelectedCompletionDate] = useState(null);

  // const handleCompletionDateChange = (date) => {
  //   setSelectedCompletionDate(date);
  // };

  //Pull out variables from formData and userData
  const {
    title,
    type,
    description,
    priority,
    assignedDeveloper,
    history,
    status,
    resolutionSummary,
  } = formData;

  // Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const ticketUpdates = {
      title: title,
      type: type,
      description: description,
      priority: priority,
      assignedDeveloper: assignedDeveloper,
      history: history,
      status: status,
      resolutionSummary: resolutionSummary,
      dateDue: dateDue,
      dateCompleted: dateCompleted,
    };
    //call add project action
    console.log(project);
    await updateTicket(ticketUpdates, project._id, ticket._id, props.history);
  };

  return (
    <Wrapper>
      <h2>Update Ticket</h2>
      <hr></hr>
      <p>
        Please ensure that you provide a type of change for the ticket's
        history.
      </p>
      {!ticket ? (
        <Spinner />
      ) : (
        <Grid container component='main' className={classes.root}>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <form
                className={classes.form}
                action=''
                onSubmit={(e) => onSubmit(e)}
              >
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='history'>Type of Change</InputLabel>
                  <Select
                    required
                    autoFocus
                    native
                    value={history}
                    onChange={(e) => onChange(e)}
                    label='Type of Change'
                    inputProps={{
                      name: 'history',
                      id: 'history',
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={'Update Details'}>
                      Update Ticket Details
                    </option>
                    <option value={'Update AssignedDev'}>
                      Update Assigned Dev
                    </option>
                    <option value={'Update Status'}>Update Status</option>
                    <option value={'Info for Completion'}>Add Info for Completion</option>
                    <option value={'Other'}>Other</option>
                  </Select>
                </FormControl>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='type'>Ticket Type</InputLabel>
                  <Select
                    required
                    placeholder={ticket.type}
                    native
                    value={type}
                    onChange={(e) => onChange(e)}
                    label='Ticket Type'
                    inputProps={{
                      name: 'type',
                      id: 'type',
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={'Bug'}>Bug</option>
                    <option value={'Task'}>Task</option>
                    <option value={'Other'}>Other</option>
                  </Select>
                </FormControl>
                <TextField
                  autoComplete='title'
                  label='Title'
                  placeholder={ticket.title}
                  name='title'
                  variant='outlined'
                  fullWidth
                  id='title'
                  value={title}
                  onChange={(e) => onChange(e)}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='priority'>Priority</InputLabel>
                  <Select
                    required
                    placeholder={ticket.priority}
                    native
                    value={priority}
                    onChange={(e) => onChange(e)}
                    label='Priority'
                    inputProps={{
                      name: 'priority',
                      id: 'priority',
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={'Low'}>Low</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'High'}>High</option>
                    <option value={'Critical'}>Critical</option>
                  </Select>
                </FormControl>
                <TextField
                  autoComplete='description'
                  label='Ticket Description'
                  placeholder={ticket.description}
                  name='description'
                  variant='outlined'
                  fullWidth
                  id='description'
                  value={description}
                  onChange={(e) => onChange(e)}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='status'>Status</InputLabel>
                  <Select
                    required
                    placeholder={ticket.status}
                    native
                    value={status}
                    onChange={(e) => onChange(e)}
                    label='status'
                    inputProps={{
                      name: 'status',
                      id: 'status',
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={'Assigned'}>Assigned</option>
                    <option value={'In Progress'}>In Progress</option>
                    <option value={'Under Review'}>Under Review</option>
                    <option value={'Completed'}>Completed</option>
                  </Select>
                </FormControl>
                <TextField
                  variant='outlined'
                  placeholder={ticket.assignedDeveloper}
                  fullWidth
                  name='assignedDeveloper'
                  label='Assigned Developer Username'
                  required
                  id='assignedDeveloper'
                  value={assignedDeveloper}
                  onChange={(e) => onChange(e)}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <StyledGreyLink to='/profiles'>
                  Search for user...
                </StyledGreyLink>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify='flex-start'>
                    <KeyboardDatePicker
                      disableToolbar
                      placeholder={ticket.dateDue}
                      variant='inline'
                      format='MM/dd/yyyy'
                      margin='normal'
                      id='dateDue'
                      label='Due Date'
                      value={dateDue}
                      onChange={(dateDue) => handleDueDateChange(dateDue)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify='flex-start'>
                    <KeyboardDatePicker
                      disableToolbar
                      placeholder={ticket.dateCompleted}
                      variant='inline'
                      format='MM/dd/yyyy'
                      margin='normal'
                      id='dateCompleted'
                      label='Date Completed'
                      value={dateCompleted}
                      onChange={(dateCompleted) =>
                        handleCompletionDateChange(dateCompleted)
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

                <TextField
                    name='resolutionSummary'
                    placeholder={resolutionSummary}
                    variant='outlined'
                    fullWidth
                    id='resolutionSummary'
                    label='Summary of Ticket Resolution'
                    value={resolutionSummary}
                    onChange={(e) => onChange(e)}
                    multiline
                    rows={6}
                    margin='normal'
                  />
                <AlertBanner />
                <StyledBlueButton
                  type='submit'
                  className={classes.buttons}
                  onClick={(e) => onSubmit(e)}
                >
                  SUBMIT
                </StyledBlueButton>
                <StyledRedLink
                  to={`/ticket/${ticket._id}`}
                  className={classes.buttons}
                >
                  CANCEL
                </StyledRedLink>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
}
