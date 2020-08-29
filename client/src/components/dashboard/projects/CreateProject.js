import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const StyledGreyLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #808080;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  width: 160px;
  max-width: 160px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0px;
  display: block;
  height: 40px;
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
  width: 80px;
  max-width: 160px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  height: 40px;
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
  width: 80px;
  max-width: 160px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  height: 40px;
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
}));

const CreateProject = ({ history }) => {
  const classes = useStyles();

  const [formData, updateFormData] = useState({
    name: '',
    description: '',
    manager: '',
    repoLink: '',
    liveLink: '',
    techStack: '',
    developers: '',
  });

  const [access, setAccess] = useState('public');

  const handleChange = (event) => {
    setAccess(event.target.value);
  };

  const [targetCompletionDate, setSelectedDate] = useState(Date.now());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { createProject } = useContext(ProjectContext);

  //Pull out variables from formData and userData
  const {
    name,
    description,
    manager,
    repoLink,
    liveLink,
    techStack,
    developers,
  } = formData;

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
      access: access,
      techStack: techStack,
      developers: developers,
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
              {/* <FormControl component='fieldset'>
                <FormLabel component='legend'>Select project access</FormLabel>
                <RadioGroup
                  aria-label='gender'
                  name='gender1'
                  value={access}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='public'
                    control={<Radio />}
                    label='Public'
                  />
                  <FormControlLabel
                    value='private'
                    control={<Radio />}
                    label='Private'
                  />
                </RadioGroup>
              </FormControl> */}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='flex-start'>
                  <KeyboardDatePicker
                    disableToolbar
                    required
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
                label='Project Manager username'
                helperText='You will be assigned as manager if left blank. Select the button below to find users.'
                id='manager'
                value={manager}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <StyledGreyLink to='/profiles'>Search for user...</StyledGreyLink>
              <TextField
                variant='outlined'
                fullWidth
                name='techStack'
                label='Technologies used'
                helperText='Please enter the technologies used for this project separated by a comma. (e.g. JavaScript, Node, React)'
                id='techStack'
                value={techStack}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant='outlined'
                fullWidth
                name='repoLink'
                label='URL for project repo'
                id='repoLink'
                value={repoLink}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <AlertBanner />
              <StyledBlueButton
                type='submit'
                className={classes.buttons}
                onClick={(e) => onSubmit(e)}
              >
                SUBMIT
              </StyledBlueButton>
              <StyledRedLink to='/projects' className={classes.buttons}>
                CANCEL
              </StyledRedLink>
              <StyledGreyLink to='/projects' className={classes.buttons}>
                BACK TO PROJECTS
              </StyledGreyLink>
            </form>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CreateProject;
