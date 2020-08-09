import React, { useContext, createContext, useReducer } from 'react';
import ProjectReducer from './ProjectReducer';
import { AlertContext } from '../alerts/AlertContext';
import axios from 'axios';

//This is similar to the file where you would put your actions if you're using Redux

const initialState = {
  isLoading: true,
  projects: [],
  project: null,
  errors: [],
};

//Initiate context
export const ProjectContext = createContext(initialState);

//Create provider and set up reducer
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  //Consume alert context to be able to use showAlert
  const { showAlert } = useContext(AlertContext);

  //******************** */
  //Add actions that make calls to reducer
  //******************** */

  //*****GET USER'S PROJECTS ACTION************
  const getUserProjects = async (user) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get('/api/projects/me', config);
      dispatch({
        type: 'LOAD_USER_PROJECTS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((error) => showAlert(error.msg, 'error'));
      }
      dispatch({
        type: 'LOAD_USER_PROJECTS_FAILURE',
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
        },
      });
    }
  };

  //*****GET PROJECT BY ID ACTION************
  const getProjectDetails = async (id) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get(`/api/projects/${id}`, config);

      dispatch({
        type: 'LOAD_PROJECT_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      let error = err.response.data;
      if (error) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        await showAlert(error.msg, 'error');
      }
      dispatch({
        type: 'LOAD_PROJECT_FAILURE',
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
        },
      });
    }
  };

  
  //*****CREATE NEW PROJECT ACTION************
  const createProject = async (project, history) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    //Create body variable and stringify
    const body = JSON.stringify(project);

    try {
      const res = await axios.post('/api/projects', body, config);
      dispatch({
        type: 'CREATE_PROJECT_SUCCESS',
        payload: res.data,
      });
      history.push('/projects');
    } catch (err) {
      let error = err.response.data;
      if (error) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        showAlert(error.msg, 'error');
      }
      dispatch({
        type: 'CREATE_PROJECT_FAILURE',
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
        },
      });
    }
  };

  //*******CLEAR PROJECT ACTION**********
  //Clear the project so the previously loaded profject doesn't flash first
  const clearProject = async() => {
    dispatch({
        type: 'CLEAR_PROJECT',
      });
  }

  //Return Project Provider
  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        isLoading: state.isLoading,
        errors: state.errors,
        getUserProjects,
        createProject,
        clearProject,
        getProjectDetails
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
