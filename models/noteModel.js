const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'A note must have a name']
    },
    note: {
        type:String,
        required:[true, 'A note must have a description'],
        default:"big job",
        unique:true,
    }
});
const Note = mongoose.model('Note', noteSchema);


// const testNote =  new Note({
//     name:'stevens note',
//     note:'the first job ever is the hardest or is it'
// });

// testNote.save().then((doc)=> {
//     console.log(doc);
// })

module.exports = Note;