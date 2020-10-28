const express = require('express');
const notesRouter = express.Router();
const fs = require('fs');
const path = require('path')
console.log(path.join(__dirname, '../data/data.json'));  // testing to get correct path to data for file writing using path tool
const Note = require('../models/noteModel');  // importing the model for Note to connect to Mongo DB


//remember only use Sync style in top level code, not event loop callbacks
const myData = fs.readFileSync(__dirname + '/../data/data.json', (err) => {
    console.log("error reading file!", myData);
})
const myDataObj = JSON.parse(myData);
const arr = [];
arr.push(myDataObj);
const arrinner = arr[0];

notesRouter.get('/', async (req, res) => {
    res.render('index.html')
});

notesRouter.get('/list', async (req, res) => {
    Note.find({}).then((doc) => {
        console.log(doc);
        res.render('list.html', { "notes" : doc });
    })
        // res.render('list.html', { "notes" : arrinner}     
});

notesRouter.post('/update', async (req, res) => {
    arrinner.push({id:arrinner.length,
                name:req.body.name,
                note:req.body.note});
    fs.writeFile(path.join(__dirname, '../data/data.json'), JSON.stringify(arrinner), () => {
    res.status(200)
    .send(JSON.stringify(arrinner));
    })
});

notesRouter.post('/:id', async (req, res) => { 
    const id = req.params.id;
    res.status(200)
    .json({
        data:JSON.stringify(myDataObj[0]),
        id:id
    })
})

notesRouter.post('/', async (req, res) => { 
    res.status(200)
    .json({
        data:JSON.stringify(myDataObj[0])
    })
})

notesRouter.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const index = arrinner.findIndex((obj) => obj.id == id);
    arrinner[index] = req.body;
    fs.writeFile(path.join(__dirname, '../data/data.json'), JSON.stringify(arrinner), () => {
        res.status(200)
        .send("it worked");
        })
})

notesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const index = arrinner.findIndex((obj) => obj.id == id);
   arrinner.splice(index, 1);
    fs.writeFile(path.join(__dirname, '../data/data.json'), JSON.stringify(arrinner), () => {
        res.status(200)
        .send("it worked");
        })
})




module.exports = notesRouter;