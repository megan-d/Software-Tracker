const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
    Default: 'Developer',
  },
  //Will allow managers to search for developers by email and add them to their team
  teams: [
    {
      type: String,
    },
  ],
  organizations: [
    {
      type: String,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model('User', userSchema);
