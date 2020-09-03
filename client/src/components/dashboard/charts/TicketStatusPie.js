import React, { useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../context/auth/AuthContext';
import { TicketContext } from '../../../context/tickets/TicketContext';
import styled from 'styled-components';

const StyledChartDiv = styled.div`
  height: 290px;
`;

const TicketStatusPieChart = ({ profile }) => {
  const {
    ticket,
    tickets,
    isLoading,
    getUserTickets,
    clearTickets,
  } = useContext(TicketContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUserTickets();
    return () => clearTickets();
  }, []);

  const ticketStatuses = {
    assigned: 0,
    inProgress: 0,
    underReview: 0,
  };

  tickets.forEach((ticket) => {});

  const chartData = {
    labels: ['Assigned', 'In Progress', 'Under Review'],
    datasets: [
      {
        label: 'Ticket Status',
        data: [10, 20, 30],
        backgroundColor: ['#eb6e80', '#008f95', '#009f34'],
      },
    ],
  };

  return (
    <StyledChartDiv>
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: 'Pending Tickets By Type',
          },
          legend: {
            display: true,
            position: 'right',
          },
          layout: {
            padding: {
              left: 1,
              right: 1,
            },
          },
        }}
      />
    </StyledChartDiv>
  );
};

export default TicketStatusPieChart;
