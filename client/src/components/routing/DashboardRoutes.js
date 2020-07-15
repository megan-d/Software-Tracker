import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Error from '../views/Error';
import Wrapper from '../layout/Wrapper';
import DeveloperDashboard from '../dashboard/developer/DeveloperDashboard';
import Projects from '../dashboard/projects/Projects';
import Tickets from '../dashboard/tickets/Tickets';
import Sprints from '../dashboard/sprints/Sprints';
import SubmitTicket from '../dashboard/tickets/SubmitTicket';
import Profile from '../auth/Profile';

const DashboardRoutes = () => {
  return (
    <div>
      <Wrapper >
        <Switch>
          <Route path='/dashboard' component={DeveloperDashboard} exact />
          <Route path='/projects' component={Projects} exact />
          <Route path='/tickets' component={Tickets} exact />
          <Route path='/sprints' component={Sprints} exact />
          <Route path='/submit' component={SubmitTicket} exact />
          <Route path='/profile' component={Profile} exact />
          <Route path='' component={Error} />
        </Switch>
      </Wrapper>
    </div>
  );
};

export default withRouter(DashboardRoutes);
