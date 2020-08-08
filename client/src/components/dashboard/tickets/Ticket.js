import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AlertContext } from '../../../context/alerts/AlertContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import MaterialTable from 'material-table';

const Ticket = ({ ticket }) => {
  const { showAlert } = useContext(AlertContext);

  const deleteTicket = () => {
    console.log('deleted');
  };

  console.log(ticket);
  return (
  <div>This is a ticket.
  </div>
  );
};

export default Ticket;
