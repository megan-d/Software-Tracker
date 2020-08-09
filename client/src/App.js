import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import GlobalStyle from './components/GlobalStyle';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Error from './components/views/Error';
import { AuthContext } from './context/auth/AuthContext';
import DeveloperDashboard from './components/dashboard/developer/DeveloperDashboard';
import Projects from './components/dashboard/projects/Projects';
import Project from './components/dashboard/projects/Project';
import CreateProject from './components/dashboard/projects/CreateProject';
import Tickets from './components/dashboard/tickets/Tickets';
import Sprints from './components/dashboard/sprints/Sprints';
import SubmitTicket from './components/dashboard/tickets/SubmitTicket';
import Ticket from './components/dashboard/tickets/Ticket';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import Forum from './components/forum/Forum';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
  const { loadUser } = useContext(AuthContext);

  //run loadUser upon App component initially mounting (like component did mount - will only run once with empty array)
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <CssBaseline />
      <GlobalStyle />
      <div className='full-page'>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/login' component={Login} exact />
          <PrivateRoute
            path='/dashboard'
            component={DeveloperDashboard}
            exact
          />
          <PrivateRoute path='/createproject' component={CreateProject} exact />
          <PrivateRoute path='/projects' component={Projects} exact />
          <PrivateRoute path='/projects/:id' component={Project} exact />
          <PrivateRoute path='/tickets' component={Tickets} exact />
          <PrivateRoute path='/ticket/:id' component={Ticket} exact />
          <PrivateRoute path='/submit' component={SubmitTicket} exact />
          <PrivateRoute path='/sprints' component={Sprints} exact />
          <PrivateRoute path='/profile' component={Profile} exact />
          <PrivateRoute path='/profiles' component={Profiles} exact />
          <PrivateRoute path='/forum' component={Forum} exact />
          <Route path='' component={Error} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
