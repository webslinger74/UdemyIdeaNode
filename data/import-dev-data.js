require('dotenv').config();
const fs = require('fs');
const path = require('path');
// console.log(path.join(__dirname, '../data/data.json'))
console.log(path.join(__dirname, './data.json'));
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('db connection successful!');
  })
  .catch((error) => {
    console.log(error);
  });

const Note = require('../models/noteModel');

// read json file

const notes = fs.readFileSync(path.join(__dirname, './data.json'), 'utf-8');
// could use fs.readFileSync(`${__dirname}/data.json`, 'utf-8');

// import data into DB and turn from json to javascript objects within array.
const notesarr = JSON.parse(notes);

const importData = async () => {
  try {
    await Note.create(notesarr);
    console.log('data created!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteOldData = async () => {
  try {
    await Note.deleteMany();
    console.log('database cleaned');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

console.log(process.argv);

if (process.argv[2] === '--deleteAll') {
  deleteOldData();
}

if (process.argv[2] === '--createAll') {
  importData();
}
