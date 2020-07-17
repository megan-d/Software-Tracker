const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  submitter: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateDue: {
    type: Date,
    required: true,
  },
  assignedDeveloper: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  status: {
    type: String,
    default: 'Unassigned'
  },
  statusLog: [
      {
          status: {
              type: String
          },
          date: {
              type: Date,
              default: Date.now,
          }
      }
  ],
  comments: [
    {
      //Shouldn't need to manipulate specific comments so probably don't need a separate model for this
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  tickets: [
    {
      ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    },
  ],
  sprints: [
    {
      sprint: {
        type: Schema.Types.ObjectId,
        ref: 'Sprint',
      },
    },
  ],
  dateCompleted: {
    type: Date,
  },
  resolutionSummary: {
    type: String,
  },
});

module.exports = Ticket = mongoose.model('Ticket', ticketSchema);
