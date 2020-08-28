import React, { useContext, createContext, useReducer } from 'react';
import ProjectReducer from './ProjectReducer';
import { AlertContext } from '../alerts/AlertContext';
import axios from 'axios';

//This is similar to the file where you would put your actions if you're using Redux

const initialState = {
  isLoading: true,
  projects: [],
  project: null,
  errors: null,
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
      
      // if (errors) {
      //   //if errors, loop through them and dispatch the showAlert action from AlertContext
      //   errors.forEach((error) => showAlert(error.msg, 'error'));
      // }
      dispatch({
        type: 'LOAD_USER_PROJECTS_FAILURE',
        payload: err.response.data.errors
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
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
      dispatch({
        type: 'LOAD_PROJECT_FAILURE',
        payload: err.response.data.errors
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
      let errors = err.response.data.errors;
      
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
      
      dispatch({
        type: 'CREATE_PROJECT_FAILURE',
        payload: err.response.data.errors
      });
    }
  };

  //*******CLEAR PROJECT ACTION**********
  //Clear the project so the previously loaded profject doesn't flash first
  const clearProject = async () => {
    dispatch({
      type: 'CLEAR_PROJECT',
    });
  };

  //*******CLEAR PROJECTS ACTION**********
  //Clear the projects
  const clearProjects = async () => {
    dispatch({
      type: 'CLEAR_PROJECTS',
    });
  };

  //*****DELETE PROJECT ACTION************
  const deleteProject = async (id, history) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    try {
      await axios.delete(`/api/projects/${id}`, config);
      dispatch({
        type: 'PROJECT_DELETED',
      });
      history.push('/projects');
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
    }
  };

  //*****UPDATE PROJECT DETAILS ACTION************
  const updateProject = async (edits, id, history) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify(edits);

    try {
      const res = await axios.put(`/api/projects/${id}`, body, config);
      dispatch({
        type: 'UPDATE_PROJECT_SUCCESS',
        payload: res.data,
      });
      history.push(`/projects/${id}`);
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
      dispatch({
        type: 'UPDATE_PROJECT_FAILURE',
        payload: err.response.data.errors
      });
    }
  };

  //*****ADD PROJECT COMMENT ACTION************
  const addComment = async (comment, projectId, history) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify(comment);

    try {
      const res = await axios.put(`/api/projects/comment/${projectId}`, body, config);
      // dispatch({
      //   type: 'ADD_COMMENT_SUCCESS',
      //   payload: res.data,
      // });
      history.push(`/projects/${projectId}`);
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        errors.forEach((el) => showAlert(el.msg, 'error'));
      }
      // dispatch({
      //   type: 'ADD_COMMENT_FAILURE',
      //   payload: err.response.data.errors
      // });
    }
  };

  //Return Project Provider
  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        isLoading: state.isLoading,
        error: state.error,
        getUserProjects,
        createProject,
        clearProject,
        clearProjects,
        getProjectDetails,
        updateProject,
        deleteProject,
        addComment,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
