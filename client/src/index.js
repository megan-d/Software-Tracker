import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from '../src/context/auth/AuthContext';
import { AlertProvider } from '../src/context/alerts/AlertContext';
import { ProjectProvider } from './context/projects/ProjectContext';
import { TicketProvider } from './context/tickets/TicketContext';
import { SprintProvider } from './context/sprints/SprintContext';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        <ProjectProvider>
          <TicketProvider>
            <SprintProvider>
              <App />
            </SprintProvider>
          </TicketProvider>
        </ProjectProvider>
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
