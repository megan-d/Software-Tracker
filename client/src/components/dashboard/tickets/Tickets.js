import React, { useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TicketContext } from '../../../context/tickets/TicketContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import MaterialTable from 'material-table';

const Tickets = (props) => {
  const sortedPriority = (priority) => {
    switch (priority) {
      case 'Low':
        return 1;
      case 'Medium':
        return 2;
      case 'High':
        return 3;
      case 'Critical':
        return 4;
      default:
        return 1;
    }
  };

  const {
    tickets,
    ticket,
    isLoading,
    getUserTickets,
    clearTickets,
  } = useContext(TicketContext);

  useEffect(() => {
    getUserTickets();
    return () => clearTickets();
  }, []);

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    {
      title: 'Priority',
      field: 'priority',
      customSort: (a, b) => (sortedPriority(a) > sortedPriority(b) ? 1 : -1),
    },
    { title: 'Due date', field: 'dateDue', type: 'date' },
    { title: 'Status', field: 'status' },
  ];

  let history = useHistory();

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      <h2>My Tickets</h2>
          <p>
            View your assigned tickets. Select a ticket to view the ticket
            details.
          </p>
          <hr></hr>
      {isLoading ? (   
          <Spinner />
      ) : tickets.length === 0 ? (
        <p>There are no assigned tickets.</p>
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
                actions: 'View Project',
              },
            }}
            title='Tickets'
            columns={columns}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'View Project',
                onClick: (event, rowData) =>
                  props.history.push(`/projects/${rowData.project._id}`),
              },
            ]}
            data={tickets}
            onRowClick={async (event, rowData) => {
              history.push(`/ticket/${rowData._id}`);
            }}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30],
              toolbar: true,
              paging: true,
              actionsColumnIndex: -1,
              sorting: true,
            }}
          />
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Tickets;
