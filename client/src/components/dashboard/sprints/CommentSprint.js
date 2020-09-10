import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import AlertBanner from '../../layout/AlertBanner';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { SprintContext } from '../../../context/sprints/SprintContext';
import styled from 'styled-components';

const StyledGreyLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #808080;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  width: 160px;
  max-width: 160px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0px;
  display: block;
  height: 40px;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const StyledRedLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #f50757;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  width: 80px;
  max-width: 160px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  height: 40px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const StyledBlueButton = styled.button`
  color: white;
  font-family: Roboto, sans-serif;
  cursor: pointer;
  background-color: #3f51b5;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  width: 80px;
  max-width: 160px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  height: 40px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#204051',
    },
    '& label.Mui-focused': {
      color: '#204051',
    },
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttons: {
    marginRight: '10px',
    marginTop: '20px',
  },
}));

const CommentSprint = (props) => {
  const classes = useStyles();

  const [formData, updateFormData] = useState({
    comment: '',
  });

  //Pull out variables from formData and userData
  const { comment } = formData;

  const { sprint, isLoading, addSprintComment, getSprintDetails } = useContext(
    SprintContext,
  );


  useEffect(() => {
    getSprintDetails(props.match.params.sprintid);
  }, []);

  // Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
    };
    //call add comment action
    await addSprintComment(newComment, sprint._id, props.history);
  };

  return (
    <Wrapper>
      {!sprint ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2 className='page-heading'>Comment on Sprint</h2>
          <p>Sprint: {sprint.title}</p>
          <hr className='hr'></hr>

          <Grid container component='main' className={classes.root}>
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <form
                  className={classes.form}
                  action=''
                  onSubmit={(e) => onSubmit(e)}
                >
                  <TextField
                    name='comment'
                    variant='outlined'
                    required
                    fullWidth
                    id='comment'
                    label='Comment'
                    autoFocus
                    value={comment}
                    onChange={(e) => onChange(e)}
                    multiline
                    rows={6}
                    margin='normal'
                  />

                  <AlertBanner />
                  <StyledBlueButton
                    type='submit'
                    className={classes.buttons}
                    onClick={(e) => onSubmit(e)}
                  >
                    SUBMIT
                  </StyledBlueButton>
                  <StyledRedLink
                    to={`/sprint/${sprint._id}`}
                    className={classes.buttons}
                  >
                    CANCEL
                  </StyledRedLink>
                </form>
              </div>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default CommentSprint;
