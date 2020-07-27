const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const verify = require('../middleware/verifyToken');

const User = require('../models/User');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');

//*****TICKET ROUTES */

//ROUTE: GET api/projects/tickets/me
//DESCRIPTION: Get all tickets assigned to user (where you are the assignedDeveloper on the ticket)
//ACCESS LEVEL: Private
router.get('/me', verify, async (req, res) => {
  try {
    //   Find the all tickets assigned to the user based on the id that comes in with the request's token. Populate project details so have that as well (so can filter by project too);
    const assignedTickets = await Ticket.find({
      assignedDeveloper: req.user.id,
    }).populate('project');

    //If there are no tickets, return an error
    if (assignedTickets.length === 0) {
      return res
        .status(400)
        .json({ msg: 'There are no tickets available for this user.' });
    }
    res.json(assignedTickets);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//ROUTE: GET api/projects/tickets/:project_id
//DESCRIPTION: Get all tickets for a project
//ACCESS LEVEL: Private
router.get('/:project_id', verify, async (req, res) => {
  try {
    //   Find the all tickets associated with a project. Populate project details so have that as well (e.g., so can filter projects by manager and get all tickets for projects where you're the manager)
    let project = await Project.findOne({
      _id: req.params.project_id,
    }).populate('tickets');
    let tickets = project.tickets;

    //If there are no tickets, return an error
    if (tickets.length === 0) {
      return res
        .status(400)
        .json({ msg: 'There are no tickets available for this project.' });
    }
    res.json(tickets);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

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
      check('history', 'Please provide a type of change for ticket history.')
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
    const {
      title,
      type,
      description,
      priority,
      dateDue,
      assignedDeveloper,
      history,
    } = req.body;

    //Build the ticketItems object. If the value is there, add it to the ticketItems object.
    const ticketItems = {};

    ticketItems.submitter = req.user.id;
    ticketItems.project = req.params.project_id;
    ticketItems.title = title;
    ticketItems.type = type;
    ticketItems.description = description;
    ticketItems.priority = priority;
    const date = new Date(dateDue);
    ticketItems.dateDue = date;

    let historyItem = {
      typeOfChange: history,
    };

    //Once all fields are prepared, update and populate the data
    try {
      //Populate ticket titles. Check if a ticket with that title already exists for the project. If so, give error. If not, create new ticket.
      const project = await Project.findOne({
        _id: req.params.project_id,
      }).populate('tickets', 'title');

      let isExistingTicketTitle = project.tickets.filter(
        (ticket) => ticket.title === title,
      );
      if (isExistingTicketTitle.length > 0) {
        return res.status(400).json({
          msg:
            'A ticket with that title already exists. Please select another title for the ticket.',
        });
      }
      //TODO: verify that the assignedDevelopers is actually a user
      let user = await User.findOne({ username: assignedDeveloper });
      let developerId = user._id;
      ticketItems.assignedDeveloper = developerId;
      if (!user) {
        return res
          .status(400)
          .json({ msg: 'The assigned developer could not be found.' });
      }

      let ticket = await new Ticket(ticketItems);
      await ticket.history.push(historyItem);
      await ticket.save();

      //Check to see if assigned developer is a developer on the project yet. If not, add them with request.
      let isExistingProjectDeveloper = project.developers.filter(
        (dev) => dev._id.toString() === developerId.toString(),
      );
      
      if (isExistingProjectDeveloper.length === 0) {
        //Add to developers array for project
        await project.developers.push(developerId);
      }
      await project.tickets.push(ticket);
      await project.save();
      return res.json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

//Update a ticket
//When update ticket, push type of change to history array so have a log of ticket history. Can also create variable for prevValue and newValue so that can be populated into a table to display it.

//ROUTE: DELETE api/projects/tickets/:project_id/:ticket_id
//DESCRIPTION: Delete a ticket on given project by ticket id
//ACCESS LEVEL: Private
//Must be Manager on the project or admin to delete it
router.delete('/:project_id/:ticket_id', verify, async (req, res) => {
  try {
    //Find project based on the project id from request parameters
    let project = await Project.findById(req.params.project_id).populate(
      'tickets',
      '_id',
    );
    if (!project) {
      return res
        .status(400)
        .json({
          msg: 'The project associated with this ticket could not be found.',
        });
    }
    //If the user is not an admin or the manager for the project, deny access.
    if (
      req.user.role === 'admin' ||
      project.manager.toString() === req.user.id
    ) {
      //TODO: also delete tickets associated with project when a project is deleted
      await Ticket.findOneAndRemove({ _id: req.params.ticket_id });
      let tickets = project.tickets;
      let index = tickets.map((el) => el._id).indexOf(req.params.ticket_id);
      if (index === -1) {
        return res.status(400).json({
          msg: 'This ticket could not be found.',
        });
      }
      let deletedTicket = project.tickets.splice(index, 1);
      project.save();
      res.json({ msg: 'This ticket has been deleted .' });

      //When ticket is deleted, also need to delete it from project (remove from array)
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
