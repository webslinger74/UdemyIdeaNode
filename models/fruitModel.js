const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  fruitName: {
    type: String,
    required: [true, 'A note must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A cost must be provided for the job'],
  },
  description: {
    type: String,
    required: [true, 'A fruit must have a description'],
    default: 'no description provided',
  },
});
const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;
