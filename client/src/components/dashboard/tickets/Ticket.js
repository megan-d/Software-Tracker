import React, { useContext, useEffect } from 'react';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import { TicketContext } from '../../../context/tickets/TicketContext';

const Ticket = (props) => {
 
  const { ticket, isLoading, getTicketDetails } = useContext(TicketContext);

  const deleteTicket = () => {
    console.log('deleted');
  };

  useEffect(() => {
    getTicketDetails(props.match.params.id);
  }, []);

  return (
    <Wrapper>
      {!ticket ? (<Spinner />) : (
        <div>{ticket.title}</div>
      )}
    </Wrapper>
  
  );
};

export default Ticket;
