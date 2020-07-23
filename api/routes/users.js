const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

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
    check('email', 'Please provide a valid email')
      .isEmail()
      .normalizeEmail(),
    check(
      'password',
      'Please provide a password with 8 or more characters',
    ).isLength({ min: 8 }),
    check('password', 'Passwords do not match').custom(
      (value, { req }) => value === req.body.confirmPassword,
    )
  ],
  async (req, res) => {
    //Show error if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // req.flash('error', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //If user already exists in database, give error
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // req.flash('error', 'This user already exists');
        return res
          .status(400)
          .json({ errors: [{ msg: 'This user already exists' }] });
      }
      //If user doesn't already exist, encrypt password with bcrypt and create new user. Hash password.
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //Create/authenticate new User and save to database
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();

      //Add user ID to payload so it comes in with token
      const payload = {
        user: {
          id: user.id
        }
      }

      //Return Jsonwebtoken so have access upon registration
      jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn:  '1h'}, (err, token) => {
        if(err) throw err;
        res.json({token});
      });

    } catch (error) {
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
