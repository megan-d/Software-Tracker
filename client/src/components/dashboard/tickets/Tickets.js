import React, { useEffect, useState, useContext, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { AlertContext } from '../../../context/alerts/AlertContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import MaterialTable from 'material-table';
import Ticket from './Ticket';

const Tickets = () => {
  const { showAlert } = useContext(AlertContext);

  const [loading, setLoading] = useState({
    loading: true,
  });

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    { title: 'Priority', field: 'priority' },
    { title: 'Due date', field: 'dateDue', type: 'date' },
    { title: 'Status', field: 'status' },
  ];

  const [state, setState] = useState({
    tickets: null,
    ticket: null,
    isClicked: false,
  });

  const deleteTicket = () => {
    console.log('deleted');
  };

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
      setLoading({ loading: false });
      setState({
        ...state,
        tickets: [...res.data],
      });
    } catch (err) {
      let error = err.response.data;
      if (error) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        await showAlert(error.msg, 'error');
      }
    }
  };

  useEffect(() => {
    getUserTickets();
  }, []);

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
      setLoading({ loading: false });
      setState({
        ...state,
        ticket: res.data,
      });
    } catch (err) {
      let error = err.response.data;
      if (error) {
        //if errors, loop through them and dispatch the showAlert action from AlertContext
        await showAlert(error.msg, 'error');
      }
    }
  };

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      {state.isClicked ? (
        <Ticket ticket={state.ticket}/>
      ) : loading && !state.tickets ? (
        <Fragment>
          <h2>My Tickets</h2>
          <p>
            View your assigned tickets. Select a ticket to view the ticket
            details.
          </p>
          <hr></hr>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <h2>My Tickets</h2>
          <p>
            View your assigned tickets. Select a ticket to view the ticket
            details.
          </p>
          <hr></hr>
          <MaterialTable
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Tickets'
            columns={columns}
            data={state.tickets}
            onRowClick={async (event, rowData) => {
              await getTicketDetails(rowData._id);
              setState({
                ...state,
                isClicked: true,
              });
            }}
          />
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Tickets;
