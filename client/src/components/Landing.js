import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ProfileContext } from '../context/profiles/ProfileContext';
import { AuthContext } from '../context/auth/AuthContext';
import { demoUser } from './demo/demo';
import Container from '@material-ui/core/Container';
import PlainHeader from '../components/layout/PlainHeader';
import Footer from './layout/Footer';
import laptop from '../assets/images/laptop.jpg';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: '#e5e0db',
    // padding: theme.spacing(30, 0, 6),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '97vh',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    textAlign: 'center',
    margin: '0 auto',
  },
  heroTitle: {
    width: '100%',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minWidth: '70%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: '#333333',
    background: '#fafafa',
  },
  content: {
    flexGrow: 1,
    minHeight: '97vh',
    overflow: 'auto',
    position: 'relative',
    backgroundImage: `url(${laptop})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Landing(props) {
  const classes = useStyles();

  const { register, registerDemo } = useContext(AuthContext);
  const { createProfile } = useContext(ProfileContext);

  const setUpDemoUser = async () => {
      //Call register demo user action
    await registerDemo();
    //Call create demo profile action
    // await createDemoProfile();
  }


  const profile = {
    bio:
      'I am an experienced front end developer looking to transition into full stack web development. I am currently focusing on the MERN stack, and I am also working on my project management skills. Please leave a comment on my profile if you would like to collaborate with me.',
    skills: 'HTML, CSS, Javascript, React, Node.js, MongoDB',
  };

  //When Demo button is clicked, run the onDemoClick function to register demo user, create profile, etc
  const onDemoClick = async (e) => {
    e.preventDefault();
    await setUpDemoUser();
    props.history.push(`/dashboard`);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <PlainHeader />
      <main className={classes.content}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              className={classes.HeroTitle}
              variant='h4'
              align='center'
              gutterBottom
              style={{ color: '#204051' }}
            >
              <span
                style={{
                  color: '#90be6d',
                  fontWeight: 700,
                  fontSize: '60px',
                  fontFamily: 'caveat, cursive',
                }}
              >
                Manage
              </span>
              -
              <span
                style={{
                  color: '#f9c74f',
                  fontWeight: 700,
                  fontSize: '60px',
                  fontFamily: 'caveat, cursive',
                }}
              >
                Track
              </span>
              -
              <span
                style={{
                  color: '#f8961e',
                  fontWeight: 700,
                  fontSize: '60px',
                  fontFamily: 'caveat, cursive',
                }}
              >
                Collaborate
              </span>
            </Typography>
            <Typography
              paragraph
              style={{
                color: '#333333',
                fontSize: '17px',
                width: '75%',
                margin: '0 auto',
              }}
            >
              Project management and issue tracking along with a community of
              developers to collaborate with
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#43aa8b', color: '#f3f3f3' }}
                    onClick={(e) => onDemoClick(e)}
                  >
                    Demo Now
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    style={{ color: '#f3f3f3', backgroundColor: '#577590' }}
                    href='/register'
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {/*  */}
      </main>
      <Footer />
    </React.Fragment>
  );
}
