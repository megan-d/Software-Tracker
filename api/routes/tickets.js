const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');
const Project = require('../models/Project');

//*****TICKET ROUTES */
//ROUTE: GET api/projects/tickets/me
//DESCRIPTION: Get all tickets for current user
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
  try {
    //   Find the relevant projects associated with user based on the id that comes in with the request's token. Could be manager role or developer role on project.
    const projects = await Project.find({
      $or: [{ 'developers.user': req.user.id }, { manager: req.user.id }],
    });

    //If there is no project, return an error
    if (projects.length === 0) {
      return res
        .status(400)
        .json({ msg: 'There are no projects available for this user.' });
    }

    //Filter the project tickets for the tickets assigned to the user
    let tickets = project.tickets
      .poulate('assignedDeveloper')
      .map((el) => console.log(el));
    console.log(tickets);
    // .filter(
    //     (dev) => dev._id === developerId,
    //   );

    res.json(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//When create ticket, can only be assigned to somebody who is on that project (either a developer or a manager)

//ROUTE: POST api/projects/tickets/:project_id
//DESCRIPTION: Create a new ticket for project
//ACCESS LEVEL: Private
router.post(
  '/:project_id',
  [
    verify,
    [
      //User express validator to validate required inputs
      check('title', 'Please provide a ticket title.')
        .not()
        .isEmpty()
        .trim(),
      check('type', 'Please provide a ticket type.')
        .not()
        .isEmpty()
        .trim(),
      check('description', 'Please provide a ticket description.')
        .not()
        .isEmpty()
        .trim(),
      check('priority', 'Please provide a priority for the ticket.')
        .not()
        .isEmpty()
        .trim(),
      check('dateDue', 'Please provide a due date in the future.')
        .not()
        .isEmpty()
        .trim(),
      check(
        'assignedDeveloper',
        'A developer is required for the project. Search for developers by username and assign one to the ticket.',
      )
        .not()
        .isEmpty()
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
    
    const { title, type, description, priority, dateDue, assignedDeveloper } = req.body;

    //Build the ticketItems object. If the value is there, add it to the ticketItems object.
    const ticketItems = {};

    ticketItems.submitter = req.user.id;
    ticketItems.title = title;
    ticketItems.type = type;
    ticketItems.description = description;
    ticketItems.priority = priority;
    const date = new Date(dateDue);
    ticketItems.dateDue = date;
    ticketItems.assignedDeveloper = assignedDeveloper;

    //Once all fields are prepared, update and populate the data
    try {
      //Check if a ticket with that title already exists for the project. Populate the ticket titles.
      let project = await Project.findOne({ _id : req.params.project_id }).populate('ticket',);
      console.log(project);
      if (!project) {
        return res.json({
          msg:
            'The requested project could not be found.',
        });
      }
      
      //populate the ticket titles so can determine if title already exists


      project.tickets.filter(
        (ticket) => ticket.title.toLowerCase() === title.toLowerCase(),
      );
      if (isExistingDeveloper.length === 0) {
        project.developers.push(developerId);
        await project.save();
      } else {
        return res
          .status(400)
          .json({
            msg:
              'A ticket with that title is already on the project. Please provide another title.',
          });
      }
        await project.save();
        res.json(project.tickets);
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

//When update ticket, push to history array so have a log of ticket history

module.exports = router;
