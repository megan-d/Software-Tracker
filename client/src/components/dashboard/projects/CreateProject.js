import React, { useEffect } from 'react';
import axios from 'axios';
import Wrapper from '../../layout/Wrapper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AlertBanner from '../../layout/AlertBanner';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
}));

//Function to update state on change using updateFormData
// const onChange = (e) =>
// updateFormData({ ...formData, [e.target.name]: e.target.value });

//Function to send data that's in formData to database endpoint when submit is clicked
// const onSubmit = async (e) => {
// e.preventDefault();
// const project = {
  
// };
// //call register action
// // await register(project);
// };

const CreateProject = (props) => {
  const classes = useStyles();

  return (
    <Wrapper>
      <h2>Create a New Project</h2>
      <hr></hr>

      <Grid container component='main' className={classes.root}>
      <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <AlertBanner />
          <form
            className={classes.form}
            action=''
            // onSubmit={}
          >
            <TextField
              autoComplete='name'
              name='name'
              variant='outlined'
              required
              fullWidth
              id='name'
              label='Name'
              autoFocus
            //   value={}
            //   onChange={}
              margin='normal'
            />
            <TextField
              autoComplete='username'
              name='username'
              variant='outlined'
              required
              fullWidth
              id='username'
              label='Username'
              autoFocus
            //   value={}
            //   onChange={}
              margin='normal'
            />

            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
            //   value={}
            //   onChange={}
              margin='normal'
            />

            <TextField
              variant='outlined'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
            //   value={}
            //   onChange={}
              margin='normal'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
      <Button variant='contained' color='primary'>
        Submit
      </Button>
      <Button variant='contained' color='secondary' href='/projects'>
        Cancel
      </Button>
      <Button variant='contained' color='default' href='/projects'>
        Back to Project List
      </Button>
    </Wrapper>
  );
};

export default CreateProject;
