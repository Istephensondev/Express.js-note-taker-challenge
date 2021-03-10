const express = require('express');
const path = require('path');
const fs = require("fs");
const util = require("util");

const app = express();
const readFile = util.promisify(fs.readFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get("/api/notes", (req,res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});


app.get("/*", (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);

    // read the notes file
    readFile(path.join(__dirname, '/db/db.json'), 'utf-8').then((notes) => {
    
        // convert notes from a string to an array (JSON parse)
        let notesArray = JSON.parse(notes);

        let newNotes = {};
        newNotes.title = "New Title";
        newNotes.text = "New Text";

// push the new note to the notes array

notesArray.push(newNotes)

// convert the new notes array back to a string (JSON stringify)

JSON.stringify(newNotes)

// write the notes string to the note file

// send the notes array back as a successful response

//res.json(notes);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Application listening on port http://localhost:' + PORT);
});
