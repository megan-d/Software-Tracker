import React, { useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { TicketContext } from '../../../context/tickets/TicketContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import MaterialTable from 'material-table';

const Sprints = () => {

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
          <h2>My Sprints</h2>
          <p>
            View your active sprints. Select a sprint to view details.
          </p>
          <hr></hr>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <h2>My Sprints</h2>
          <p>
            View your active sprints. Select a sprint to view details.
          </p>
          <hr></hr>
          <MaterialTable
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Sprints'
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

export default Sprints;

