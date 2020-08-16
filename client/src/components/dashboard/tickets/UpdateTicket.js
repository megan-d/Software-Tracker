import React, { useContext, useEffect } from 'react';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import { TicketContext } from '../../../context/tickets/TicketContext';

const UpdateTicket = (props) => {
 
  const { ticket, getTicketDetails } = useContext(TicketContext);

  return (
    <Wrapper>
      <p>Update ticket</p>
    </Wrapper>
  
  );
};

export default UpdateTicket;