import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlainHeader from '../components/layout/PlainHeader';
import Footer from './layout/Footer';
import desk from '../assets/images/desk.jpg';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // backgroundColor: '#e5e0db',
    padding: theme.spacing(22, 0, 6),
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
    backgroundImage: `url(${desk})`,
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

export default function Landing() {
  const classes = useStyles();

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
            <Typography align='center' paragraph style={{ color: '#333333' }}>
              We provide software professionals with a solution for project
              management and issue tracking along with a community to
              collaborate with
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#43aa8b', color: '#f3f3f3' }}
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
