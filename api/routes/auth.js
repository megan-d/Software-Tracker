const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

//ROUTE: GET api/auth
//DESCRIPTION: Get user from database
//ACCESS LEVEL: Private
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

//ROUTE: POST api/auth/login
//DESCRIPTION: Authenticate user (login existing user)
//ACCESS LEVEL: Public (make request so can get access to private routes)
router.post(
  '/login',
  [
    //Use express-validator to validate the inputs
    check('email', 'Please provide a valid email')
      .isEmail()
      .normalizeEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
  ],
  async (req, res, next) => {
    //Add validation. If doesn't pass the above validation, respond witih error. Need to adjust how handling flash errors (won't work like this)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      //If passes validation authenticate user with passport and redirect to user's dashboard
      passport.use(
        new LocalStrategy({ usernameField: 'email' }, async function(
          email,
          password,
          done,
        ) {
          //Match user
          try {
            await User.findOne({ email: email }, function(err, user) {
              console.log(email);
              if (err) {
                return done(err);
              }
              if (!user) {
                return done(null, false, {
                  message: 'This email address is not registered.',
                });
              }
              //Match password
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: 'Incorrect password.' });
                }
              });
              return done(null, user);
            });
          } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
          }
        }),
      );

      passport.authenticate('local')(req, res, next);
    }
  },
);

//ROUTE: GET api/auth/logout
//DESCRIPTION: Logout user
//ACCESS LEVEL: Private (only accessed by currently logged in users)
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
