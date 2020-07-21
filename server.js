const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const flash = require('connect-flash');
// const session = require('express-session');
// const passport = require('passport');
// const bodyParser = require('body-parser');

// require('./api/config/passport')(passport);

//Import routes
const auth = require('./api/routes/auth');
const users = require('./api/routes/users');
const projects = require('./api/routes/projects');

dotenv.config();
const app = express();

//Connect to Database. Dotenv npm package gives access to .env
const connectDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      () => console.log('Connected to DB'),
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDatabase();

//To get access to req.body (no longer need body parser npm package)
app.use(express.json());
// Express body parser
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: true },
//   }),
// );

// //Passport middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// //MIDDLEWARES
// //Set up sessions with express session. Then use flash middleware provided by connect-flash.
// app.set('trust proxy', 1); // trust first proxy
// app.use(express.static(__dirname + '/public'));

//Route middlewares
// Authenticate user
app.use('/api/auth', auth);
// Register new user
app.use('/api/users', users);
// Create, update, and delete projects, including add/modify/delete tickets and add/modify/delete sprints.
app.use('/api/projects', projects);

// app.use(flash());

// Serve static assets in production. Heroku will automatically default the NODE_ENV to production.
if (process.env.NODE_ENV === 'production') {
  // Set static folder (to be public folder). We want index.html to be our static file.
  app.use(express.static('client/build'));
  //Return all requests to react app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Listen on port
app.listen(port, () => console.log(`App is listening on port ${port}`));
