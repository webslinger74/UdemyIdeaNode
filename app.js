require('dotenv').config();  // sets up use of .env file
const mustacheExpress = require('mustache-express');
// Express set up
const express = require('express');
const app = express();
//  Routers //
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');

// set up mongoose and connect to Atlas DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('db connection successful');
}).catch((err) => {
    console.log(err);
});


// Body parsing for getting items from body of requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());   //body parser for json

// setting up public folder for static content e.g. css
app.use(express.static(__dirname + '/public'));

// Telling app which router for app to use dependant on path /notes
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

// Setting up of template engine being mustache and that view are in views folder
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up of port either declared in .env file or 3000
const port = process.env.PORT || 3000;



// Set up app to listen on declared/used port
app.listen(port, () => {
    console.log(`the server is listening on port ${port}`);
})
