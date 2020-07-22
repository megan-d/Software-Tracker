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
import Spinner from '../layout/Spinner';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  roleSelect: {
    minWidth: '400px'
  }
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

  const [userData, setUserData] = useState({
    isLoading: true,
    profile: null,
    userErrors: null,
  });

  //Pull out variables from formData and userData
  const { name, email, password, confirmPassword, role } = formData;

  const { isLoading, profile, userErrors } = userData;

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
      //TO DO*************
      //set state accordingly (isLoading: false, isAuthenticated: true, token, user)
      //Call load user function and redirect to user's dashboard
      //Set up alert messages below for errors
      //Set state is isAuthenticated upon registration
    } catch (err) {
      //If errors, get array of errors and loop through them and dispatch setAlert
      const errors = err.response.data.errors;
      if (errors) {
        setUserData({ userErrors: errors });
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
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <PlainHeader />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        {userErrors && <AlertBanner errors={userErrors} />}
        <form className={classes.form} action='' onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <FormControl className={classes.formControl}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role-select"
          value={role}
          name='role'
          onChange={(e) => onChange(e)}
          className={classes.roleSelect}
        >
          <MenuItem value='developer'>Developer</MenuItem>
          <MenuItem value='manager'>Manager</MenuItem>
        </Select>
        <FormHelperText>Please select your typical project role</FormHelperText>
      </FormControl>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

{
  /* <div className='form-container-signup'>
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
            </div> */
}
//     <div className='form-group'>
//       <label>
//         Password:
//         <input
//           type='password'
//           name='password'
//           placeholder=''
//           value={password}
//           onChange={(e) => onChange(e)}
//           required
//         />
//       </label>
//     </div>
//     <div className='form-group'>
//       <label>
//         Confirm Password:
//         <input
//           type='password'
//           name='confirmPassword'
//           placeholder=''
//           value={confirmPassword}
//           onChange={(e) => onChange(e)}
//           required
//         />
//       </label>
//     </div>
//     <div className='form-group'>
//       <select name='role' id='role' onChange={(e) => onChange(e)}>
//         <option value=''>
//           Please select your typical project role...
//         </option>
//         <option value='developer'>Developer</option>
//         <option value='manager'>Manager</option>
//       </select>
//     </div>
//   </div>
//   <input
//     type='submit'
//     value='Sign Up'
//     className='button login-form-button'
//   />
// </form>
// <p>Already have an account?</p>
// <Link to='/login'>Log In</Link> */}
