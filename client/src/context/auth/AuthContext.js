import React, { useState, createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';

//This is similar to the file where you would put your actions if you're using Redux

const initialState = {
  token: localStorage.getItem('token'),
  isLoading: true,
  user: null,
  isAuthenticated: false,
  userErrors: {}
};

//Initiate context
export const AuthContext = createContext(initialState);

//Create provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  
  //Add actions that make calls to reducer
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
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      // dispatch(loadUser());
    } catch (err) {
      let errors = err.response.data.errors;
      setTimeout(() => errors = {}, 3000);
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: errors
      });
    }
  };


  //Return Auth Provider
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isLoading: state.isLoading,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
