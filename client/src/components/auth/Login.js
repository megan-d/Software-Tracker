import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlainHeader from '../layout/PlainHeader';
import AlertBanner from '../layout/AlertBanner';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '300px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [formData, updateFormData] = useState({
    email: '',
    password: '',
  });

  //Pull out variables from formData
  const { email, password } = formData;

  //Function to update state on change and put into updateFormData variable
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    //Create variable for user's email and password entered
    const user = {
      email: email,
      password: password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(user);
    try {
      const res = await axios.post('/api/auth/login', body, config);
      //set isAuthenticated to true once have state implemented
    } catch (err) {
      //If errors, get array of errors and loop through them and dispatch setAlert
      const errors = err.response.data.errors;
      if (errors) {
        console.log(errors);
      }
    }
  };

  //Redirect to dashboard if logged in
  // if (props.isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <PlainHeader />
      <div className={classes.paper}>
        <AlertBanner />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className='form' action='' onSubmit={(e) => onSubmit(e)}>
          <div className='form-container'>
            <div className='form-group'>
              <label>
                Email:
                <input
                  type='email'
                  name='email'
                  placeholder=''
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Password:
                <input
                  type='password'
                  name='password'
                  placeholder=''
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
          </div>
          <input
            type='submit'
            value='Login'
            className='button login-form-button'
          />
        </form>
        <div className='no-account'>
          <p>Don't have an account?</p>
          <Link to='/register'>Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
