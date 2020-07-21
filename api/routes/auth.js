const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');

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
      
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { return res.send('Error'); }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({user});
          });
        })(req, res, next);
      }
    }
);

//ROUTE: GET api/auth/logout
//DESCRIPTION: Logout user
//ACCESS LEVEL: Private (only accessed by currently logged in users)
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
