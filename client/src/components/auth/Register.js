import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PlainHeader from '../layout/PlainHeader';
import AlertBanner from '../layout/AlertBanner';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import image from '../../assets/images/working.jpg';
import { AuthContext } from '../../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

const Register = (props, value) => {
  const classes = useStyles();
  const [formData, updateFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  //Use AuthContext
  const{userData, setUserData} = useContext(AuthContext);

  //Pull out variables from formData and userData
  const { name, username, email, password, confirmPassword, role } = formData;

  const { token, isLoading, user, isAuthenticated, userErrors } = userData;

  //Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      username: username,
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
    //TO DO*************
    //set state accordingly (isLoading: false, isAuthenticated: true, token, user)
    //Call load user function and redirect to user's dashboard
    try {
      setUserData({
        ...userData,
        isLoading: true
      })
      //Axios will return promise with response in route to add new user (should return a token)
      const res = await axios.post('/api/users', body, config);
      const tokenRes = res.data.token;
      if (tokenRes) {
        localStorage.setItem('token', tokenRes);
        setUserData({ 
          ...userData,
          token: tokenRes 
        });
      }
        setUserData({
          ...userData,
          isLoading: false,
          isAuthenticated: true,
          user: res.user,
      });
    } catch (err) {
      //If errors, get array of errors and loop through them and dispatch setAlert
      const errors = err.response.data.errors;
      if (errors) {
        setUserData({ 
          ...userData,
          userErrors: errors });
        //remove errors within 3 seconds
        setTimeout(() => setUserData({ userErrors: null }), 3000);
      }
    }
  };

  //If isAuthenticated, redirect to their dashboard. Will need a function to run on mounting of Dashboard that will load the dashboard for that specific user.
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <PlainHeader />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          {userErrors && <AlertBanner errors={userErrors} />}
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
              label='Name'
              autoFocus
              value={name}
              onChange={(e) => onChange(e)}
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
              value={username}
              onChange={(e) => onChange(e)}
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
              value={email}
              onChange={(e) => onChange(e)}
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
              value={password}
              onChange={(e) => onChange(e)}
              margin='normal'
            />

            <TextField
              variant='outlined'
              required
              fullWidth
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => onChange(e)}
              margin='normal'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
