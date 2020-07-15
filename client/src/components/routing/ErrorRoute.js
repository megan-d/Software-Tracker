import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from '../views/Error';

const ErrorRoute = () => {
  return (
    <div>
      <Switch>
        <Route path='' component={Error} />
      </Switch>
    </div>
  );
};

export default ErrorRoute;
