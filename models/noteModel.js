const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A note must have a name'],
  },
  cost: {
    type: Number,
    required: [true, 'A cost must be provided for the job'],
  },
  note: {
    type: String,
    required: [true, 'A note must have a description'],
    default: 'big job',
    unique: true,
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
