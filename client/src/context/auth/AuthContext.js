import React, { useState, createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';

//This is similar to the file where you would put your actions if you're using Redux

const initialState = {
  token: localStorage.getItem('token'),
  isLoading: true,
  user: null,
  isAuthenticated: false,
  userErrors: null
};

//Initiate context
export const AuthContext = createContext(initialState);

//Create provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  
//Add actions that make calls to reducer

  //*****REGISTER ACTION************
  const register = async (user) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //Create body and stringify user object
    const data = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
    };
    const body = JSON.stringify(data);
    try {
      const res = await axios.post('/api/users', body, config);
      const token = res.data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      
      console.log(res.data);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      let errors = err.response.data.errors;
      console.log(errors);
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: errors
      });
    }
  };

  //*****LOGIN ACTION************



  //*****LOAD USER ACTION************
  const loadUser = async (user) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    }
    try {
      const res = await axios.get('/api/users', config);
      console.log(res);
      dispatch({
        type: 'LOAD_USER_SUCCESS',
        payload: res.data,
      });

    } catch (err) {
      let errors = err.response.data.errors;
      dispatch({
        type: 'LOAD_USER_FAILURE',
        payload: errors
      });
    }
  };


  //*****LOGOUT USER ACTION************
  const logoutUser = async () => {
    dispatch({
      type: 'LOGOUT'
    });
    //TODO: Need to set up action to clear user profile if I set up profile as separate state
  }

  
  //Return Auth Provider
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isLoading: state.isLoading,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        register, 
        loadUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
