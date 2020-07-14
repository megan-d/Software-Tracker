import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/layout/Footer';
import './index.css';
import GlobalStyle from './components/GlobalStyle';
import Dashboard from './components/dashboard/Dashboard';
import Error from './components/views/Error';
import Landing from './components/Landing';
import Projects from './components/dashboard/projects/Projects';
import Tickets from './components/dashboard/tickets/Tickets';
import DashboardContainer from './components/dashboard/DashboardContainer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SideDrawer from './components/layout/sidedrawer/SideDrawer';
import Header from './components/layout/Header';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <GlobalStyle />
      <div className='full-page'>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/login' component={Login} exact />
          <DashboardContainer />
            <Route path='/dashboard' component={Dashboard} exact />
            <Route path='/projects' component={Projects} exact />
            <Route path='/tickets' component={Tickets} exact />
            <Route path='' component={Error} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
