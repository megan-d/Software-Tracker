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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(12, 0, 6),
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
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              className={classes.HeroTitle}
              variant='h4'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              Manage-Track-Collaborate
            </Typography>
            <Typography
              variant='h6'
              align='center'
              color='textSecondary'
              paragraph
            >
              We provide software professionals with a solution for project management and issue tracking along with a community to collaborate with
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button variant='contained' color='primary'>
                    Demo Now
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' color='primary' href='/register'>
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='https://source.unsplash.com/random'
                  title='Image title'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Manage Projects
                  </Typography>
                  <Typography>
                    Create issues and sprints to ensure your project stays
                    focused and meets deadlines
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary'>
                    View
                  </Button>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='https://source.unsplash.com/random'
                  title='Image title'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Track Issues
                  </Typography>
                  <Typography>
                    Track project tasks and bugs and assign them to team members
                    as needed
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary'>
                    View
                  </Button>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='https://source.unsplash.com/random'
                  title='Image title'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Collaborate
                  </Typography>
                  <Typography>
                    Work with others in your organization or find collaborators
                    within the TrackIt community
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary'>
                    View
                  </Button>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
