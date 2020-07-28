const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');
const Project = require('../models/Project');

//*****OVERALL PROJECT ROUTES */

//ROUTE: GET api/projects/me
//DESCRIPTION: Get all projects for current user
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
  try {
    //   Find the relevant projects associated with user based on the id that comes in with the request's token. Could be manager role or developer role on project.
    const projects = await Project.find({
      $or: [{ 'developers.developer': req.user.id }, { manager: req.user.id }],
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

// ROUTE:  GET api/projects/:project_id
// DESCRIPTION:    Get project by project id
// ACCESS LEVEL:  Private

router.get('/:project_id', verify, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.project_id,
    });

    if (!project) return res.status(400).json({ msg: 'Project not found' });

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

//ROUTE: POST api/projects
//DESCRIPTION: Create a new project
//ACCESS LEVEL: Private
//Note: Developers won't be added until after the project is created (see PUT route)
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
      check(
        'targetCompletionDate',
        'Please provide a target date in the future.',
      )
        .not()
        .isEmpty(),
      check(
        'manager',
        'A manager is required for the project. Select the Add Self button to assign yourself as manager.',
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //Pull all of the fields out into variables from req.body.
    //TODO: Need to figure out how manager can be assigned so not just current user is manager (e.g., if admin wants to assign a different manager.)
    const {
      name,
      description,
      targetCompletionDate,
      manager,
      repoLink,
      liveLink,
    } = req.body;

    //Build the projectItems object. If the value is there, add it to the profileItems object.
    const projectItems = {};

    projectItems.owner = req.user.id;
    projectItems.name = name;
    projectItems.description = description;
    const date = new Date(targetCompletionDate);
    projectItems.targetCompletionDate = date;
    projectItems.manager = manager;
    projectItems.repoLink = repoLink;
    projectItems.liveLink = liveLink;

    //Once all fields are prepared, update and populate the data
    try {
      //Check if a project with that name already exists.
      let project = await Project.findOne({ name: name });
      if (project) {
        return res.json({
          msg:
            'A project with that name already exists. Please choose another name.',
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

//ROUTE: PUT api/projects/:project_id
//DESCRIPTION: Update an existing project's details
//ACCESS LEVEL: Private
//Must be Manager on the project or admin to update it
//TODO: Will also need a route to delete a developer from a project. This can be future phase.
router.put(
  '/:project_id',
  verify,
  [
    //Use express-validator to validate the inputs
    check('name', 'Please provide an updated name')
      .optional({ checkFalsy: true })
      .trim(),
    check('description', 'Please provide a description')
      .optional({ checkFalsy: true })
      .optional({ checkFalsy: true })
      .trim(),
  ],

  async (req, res) => {
    //Add in logic for express validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //pull all fields out of req.body using destructuring. Note on front end that inputs are case sensitive.
    const {
      name,
      description,
      targetCompletionDate,
      manager,
      developer,
      completionDate,
      repoLink,
      liveLink,
    } = req.body;

    //Build updatedProjectFields object. If the field is provided, add to profileFields object
    const updatedProjectFields = {};
    if (name) updatedProjectFields.name = name;
    if (description) updatedProjectFields.description = description;
    if (targetCompletionDate)
      updatedProjectFields.targetCompletionDate = targetCompletionDate;
    if (manager) updatedProjectFields.manager = manager;
    if (completionDate) updatedProjectFields.completionDate = completionDate;
    if (repoLink) updatedProjectFields.repoLink = repoLink;
    if (liveLink) updatedProjectFields.liveLink = liveLink;

    try {

      let project = await Project.findOne({ _id: req.params.project_id });
      //Only allow project to be updated if admin user or manager on project
      if (!project) {
        return res
          .status(400)
          .json({ msg: 'This project could not be found.' });
      }
      if (
        req.user.role === 'admin' ||
        project.manager.toString() === req.user.id
      ) {
        //If adding developer, check to make sure they are in the system. User can be submitted by username.
        //If adding a developer, first add that to project. Before adding, check to make sure developer doesn't already exist in developers array.
        if (developer) {
          let user = await User.findOne({ username: developer });
          if (!user) {
            return res
              .status(400)
              .json({ msg: 'This user could not be found.' });
          }
          let developerId = user._id;
          let isExistingDeveloper = project.developers.filter(
            (dev) => dev._id.toString() === developerId.toString(),
          );
          if (isExistingDeveloper.length === 0) {
            project.developers.push(developerId);
            await project.save();
          } else {
            return res.status(400).json({
              msg:
                'That user is already on the project. Please select another user to add to project.',
            });
          }
        }
        //Then, update project with provided updates from updatedProjectFields
        let updatedProject = await Project.findOneAndUpdate(
          { _id: req.params.project_id },
          { $set: updatedProjectFields },
          { new: true },
        );

        //Send back the entire project
        return res.json(updatedProject);
      } else {
        return res
          .status(401)
          .json({ msg: 'You are not permitted to perform this action.' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//ROUTE: PUT api/projects/comment/:project_id
//DESCRIPTION: Comment on an existing project
//ACCESS LEVEL: Private
router.put(
  '/comment/:project_id',
  [
    verify,
    [
      check('text', 'Please provide text in the comment field.')
        .not()
        .isEmpty()
        .trim(),
    ],
  ],
  async (req, res) => {
    //Do error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Create variable called user to get user. Since we are logged in, we have the id from the token.
      const user = await User.findById(req.user.id).select('-password');
      //Get the project
      const project = await Project.findById(req.params.project_id);
      //Create object for new comment. It's not a collection in database so just an object.
      const newComment = {
        name: user.name,
        text: req.body.text,
        user: req.user.id,
      };

      //Add newComment onto project comments at the end of array (want chronological order in this case)
      project.comments.push(newComment);

      //Save to database
      await project.save();

      //Send back all comments
      res.json(project.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//Add Route to delete comments?

//ROUTE: DELETE api/projects/:project_id
//DESCRIPTION: Delete a project by project's id
//ACCESS LEVEL: Private
//Must be Manager on the project or admin to delete it
router.delete('/:project_id', verify, async (req, res) => {
  try {
    //Find project based on the project id from request parameters
    const project = await Project.findById(req.params.project_id);

    //If the user is not an admin or the manager for the project, deny access.
    if (
      req.user.role === 'admin' ||
      project.manager.toString() === req.user.id
    ) {

        //TODO: also delete tickets associated with project when a project is deleted
      await Project.findOneAndRemove({ _id: req.params.project_id });
      res.json({ msg: 'This project has been deleted.' });
    } else {
      return res
        .status(401)
        .json({ msg: 'You are not permitted to perform this action.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
