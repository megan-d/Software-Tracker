import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AlertBanner from '../../layout/AlertBanner';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';

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
    margin: theme.spacing(1, 0),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
}));

const SubmitTicket = (props) => {
  const classes = useStyles();

  const { createTicket } = useContext(TicketContext);
  const { project, getProjectDetails } = useContext(ProjectContext);

  useEffect(() => {
    getProjectDetails(props.match.params.id);
  }, []);

  const [formData, updateFormData] = useState({
    title: '',
    type: '',
    description: '',
    priority: '',
    assignedDeveloper: '',
  });

  const [dateDue, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  //Pull out variables from formData and userData
  const { title, type, description, priority, assignedDeveloper } = formData;

  // Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const ticket = {
      title: title,
      type: type,
      description: description,
      priority: priority,
      dateDue: dateDue,
      assignedDeveloper: assignedDeveloper,
    };
    //call add project action
    await createTicket(ticket, project._id, props.history);
  };

  return (
    <Wrapper>
      <h2>Create a New Ticket</h2>
      <hr></hr>
      <Grid container component='main' className={classes.root}>
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <form
              className={classes.form}
              action=''
              onSubmit={(e) => onSubmit(e)}
            >
              <TextField
                autoComplete='title'
                name='title'
                variant='outlined'
                required
                fullWidth
                id='title'
                label='Ticket title'
                autoFocus
                value={title}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel htmlFor='type'>Type</InputLabel>
                <Select
                required
                  native
                  value={type}
                  onChange={(e) => onChange(e)}
                  label='Type'
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
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel htmlFor='priority'>Priority</InputLabel>
                <Select
                required
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
                name='description'
                variant='outlined'
                required
                fullWidth
                id='description'
                label='Ticket description'
                value={description}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='flex-start'>
                  <KeyboardDatePicker
                  required
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Due Date'
                    value={dateDue}
                    onChange={(dateDue) => handleDateChange(dateDue)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <TextField
                variant='outlined'
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
              <Button
                variant='contained'
                size='small'
                color='default'
                href='/profiles'
                className={classes.findButton}
              >
                Search for user...
              </Button>
              <AlertBanner />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.buttons}
              >
                Submit
              </Button>
              <Button
                variant='contained'
                color='secondary'
                className={classes.buttons}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color='default'
                className={classes.buttons}
              >
                Back to Project
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SubmitTicket;
