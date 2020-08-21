import React, { Fragment, useContext, useEffect, useHistory } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { SprintContext } from '../../../context/sprints/SprintContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: white;
  background: grey;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 160px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  font-family: Roboto, sans-serif;
`;

const Sprint = (props) => {
  const { sprint, getSprintDetails, deleteSprint, isLoading, getProjectForSprint } = useContext(
    SprintContext,
  );

  const ticketColumns = [
    { title: 'Title', field: 'title' },
    { title: 'Type', field: 'type' },
    { title: 'Priority', field: 'priority' },
    { title: 'Due date', field: 'dateDue', type: 'date' },
    { title: 'Status', field: 'status' },
    // { title: 'Assigned Dev', field: 'assignedDeveloper' },
  ];

  // let history = useHistory();

  useEffect(() => {
    getSprintDetails(props.match.params.sprintid);
  }, []);

  return (
    <Wrapper>
      {!sprint || isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <GroupWorkIcon />
          <div>{sprint.title}</div>
          <div>{sprint.description}</div>
          <ul>Sprint comments:</ul>
          {sprint.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this sprint</p>
          ) : (
            sprint.comments.map((el) => <li key={el._id}>{el.text}</li>)
          )}
          <MaterialTable
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Tickets'
            columns={ticketColumns}
            data={sprint.tickets.map((el) => {
              return {
                id: el._id,
                title: el.title,
                type: el.type,
                priority: el.priority,
                dateDue: el.dateDue,
                status: el.status,
                // assignedDeveloper: <AvatarIcon user={'H'} />,
              };
            })}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30],
              toolbar: true,
              paging: true,
              options: {
                rowStyle: {
                  padding: '0px',
                },
              },
            }}
            onRowClick={async (event, rowData) => {
              props.history.push(`/ticket/${rowData.id}`);
            }}
          />
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/sprints/comment/${sprint._id}`}
          >
            Comment on Sprint
          </StyledLink>
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/sprints/updatesprint/${sprint._id}`}
          >
            Edit Sprint
          </StyledLink>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={async () =>
              deleteSprint(sprint.project._id, sprint._id, props.history)
            }
          >
            Delete Sprint
          </Button>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Sprint;
