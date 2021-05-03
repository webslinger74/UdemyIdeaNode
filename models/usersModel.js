const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'You must provide a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'You must provide a last name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'You must provide an email address'],
  },
  password: {
    type: String,
    required: [true, 'A valid password of at least 8 characters is required'],
    minlength: 8,
  },
  confirmedPassword: {
    type: String,
    required: [true, 'A valid password of at least 8 characters is required'],
    minlength: 8,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
