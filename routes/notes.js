const express = require('express');
const notesRouter = express.Router();
const path = require('path')
console.log(path.join(__dirname, '../data/data.json'));  // testing to get correct path to data for file writing using path tool
const Note = require('../models/noteModel');  // importing the model for Note to connect to Mongo DB


notesRouter.get('/', async (req, res) => {
    res.render('index.html')
});

notesRouter.get('/list', async (req, res) => {
    try {
        const listOfDocuments =  await Note.find({});
            res.render('list.html', { "notes" : listOfDocuments });
 } catch (error) {
        console.log(error);
    }  
});

notesRouter.post('/update', async (req, res) => {
  try {
     await Note.create({name:req.body.name, note:req.body.note});
     const findDocs = await Note.find({});
            res.render('list.html', { "notes" : findDocs});
  } catch (error) {
      console.log("there was an error ", error);
  }  
})

notesRouter.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        await Note.findByIdAndUpdate(id, {name:body.name, note:body.note},{new:true},(err, response) => {
            console.log('response yes', err);
        }); 
        const allDocs = await Note.find({});
            res.render('list.html', { "notes" : allDocs});
    } catch(err) {
        console.log(err);
    }
});
   

notesRouter.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    await Note.deleteOne({_id:req.params.id});
    await Note.find({}).then((doc) => {
        res.render('list.html', { "notes" : doc});
     }).catch(err => {
         console.log(err);
     })
})




module.exports = notesRouter;