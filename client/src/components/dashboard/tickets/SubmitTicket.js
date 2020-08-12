import React, { useState, useContext } from 'react';
import Wrapper from '../../layout/Wrapper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AlertBanner from '../../layout/AlertBanner';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
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
    margin: theme.spacing(1),
    minWidth: 120,
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

const SubmitTicket = ({ history }) => {
  const classes = useStyles();

  const [formData, updateFormData] = useState({
    title: '',
    type: '',
    description: '',
    priority: '',
    assignedDeveloper: ''
  });

  const [dateDue, setSelectedDate] = useState(Date.now());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { createTicket } = useContext(TicketContext);
  const { project } = useContext(ProjectContext);

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
      assignedDeveloper: assignedDeveloper
    };
    //call add project action
    await createTicket(ticket, project._id, history);
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
                label='Project title'
                autoFocus
                value={title}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                autoComplete='type'
                name='type'
                variant='outlined'
                required
                fullWidth
                id='type'
                label='Ticket type'
                autoFocus
                value={type}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                autoComplete='description'
                name='description'
                variant='outlined'
                required
                fullWidth
                id='description'
                label='Project description'
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
                    disableToolbar
                    required
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Due Date'
                    value={dateDue}
                    onChange={(dateDue) =>
                      handleDateChange(dateDue)
                    }
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
                label='Assigned Developer'
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
                href='/developers'
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
