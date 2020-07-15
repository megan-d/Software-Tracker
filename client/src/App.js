import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/layout/Footer';
import './index.css';
import GlobalStyle from './components/GlobalStyle';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardRoutes from './components/routing/DashboardRoutes';
import Error from './components/views/Error';

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
          <Route component={DashboardRoutes} />
          <Route path='' component={Error} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
