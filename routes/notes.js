const express = require('express');
const notesRouter = express.Router();
const path = require('path')
console.log(path.join(__dirname, '../data/data.json'));  // testing to get correct path to data for file writing using path tool
const Note = require('../models/noteModel');  // importing the model for Note to connect to Mongo DB


notesRouter.get('/', async (req, res) => {
    res.render('index.html')
});

notesRouter.get('/list', async (req, res) => {
    console.log(req.query, "query param?");
    const queryObj = { ...req.query };   // this will create a new object and not a reference to same object.
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => {
        delete queryObj[el];
    });

    // advanced filtering  to allow query to include greater than or less than a value  remember add duration[gte]=5 in postman
    let queryString = json.stringify(queryObj);
    queryString =  queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryString));

    try {
        const query = Note.find(
            JSON.parse(queryString)    // this works as is an object in  ie in {} and returns all results if no query is provided!
        );

        const listOfDocuments =  await query;  // awaiting here so can chain some sorting and pagination
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