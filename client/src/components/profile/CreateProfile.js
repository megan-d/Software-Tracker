import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../layout/Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import AlertBanner from '../layout/AlertBanner';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { ProfileContext } from '../../context/profiles/ProfileContext';
import { AuthContext } from '../../context/auth/AuthContext';
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
    // height: '100vh',
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttons: {
    marginRight: '10px',
    marginTop: '20px',
  },
}));

const CreateProfile = ({ history }) => {
  const classes = useStyles();

  const [formData, updateFormData] = useState({
    bio: '',
    skills: '',
  });

  const { createProfile } = useContext(ProfileContext);
  const { user } = useContext(AuthContext);

  //Pull out variables from formData and userData
  const { bio, skills } = formData;

  // Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const profile = {
      bio: bio,
      skills: skills,
    };
    //call add project action
    await createProfile(profile, history);
    history.push(`/dashboard`);
  };

  return (
    <Wrapper>
      <h2 className='page-heading'>Create Your User Profile</h2>
      <p>Before getting started, please create a user profile. This can be updated later.</p>
      <hr className='hr'></hr>

      <Grid container component='main' className={classes.root}>
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <form
              className={classes.form}
              action=''
              onSubmit={(e) => onSubmit(e)}
            >
              <TextField
                autoComplete='bio'
                name='bio'
                variant='outlined'
                autoFocus
                required
                fullWidth
                multiline
                rows={6}
                id='bio'
                label='Bio'
                helperText='Please provide a brief description about yourself as a developer.'
                value={bio}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                variant='outlined'
                fullWidth
                required
                name='skills'
                label='Technologies'
                helperText='Please enter the technologies that you have experience with, separated by a comma. (e.g. JavaScript, Node, React)'
                id='skills'
                value={skills}
                onChange={(e) => onChange(e)}
                margin='normal'
                InputLabelProps={{
                    shrink: true,
                  }}
              />
              <AlertBanner />
              <StyledBlueButton
                type='submit'
                className={classes.buttons}
                onClick={(e) => onSubmit(e)}
              >
                SUBMIT
              </StyledBlueButton>
              <StyledRedLink to={`/profiles/${user._id}`} className={classes.buttons}>
                CANCEL
              </StyledRedLink>
            </form>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CreateProfile;
