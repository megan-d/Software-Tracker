const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  targetCompletionDate: {
    type: Date,
    required: true,
  },
  completionDate: {
    type: Date,
    default: null,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  developers: [
    {
      developer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        default: 'developer',
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
  sprints: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sprint',
    },
  ],
  repoLink: {
    type: String,
  },
  liveLink: {
    type: String,
  },
});

module.exports = Project = mongoose.model('Project', projectSchema);
