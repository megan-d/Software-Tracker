import React, { useState, useContext } from 'react';
import Wrapper from '../../layout/Wrapper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AlertBanner from '../../layout/AlertBanner';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const CreateProject = ({history}) => {
  const classes = useStyles();

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    manager: '',
    repoLink: '',
    liveLink: '',
  });

  const [targetCompletionDate, setSelectedDate] = useState(Date.now());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { createProject } = useContext(ProjectContext);

  //Pull out variables from formData and userData
  const { name, description, manager, repoLink, liveLink } = formData;

  // Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const project = {
      name: name,
      description: description,
      targetCompletionDate: targetCompletionDate,
      manager: manager,
      repoLink: repoLink,
      liveLink: liveLink,
    };
    //call add project action
    await createProject(project, history);
    
  };

  return (
    <Wrapper>
      <h2>Create a New Project</h2>
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
                autoComplete='name'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Project Name'
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
                margin='normal'
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
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='flex-start'>
                  <KeyboardDatePicker
                    disableToolbar
                    variant='inline'
                    format='MM/dd/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Target Completion Date'
                    value={targetCompletionDate}
                    onChange={(targetCompletionDate) =>
                      handleDateChange(targetCompletionDate)
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
                name='manager'
                label='Project Manager username. You will be assigned as manager if left blank.'
                id='manager'
                value={manager}
                onChange={(e) => onChange(e)}
                margin='normal'
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
              <TextField
                variant='outlined'
                fullWidth
                name='repoLink'
                label='URL for project repo'
                id='repoLink'
                value={repoLink}
                onChange={(e) => onChange(e)}
                margin='normal'
              />
              <TextField
                variant='outlined'
                fullWidth
                name='liveLink'
                label='URL for live project'
                id='liveLink'
                value={liveLink}
                onChange={(e) => onChange(e)}
                margin='normal'
              />
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
                href='/projects'
                className={classes.buttons}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                color='default'
                href='/projects'
                className={classes.buttons}
              >
                Back to Projects
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CreateProject;
