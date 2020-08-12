import React, { useContext, createContext, useReducer } from 'react';
import TicketReducer from './TicketReducer';
import { AlertContext } from '../alerts/AlertContext';
import axios from 'axios';

//This is similar to the file where you would put your actions if you're using Redux

const initialState = {
  isLoading: true,
  tickets: [],
  ticket: null,
  errors: [],
};

//Initiate context
export const TicketContext = createContext(initialState);

//Create provider and set up reducer
export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TicketReducer, initialState);

  //Consume alert context to be able to use showAlert
  const { showAlert } = useContext(AlertContext);

  //******************** */
  //Add actions that make calls to reducer
  //******************** */

  //*****GET USER'S TICKETS ACTION************
  const getUserTickets = async () => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get('/api/projects/tickets/me', config);
      dispatch({
        type: 'LOAD_USER_TICKETS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      let error = err.response.data;
      if (error) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        await showAlert(error.msg, 'error');
      }
      dispatch({
        type: 'LOAD_USER_TICKETS_FAILURE',
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
        },
      });
    }
  };

  //*****GET TICKET DETAILS ACTION************
  const getTicketDetails = async (id) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios.get(`/api/projects/tickets/ticket/${id}`, config);

      dispatch({
        type: 'LOAD_TICKET_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      let error = err.response.data;
      if (error) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        await showAlert(error.msg, 'error');
      }
      dispatch({
        type: 'LOAD_TICKET_FAILURE',
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
        },
      });
    }
  };

  //*****CREATE NEW TICKET ACTION************
  const createTicket = async (ticket, projectId, history) => {
    //Create config with headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    };

    //Create body variable and stringify
    const body = JSON.stringify(ticket);

    try {
      const res = await axios.post(
        `api/projects/tickets/${projectId}`,
        body,
        config,
      );
      dispatch({
        type: 'CREATE_TICKET_SUCCESS',
        payload: res.data,
      });
      history.push(`/projects/${projectId}`);
    } catch (err) {
      let error = err.response.data;
      if (error) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        showAlert(error.msg, 'error');
      }
      dispatch({
        type: 'CREATE_TICKET_FAILURE',
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
        },
      });
    }
  };

  //*******CLEAR TICKET ACTION**********
  //Clear the ticket so the previously loaded ticket doesn't flash first
  const clearTicket = async () => {
    dispatch({
      type: 'CLEAR_TICKET',
    });
  };

  //Return Ticket Provider
  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        ticket: state.ticket,
        isLoading: state.isLoading,
        errors: state.errors,
        getUserTickets,
        getTicketDetails,
        createTicket,
        clearTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
