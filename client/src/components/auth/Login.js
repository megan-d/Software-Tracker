import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
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
      
      await axios.post('/api/auth/login', body, config);
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
    <div >
      
        <h1 className='title-white-bold subheading login-heading'>
          Login
        </h1>
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
          <input type='submit' value='Login' className='button login-form-button' />
        </form>
      <div className='no-account'>
        <p>Don't have an account?</p>
        <Link to='/register'>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;