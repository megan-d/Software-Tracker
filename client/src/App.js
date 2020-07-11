import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Footer from './components/layout/Footer';
import './index.css';
import GlobalStyle from './components/GlobalStyle';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <div className='full-page'>
        <h1>Welcome to the Software Tracker! Glad to have you here!</h1>
        <Button>Try Me</Button>
      </div>
      <Footer />
    </Fragment>
  );
};

export default App;
