import React, { useContext, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Spinner from '../../layout/Spinner';
import { AuthContext } from '../../../context/auth/AuthContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import styled from 'styled-components';

const StyledChartDiv = styled.div`
  height: 300px;
`;

//Minutes of activity over the last 7 days
const TicketsByProjectBar = () => {
  const { user } = useContext(AuthContext);
  const {
    project,
    projects,
    isLoading,
    getUserProjects,
    clearProjects,
  } = useContext(ProjectContext);

  useEffect(() => {
    getUserProjects();
    return () => clearProjects();
  }, []);

  //Create background colors to cycle through
  const colors = [
    'rgba(129, 73, 131, 1)',
    'rgba(233, 176, 0, 1)',
    'rgba(235, 110, 128, 1)',
    'rgba(0, 143, 149, 1)',
    'rgba(103, 181, 65, 0.9)',
    'rgba(42, 27, 61, 0.9)',
  ];

  //filter all of the projects to only include onces that the current user owns (their project)
  let filteredProjects = projects.filter((el) => el.owner === user._id);
  //Create object to keep track of how many tickets for each project
  const projectTickets = {};
  filteredProjects.forEach((el) => {
    projectTickets[el.name] = el.tickets.length
  });
  

  //To display the duration for each category, get the values of each key with Object.values
  const chartData = {
    labels: [...Object.keys(projectTickets)],
    datasets: [
      {
        label: ['Number of Tickets'],
        data: Object.values(projectTickets),
        borderWidth: '3',
        //Create function to cycle through colors so if more activities than colors it will loop around and reuse the same colors instead of gray
        backgroundColor: () => {
          let backgroundColors = [];
          for (let i = 0; i < projects.length; i++) {
            backgroundColors.push(colors[i % colors.length]);
          }
          return backgroundColors;
        },
      },
    ],
  };

  return (
    <div className='chart chart-3'>
      {isLoading && !projects ? (
        <Spinner />
      ) : (
        <StyledChartDiv>
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              title: {
                display: true,
                text: 'My Total Tickets by Project',
                fontSize: 14
              },
              legend: {
                display: false,
                position: 'bottom',
                align: 'center',
              },
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Total Tickets',
                      fontSize: 14
                    },
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                    },
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: 'Project Name',
                      fontSize: 14
                    },
                  },
                ],
              },
            }}
          />
        </StyledChartDiv>
      )}
    </div>
  );
};

export default TicketsByProjectBar;
