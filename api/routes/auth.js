const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

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

//ROUTE: POST api/auth/register
//DESCRIPTION: Authenticate user (login existing user)
//ACCESS LEVEL: Public (make request so can get access to private routes)
router.post(
  '/register',
  [
    //Use express-validator to validate the inputs
    check('name', 'Please provide name')
      .not()
      .isEmpty()
      .trim(),
    check('email', 'Please provide a valid email')
      .isEmail()
      .normalizeEmail(),
    check(
      'password',
      'Please provide a password with 8 or more characters',
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        req.flash('error', 'This user already exists');
        return res
          .status(400)
          .json({ errors: [{ msg: 'This user already exists' }] });
      }
      //If user doesn't already exist, encrypt password with bcrypt and create new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create/authenticate new User and save to database
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role
      });
      User.register({email: email})
      await newUser.save();
    } catch (error) {}

  
    console.log(req.body);
  },
);

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
  async (req, res) => {
    //Add validation. If doesn't pass the above validation, respond witih error. Need to adjust how handling flash errors (won't work like this)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', errors.array());
      return res.status(400).json({ errors: errors.array() });
    } else {
      //If passes validation authenticate user with passport and redirect to user's dashboard
      passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: 'Invalid username and/or password',
      });
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
