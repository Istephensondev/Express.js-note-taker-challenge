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

app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      var id = notes[notes.length - 1].id + 1
      var newNote = { title: req.body.title, text: req.body.text, id: id }
      var activeNote = notes.concat(newNote)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
        if (error) {
          return error
        }
        console.log(activeNote)
        res.json(activeNote);
      })
    })
  })

  // Pull from db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
      if (error) {
        return console.log(error)
      }
      console.log("This is Notes", data)
      res.json(JSON.parse(data))
    })
  });

  app.delete("/api/notes/:id", function (req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      notes = notes.filter(val => val.id !== noteId)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) {
          return error
        }
        res.json(notes)
      })
    })
  })
  
  app.put("/api/notes/:id", function(req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "db/db.json", "utf8", function(error, notes) {
      if (error ){
        return console.log(error)
      }
      notes.JSONparse(notes)
  
      notes = notes.filter(val => val.id !== noteId)
  
      fs.writeFile(__dirname +"db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) {
          return error
        }
        res.json(notes)
      })
    })
  })


app.put("/api/notes/:id", function(req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "db/db.json", "utf8", function(error, notes) {
      if (error ){
        return console.log(error)
      }
      notes.JSONparse(notes)
  
      notes = notes.filter(val => val.id !== noteId)
  
      fs.writeFile(__dirname +"db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) {
          return error
        }
        res.json(notes)
      })
    })
  })
  
// app.post('/api/notes', (req, res) => {
//     // req.body is where our incoming content will be
//     console.log(req.body);

//     // read the notes file
//     readFile(path.join(__dirname, '/db/db.json'), 'utf-8').then((notes) => {
    
//         // convert notes from a string to an array (JSON parse)
//         let notesArray = JSON.parse(notes);

//         let newNotes = {};
//         newNotes.title = "New Title";
//         newNotes.text = "New Text";

//     // push the new note to the notes array


//      // convert the new notes array back to a string (JSON stringify)
//      // write the notes string to the note file

//     // send the notes array back as a successful response
//     //res.json(notes);
//     });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Application listening on port http://localhost:' + PORT);
});
