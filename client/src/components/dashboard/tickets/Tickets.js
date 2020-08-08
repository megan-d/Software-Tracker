import React, { useEffect, useState, useContext, Fragment } from 'react';
import axios from 'axios';
import { AlertContext } from '../../../context/alerts/AlertContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Ticket from './Ticket';
import MaterialTable from 'material-table';

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
    { title: 'Status', field: 'status' }]

  const [state, setState] = useState({
    tickets: null,
  });

  const deleteTicket = () => {
    console.log('deleted')
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

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      <h2>My Tickets</h2>
      <p>View your assigned tickets</p>

      <hr></hr>
      {loading && !state.tickets ? (
        <Spinner />
      ) : (
        <MaterialTable
          localization={{
            header: {
              actions: '',
            },
          }}
          title='Tickets'
          columns={columns}
          data={state.tickets}
          editable={{
            onRowDelete: (oldData) =>
              deleteTicket()
          }}
        />
      )}
    </Wrapper>
  );
};

export default Tickets;
