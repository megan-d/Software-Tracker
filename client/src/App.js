import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Footer from './components/layout/Footer';
import './index.css';
import GlobalStyle from './components/GlobalStyle';
import DeveloperDashboard from './components/dashboards/DeveloperDashboard';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <div className='full-page'>
        
        <Switch>
          <Route path='/dashboard' component={DeveloperDashboard} exact/>
        </Switch>
      </div>
      <Footer />
    </Router>
      
  );
};

export default App;
