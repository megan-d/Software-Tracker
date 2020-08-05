import React, { useEffect } from 'react';
import axios from 'axios';
import Wrapper from '../../layout/Wrapper';

let state = {
  projects: []
};

const Projects = (props) => {
  
  const getProjects = async () => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get('api/projects/me', config);
      state.projects = [...res.data];
      console.log(state.projects);
    } catch (err) {
      let errors = err.response.data.errors;
      if (errors) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        // errors.forEach((error) => showAlert(error.msg, 'error'));
        console.log(errors);
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <Wrapper>
      <h2>Projects</h2>
      <p>View your own projects as well as projects you are a collaborator on</p>
      <hr></hr>
      <h3>My Projects</h3>
      {state.projects.map(el => {
        return <p>{el.name}</p>
        })}
      <h3>Projects I'm collaborating on</h3>
    </Wrapper>
  );
};

export default Projects;
