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
        check('name', 'Please provide a project name.')
        .not()
        .isEmpty()
        .trim(),
        check('description', 'Please provide a project description.')
        .not()
        .isEmpty()
        .trim(),
        check('targetCompletionDate', 'Please provide a target date in the future.')
        .not()
        .isEmpty(),
        check('manager', 'A manager is required for the project. Select the Add Self button to assign yourself as manager.')
        .not()
        .isEmpty()
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
        name,
        description,
        targetCompletionDate,
        manager,
      } = req.body;
  
      //Build the projectItems object. If the value is there, add it to the profileItems object.
      const projectItems = {};

      projectItems.creator = req.user.id;
      projectItems.name = name;
      projectItems.description = description;
      const date = new Date(targetCompletionDate);
      projectItems.targetCompletionDate = date;
      projectItems.manager = manager;
      
      //Once all fields are prepared, update and populate the data
      try {
        //Check if a project with that name already exists. 
        //**TODO- Will need to set up functionality to check within the organization.
        let project = await Project.findOne({ name: name });
        if (project) {
          return res.json({
            msg: 'A project with that name already exists. Please choose another name.',
          });
        }

        //If project isn't found, create a new one
        if (!project) {
          project = await new Project(projectItems);
          await project.save();
          res.json(project);
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
