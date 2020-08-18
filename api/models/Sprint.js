const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submitter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  developers: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
  },
  plannedEndDate: {
    type: Date,
  },
  status: {
    type: String,
    required: true
  },
  statusLog: [
    {
      status: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
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
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  ],
  dateCompleted: {
    type: Date,
  },
  resolutionSummary: {
    type: String,
  },
});

module.exports = Sprint = mongoose.model('Sprint', sprintSchema);
