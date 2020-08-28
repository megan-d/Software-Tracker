const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const Profile = require('../models/Profile');

//*****PROFILE ROUTES */

//ROUTE: GET api/profiles
//DESCRIPTION: Get all developer profiles
//ACCESS LEVEL: Private
router.get('/', verify, async (req, res) => {
  try {
    let profiles = await Profile.find().populate('user', [
      'username',
      'firstName',
      'lastName',
    ]).populate('myProjects');
    res.json(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//ROUTE: GET api/profiles/me
//DESCRIPTION: Get current user's profile
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
    try {
        //Find the profile
        let profile = await Profile.findOne({ user: req.user.id }).populate('user');
        if(!profile) {
            return res.status(400).json({ errors: [{ msg: 'An existing profile could not be found. Please create a profile.' }] })
        }
        res.json(profile);
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

//ROUTE: GET api/profiles/user/:user_id
//DESCRIPTION: Get profile by User ID
//ACCESS LEVEL: Private
router.get('/user/:user_id', verify, async (req, res) => {
    try {
        //Find the profile
        let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['username', 'firstName', 'lastName']);
        if(!profile) {
            return res.status(400).json({ errors: [{ msg: 'An existing profile could not be found. Please create a profile.' }] })
        }
        res.json(profile);
    } catch (err) {
        res.status(500).send('Server Error');
    }
})

//ROUTE: POST api/profiles
//DESCRIPTION: Create user profile
//ACCESS LEVEL: Private
router.post(
  '/',
  [
    verify,
    [
      //User express validator to validate required inputs
      check('bio', 'Please provide a brief bio for your profile.')
        .optional({ checkFalsy: true })
        .trim(),
      check('skills', 'Please list your technical skills.')
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
    const { bio, skills } = req.body;

    //Build the profileItems object. If the value is there, add it to the profileItems object.
    const profileItems = {};

    profileItems.user = req.user.id;
    profileItems.bio = bio;

    if (skills) {
      profileItems.skills = skills.split(',').map((tech) => tech.trim());
    } else {
      profileItems.skills = [];
    }

    //Once all fields are prepared, populate the data
    //Need to find the projects for the user to populate them
    try {
      //if profile already exists for this user, throw error and say go to update profile
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'You already created a profile. Please go to your profile page to edit your existing profile.',
            },
          ],
        });
      } else {
        let projects = await Project.find({
          owner: req.user.id,
        });
        if (projects.length > 0) {
          profileItems.myProjects = projects;
        } else {
          profileItems.myProjects = [];
        }

        let profile = await new Profile(profileItems);
        await profile.save();
        res.json(profile);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

//ROUTE: PUT api/profiles
//DESCRIPTION: Edit user profile
//ACCESS LEVEL: Private

//ROUTE: POST api/profiles/comments
//DESCRIPTION: Comment on a profile
//ACCESS LEVEL: Private

//ROUTE: DELETE api/profiles/user/:user_id
//DESCRIPTION: Delete user profile by userId
//ACCESS LEVEL: Private

router.delete('/user/:user_id', verify, async (req, res) => {
    try {
      //Find profile based on the user id from request parameters
      const profile = await Profile.findOne({ user: req.params.user_id.toString()});

      if(!profile) {
          return res.status(400).json({ errors: [{ msg: 'A profile could not be found for this user.' }] })
      }
  
      //If the user is not the one who owns the profile or is not an admin, deny access.
      if (req.user.role === 'admin' || req.params.user_id.toString() === req.user.id) {
        
        await Profile.findOneAndRemove({ user: req.params.user_id });

        res.json({
          msg:
            'This profile has been deleted.',
        });
      } else {
        return res.status(401).json({
          errors: [{ msg: 'You are not permitted to perform this action.' }],
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
