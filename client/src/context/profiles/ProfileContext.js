import React, { useContext, createContext, useReducer } from 'react';
import ProfileReducer from './ProfileReducer';
import { AlertContext } from '../alerts/AlertContext';
import axios from 'axios';

//This is similar to the file where you would put your actions if you're using Redux

const initialState = {
  isLoading: true,
  profiles: [],
  profile: null,
  errors: null,
};

//Initiate context
export const ProfileContext = createContext(initialState);

//Create provider and set up reducer
export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  //Consume alert context to be able to use showAlert
  const { showAlert } = useContext(AlertContext);

  //******************** */
  //Add actions that make calls to reducer
  //******************** */

  //*****GET CURRENT USER'S PROFILE ACTION************
  const getCurrentUserProfile = async (user) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get('/api/profiles/me', config);
      dispatch({
        type: 'LOAD_USER_PROFILE_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      let errors = err.response.data.errors;
      
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((error) => showAlert(error.msg, 'error'));
      }
      dispatch({
        type: 'LOAD_USER_PROFILE_FAILURE',
        payload: err.response.data.errors
      });
    }
    };

    //*****GET PROFILE BY USER ID ACTION************
  const getProfileById = async (userId) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get(`/api/profiles/user/${userId}`, config);

      dispatch({
        type: 'LOAD_USER_PROFILE_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
      dispatch({
        type: 'LOAD_USER_PROFILE_FAILURE',
        payload: err.response.data.errors
      });
    }
  };

  //*****CREATE NEW PROFILE ACTION************
  const createProfile = async (profile, history) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    //Create body variable and stringify
    const body = JSON.stringify(profile);
    
    try {
      const res = await axios.post('/api/profiles', body, config);
      dispatch({
        type: 'CREATE_USER_PROFILE_SUCCESS',
        payload: res.data,
      });
      // history.push(`/profiles/${user._id}`);
    } catch (err) {
      let errors = err.response.data.errors;
      
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
      
      dispatch({
        type: 'CREATE_USER_PROFILE_FAILURE',
        payload: err.response.data.errors
      });
    }
  };

  //*******CLEAR PROFILE ACTION**********
  //Clear the project so the previously loaded profject doesn't flash first
  const clearProfile = async () => {
    dispatch({
      type: 'CLEAR_USER_PROFILE',
    });
  };

  //*******CLEAR PROFILES ACTION**********
  //Clear the projects
  const clearProfiles = async () => {
    dispatch({
      type: 'CLEAR_PROFILES',
    });
  };


  //Return Profile Provider
  return (
    <ProfileContext.Provider
      value={{
        profiles: state.profiles,
        profile: state.profile,
        isLoading: state.isLoading,
        error: state.error,
        getCurrentUserProfile,
        getProfileById,
        clearProfile,
        clearProfiles,
        createProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};