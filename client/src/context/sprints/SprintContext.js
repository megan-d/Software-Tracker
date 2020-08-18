import React, { useContext, createContext, useReducer } from 'react';
import SprintReducer from './SprintReducer';
import { AlertContext } from '../alerts/AlertContext';
import axios from 'axios';

//This is similar to the file where you would put your actions if you're using Redux

const initialState = {
  isLoading: true,
  sprints: [],
  sprint: null,
  errors: [],
};

//Initiate context
export const SprintContext = createContext(initialState);

//Create provider and set up reducer
export const SprintProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SprintReducer, initialState);

  //Consume alert context to be able to use showAlert
  const { showAlert } = useContext(AlertContext);

  //******************** */
  //Add actions that make calls to reducer
  //******************** */

  //*****GET USER'S SPRINTS ACTION************
  const getUserSprints = async () => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get('/api/projects/sprints/me', config);
      dispatch({
        type: 'LOAD_USER_SPRINTS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      let errors = err.response.data.errors;
      // if (errors) {
      //   //if errors, loop through them and dispatch the showAlert action from AlertContext
      //   await errors.forEach((el) => showAlert(el.msg, 'error'));
      // }
      dispatch({
        type: 'LOAD_USER_SPRINTS_FAILURE',
        payload: err.response.data.errors,
      });
    }
  };

  //*****CREATE NEW SPRINT ACTION************
  const addSprint = async (sprint, projectId, history) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    //Create body variable and stringify
    const body = JSON.stringify(sprint);

    try {
      const res = await axios.post(`/api/projects/sprints/${projectId}`, body, config);
      dispatch({
        type: 'CREATE_SPRINT_SUCCESS',
        payload: res.data,
      });
      history.push(`/projects/${projectId}`);
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
      dispatch({
        type: 'CREATE_SPRINT_FAILURE',
        payload: err.response.data.errors,
      });
    }
  };

  //Return Sprint Provider
  return (
    <SprintContext.Provider
      value={{
        sprints: state.sprints,
        sprint: state.sprint,
        isLoading: state.isLoading,
        errors: state.errors,
        getUserSprints,
        addSprint
      }}
    >
      {children}
    </SprintContext.Provider>
  );
};
