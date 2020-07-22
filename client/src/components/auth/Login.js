import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlainHeader from '../layout/PlainHeader';
import AlertBanner from '../layout/AlertBanner';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
}));

const Login = (props) => {
  const classes = useStyles();
  const [formData, updateFormData] = useState({
    email: '',
    password: '',
  });

  //Pull out variables from formData
  const { email, password } = formData;

  const [userData, setUserData] = useState({
    isLoading: true,
    profile: null,
    userErrors: null,
  });

  const { isLoading, profile, userErrors } = userData;

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
      const res = await axios.post('/api/auth', body, config);
      const token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);
      }

      //TO DO*************
      //set state accordingly (isLoading: false, isAuthenticated: true, token, user)
      //Call load user function and redirect to user's dashboard
      //Set up alert messages below for errors
    } catch (err) {
      //If errors, get array of errors and loop through them and dispatch setAlert
      const errors = err.response.data.errors;
      if (errors) {
        setUserData({ userErrors: errors });
        setTimeout(() => setUserData({ userErrors: null }), 3000);
      }
      //set state for failed login
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        {userErrors && <AlertBanner errors={userErrors} />}
        <form
          className={classes.form}
          action=''
          onSubmit={(e) => onSubmit(e)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;

{
  /* <div className='form-container'>
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
      </div> */
}
