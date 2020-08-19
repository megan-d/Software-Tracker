import React, { useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { TicketContext } from '../../../context/tickets/TicketContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import MaterialTable from 'material-table';

const Tickets = (props) => {

  const { tickets, ticket, isLoading, getUserTickets, clearTicket } = useContext(TicketContext);

  useEffect(() => {
    getUserTickets();
    clearTicket();
  }, []);

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    { title: 'Priority', field: 'priority' },
    { title: 'Due date', field: 'dateDue', type: 'date' },
    { title: 'Status', field: 'status' },
  ];

  let history = useHistory();

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      {isLoading && !ticket ? (
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
            data={tickets}
            onRowClick={async (event, rowData) => {
              history.push(`/ticket/${rowData._id}`)
            }}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30],
              toolbar: true,
              paging: true,
          }}
          />
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Tickets;
