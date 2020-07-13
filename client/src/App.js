import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import './index.css';
import GlobalStyle from './components/GlobalStyle';
import DeveloperDashboard from './components/dashboards/DeveloperDashboard';
import Error from './components/views/Error';
import Landing from './components/Landing';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <div className='full-page'>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/dashboard' component={DeveloperDashboard} exact />
          <Route path='' component={Error} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
