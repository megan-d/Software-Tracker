import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlainHeader from '../layout/PlainHeader';
import AlertBanner from '../layout/AlertBanner';
import { Link, Redirect } from 'react-router-dom';

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

export default function Register() {
  const classes = useStyles();
  const [formData, updateFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [isAuthenticated, setAuthenticated] = useState(false);

  //Pull out variables from formData
  const { name, email, password, confirmPassword, role } = formData;

  //Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: role,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(user);
    try {
      //Axios will return promise with response in route to add new user (should return a token)
      const res = await axios.post('/api/users', body, config);
      const token = res.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }

      //Set state is isAuthenticated upon registration
      setAuthenticated(true);

    } catch (err) {
      //If errors, get array of errors and loop through them and dispatch setAlert
      const errors = err.response.data.errors;
      if (errors) {
        console.log(errors);
      }
    }
  };

  //If isAuthenticated, redirect to their dashboard. Will need a function to run on mounting of Dashboard that will load the dashboard for that specific user.
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

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
          Register
        </Typography>
        <form className='form-right' action='' onSubmit={(e) => onSubmit(e)}>
          <div className='form-container-signup'>
            <div className='form-group'>
              <label>
                Name:
                <input
                  type='text'
                  name='name'
                  placeholder=''
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Email:
                <input
                  type='email'
                  name='email'
                  placeholder=''
                  value={email}
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
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Confirm Password:
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder=''
                  value={confirmPassword}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div className='form-group'>
              <select name='role' id='role' onChange={(e) => onChange(e)}>
              <option value=''>Please select your typical project role...</option>
                <option value='developer'>Developer</option>
                <option value='manager'>Manager</option>
              </select>
            </div>
          </div>
          <input
            type='submit'
            value='Sign Up'
            className='button login-form-button'
          />
        </form>
        <p>Already have an account?</p>
        <Link to='/login'>Log In</Link>
      </div>
    </Container>
  );
}
