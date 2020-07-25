const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');

//ROUTE: POST api/users/teams
//DESCRIPTION: Allow user to create a team. In future let users auto generate a name with npm package as an option.
//ACCESS LEVEL: Private
router.post(
  '/',
  [
    verify,
    [
      //User express validator to validate required inputs
      check('name', 'Please provide a team name.')
        .optional({ checkFalsy: true })
        .trim(),
      check('description', 'Please provide a team description.')
        .optional({ checkFalsy: true })
        .trim(),
    ],
  ],
  async (req, res) => {
    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //Pull all of the fields out into variables from req.body.
    const { name, description, members } = req.body;

    //Build the teamItems object. If the value is there, add it to the profileItems object.
    const teamItems = {};

    teamItems.captain = req.user.id;
    teamItems.name = name;
    teamItems.description = description;

    //Once all fields are prepared, update and populate the data
    try {
      //Check if a team with that name already exists for this user.
      let user = await User.findOne({ _id: req.user.id }).select('-password');
      let isExistingTeam = user.teams.filter(
        (el) => el.name.toString() === name,
      );
      if (isExistingTeam.length > 0) {
        return res.json({
          msg:
            'A team with that name already exists for your account. Please choose another name.',
        });
      }
      //If team isn't found, create a new one
      else {
        user.teams.push(teamItems);
        await user.save();
        //Send back the entire user
        return res.json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

//ROUTE: PUT api/users/teams/:team_id
//DESCRIPTION: Update an existing team name or description or add a team member
//ACCESS LEVEL: Private
router.put(
  '/:team_id',
  verify,
  [
    //Use express-validator to validate the inputs
    check('name', 'Please provide a name')
      .optional({ checkFalsy: true })
      .trim(),
    check('description', 'Please provide a description')
      .optional({ checkFalsy: true })
      .trim(),
    check('username', 'Please provide a username for this team member')
      .optional({ checkFalsy: true })
      .trim(),
  ],

  async (req, res) => {
    //pull all fields out of req.body using destructuring. Member should be the username of the member they want to add.
    const { name, description, username } = req.body;

    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //Now that all fields are prepared, ready to update and insert the data
    try {
      let user = await User.findOne({ _id: req.user.id }).select('-password');
      //If user isn't found throw error because user making request isn't valid
      if (!user) {
        return res.status(400).json({ msg: 'Invalid user.' });
      }
      let teams = user.teams;
      //if user is found, find the relevant team by id and update the name and/or description depending on what's provided
      let index = teams.map((el) => el._id).indexOf(req.params.team_id);
      if (index === -1) {
        return res.status(400).json({
          msg: 'A team with this name is not associated with your account.',
        });
      }
      if (name) {
        teams[index].name = name;
      }
      if (description) {
        teams[index].description = description;
      }
      if (username) {
        let foundMember = await User.findOne({ username: username }).select('-password');;
        if (!foundMember) {
          return res
            .status(400)
            .json({ msg: 'A user with that username could not be found.' });
        }
        //check if username is already an existig team member for that team
        let isExistingTeamMember = teams[index].members.filter(
          (el) => el._id.toString() === foundMember._id.toString()
        );
        
        const member = {
          _id: foundMember._id,
        };
        if (isExistingTeamMember.length > 0) {
          return res.json({
            msg:
              'This username is already a member of this team. Please choose another user.',
          });
        } else {
          await user.teams[index].members.push(member);
        }
      }

      await user.save();

      //Send back the entire user object with password removed (see -password above)
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);



//DELETE A TEAM

module.exports = router;
