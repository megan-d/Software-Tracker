const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submitdate: {
    type: Date,
    default: Date.now,
  },
  targetdate: {
    type: Date,
    required: true,
  },
  submitter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  //how do you add manager and developer that will get from their userId?
});

module.exports = Project = mongoose.model('Project', projectSchema);
