const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');
const Project = require('../models/Project');

//ROUTE: GET api/projects/me
//DESCRIPTION: Get all projects for current developer user
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
  try {
    //   Find the relevant projects for manager or developer based on the id that comes in with the request's token.
    const projects = await Project.find({
      $or: [{ 'developers.user': req.user.id }, { manager: req.user.id }],
    });

    //If there is no profile, return an error
    if (projects.length === 0) {
      return res
        .status(400)
        .json({ msg: 'There are no projects available for this user.' });
    }
    //If there are projects, send those projects
    res.json(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//Get project by project id

//Get projects for specific user

//ROUTE: POST api/projects
//DESCRIPTION: Create a new project
//ACCESS LEVEL: Private
router.post(
    '/',
    [
      verify,
      [
        //User express validator to validate required inputs
        check('weight', 'Please provide a numeric weight in pounds.')
          .isNumeric()
          .trim(),
        check('height', 'Please provide a numeric height in inches.')
          .isNumeric()
          .trim(),
        check('goalDays', 'Please provide a number between 0 and 7')
          .optional({ checkFalsy: true })
          .isInt({ min: 0, max: 7 })
          .trim(),
        check('goalWeight', 'Please provide a number')
          .optional({ checkFalsy: true })
          .isInt()
          .trim(),
        check('goalDailyCalories', 'Please provide a number')
          .optional({ checkFalsy: true })
          .isInt()
          .trim(),
      ],
    ],
    async (req, res) => {
      //Add in logic for express validator error check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      //Pull all of the fields out into variables from req.body. Don't include activities or calories consumed today (user can update later).
      const {
        weight,
        height,
        goalWeight,
        goalDailyCalories,
        goalDays,
      } = req.body;
  
      //Build the profileItems object. If the value is there, add it to the profileItems object.
      const profileItems = {
        weightHistory: {
          weight: weight,
        },
      };
      profileItems.user = req.user.id;
      if (weight) {
        profileItems.weight = weight;
        profileItems.weightHistory.weight = weight;
      }
      if (height) {
        profileItems.height = height;
      }
      if (weight && height) {
        //need to see how to make this work when updating
        profileItems.bmi = ((weight / (height * height)) * 703).toFixed(1);
      }
      if (goalWeight) {
        profileItems.goalWeight = goalWeight;
      }
      if (goalDailyCalories) {
        profileItems.goalDailyCalories = goalDailyCalories;
      } else {
        profileItems.goalDailyCalories = 2000;
      }
      if (goalDays || goalDays === 0) {
        profileItems.goalDays = goalDays;
      }
      profileItems.caloriesConsumedToday = 0;
      profileItems.caloriesRemainingToday = profileItems.goalDailyCalories;
  
      //Once all fields are prepared, update and populate the data
      try {
        //Check if a user exists before creating a profile. If there's no user in database, don't allow profile to be created.
        let user = await User.findOne({ _id: req.user.id });
        if (!user) {
          return res.json({
            msg: 'You must be a currently registered user to create a profile.',
          });
        }
  
        //Use findOne to find profile
        let profile = await Profile.findOne({ user: req.user.id });
  
        //If profile is found, give error and suggest user updates profile
        if (profile) {
          return res.json({
            msg:
              'A profile already exists for this user. Please select update stats from your dashboard to update your profile.',
          });
        }
        //If profile isn't found, create a new one
        if (!profile) {
          profile = await new Profile(profileItems);
          await profile.save();
          res.json(profile);
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    },
  );
  

//Edit an existing project

//Delete a project

module.exports = router;
