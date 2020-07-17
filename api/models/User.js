const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      min: 8
    },
    role: {
        type: String,
        required: true,
      },
    created: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = User = mongoose.model('User', userSchema);