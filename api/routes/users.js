const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');

//ROUTE: GET api/users
//DESCRIPTION: Load logged in user
//ACCESS LEVEL: Private
router.get('/', verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

//ROUTE: POST api/users
//DESCRIPTION: Register new user
//ACCESS LEVEL: Public (make request so can get access to private routes)
router.post(
  '/',
  [
    //Use express-validator to validate the inputs
    check('name', 'Please provide name')
      .not()
      .isEmpty()
      .trim(),
    check(
      'username',
      'Please provide a username that is at least 5 characters.',
    )
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 5 }),
    check('email', 'Please provide a valid email')
      .isEmail()
      .normalizeEmail(),
    check(
      'password',
      'Please provide a password with 8 or more characters',
    ).isLength({ min: 8 }),
    check('password', 'Passwords do not match').custom(
      (value, { req }) => value === req.body.confirmPassword,
    ),
  ],
  async (req, res) => {
    //Show error if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // req.flash('error', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, password } = req.body;

    try {
      //If user already exists in database, give error
      let emailInput = await User.findOne({ email });
      if (emailInput) {
        // req.flash('error', 'This user already exists');
        return res
          .status(400)
          .json({ errors: [{ msg: 'This email already exists' }] });
      }
      let usernameInput = await User.findOne({ username });
      if (usernameInput) {
        // req.flash('error', 'This user already exists');
        return res.status(400).json({
          errors: [
            {
              msg:
                'This username already exists. Please select another username.',
            },
          ],
        });
      }

      //If user doesn't already exist, encrypt password with bcrypt and create new user. Hash password.
      user = new User({
        name,
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Add user ID to payload so it comes in with token
      const payload = {
        user: {
          id: user.id,
        },
      };

      //Return Jsonwebtoken so have access upon registration
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (error) {
      res.status(500).send('Server error');
    }
  },
);

//ROUTE: PUT api/users
//DESCRIPTION: Update user information. Will need a different route to update password.
//ACCESS LEVEL: Private
//TODO: This can also be where if you have admin permissions, you can update the role of a user. Need to add this functionality.
router.put(
  '/',
  verify,
  [
    //Use express-validator to validate the inputs
    check('name', 'Please provide an updated name')
      .optional({ checkFalsy: true })
      .trim(),
    check('email', 'Please provide a valid email')
      .optional({ checkFalsy: true })
      .isEmail()
      .normalizeEmail(),
  ],

  async (req, res) => {
    //pull all fields out of req.body using destructuring
    const { name, email, role, team, organization } = req.body;

    //Build user object
    const updatedUserFields = {};
    //if the field is provided, add to profileFields object
    if (name) updatedUserFields.name = name;
    if (email) updatedUserFields.email = email;
    if (role) updatedUserFields.role = role;

    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //Now that all fields are prepared, ready to update and insert the data
    try {
      let user = await User.findOne({ _id: req.user.id }).select('-password');
      //If user isn't found throw error
      if (!user) {
        return res
          .status(400)
          .json({ msg: 'The profile for this user could not be found.' });
      } else {
        //if user is found, update it
        user = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: updatedUserFields },
          { new: true },
        );
        //Send back the entire profile
        return res.json(user);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//ROUTE: DELETE api/users
//DESCRIPTION: Delete user
//ACCESS LEVEL: Private
router.delete('/', verify, async (req, res) => {
  try {
    //Find user that corresponds to user id found in token and delete
    let user = await User.findOneAndRemove({ _id: req.user.id });
    if (user) {
      res.json({ msg: 'This user has been deleted.' });
    } else {
      res.status(400).json({ msg: 'This user could not be found.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
