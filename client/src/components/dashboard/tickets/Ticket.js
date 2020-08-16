import React, { Fragment, useContext, useEffect } from 'react';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

const Ticket = (props) => {
  const { ticket, getTicketDetails, deleteTicket } = useContext(TicketContext);
  const { project } = useContext(ProjectContext);

  // const deleteTicket = () => {
  //   console.log('deleted');
  // };

  useEffect(() => {
    getTicketDetails(props.match.params.id);
  }, []);

  return (
    <Wrapper>
      {!ticket ? (
        <Spinner />
      ) : (
        <Fragment>
          <ConfirmationNumberIcon />
          <div>{ticket.title}</div>
          <div>{ticket.description}</div>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={async () =>
              deleteTicket(project._id, ticket._id, props.history)
            }
          >
            Delete Ticket
          </Button>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Ticket;
