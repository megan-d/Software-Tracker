import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Footer from './components/layout/Footer';
import './index.css';

const App = () => {
  return (
    <div className='full-page-grow'>
      <h1>Welcome to the Software Tracker! Glad to have you here!</h1>
      <Button>Try Me</Button>
    </div>
      
  );
};

export default App;
