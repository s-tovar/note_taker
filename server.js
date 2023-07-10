const express = require('express');
const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid'); this generates unique ids for notes?

const app = express();
const PORT = process.env.PORT || 3000;
//middleware to parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

// route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });

  // route to read db,json file 7 retuyrn saved notes as json when api/notes is accessed 
  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
  });

  // routes to recieve a new note, save it and return new note 
  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // install uuid 

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        allNotes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 2), (err) => {
            if (err) throw err;
            res.json(allNotes);
        });
    });
  });

//   attempt at delete notes with the id
//   app.delete('/api/notes/:id', (req, res) => {
//     const deleteId = req.params.id;
  
//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//       if (err) throw err;
//       let allNotes = JSON.parse(data);
//       allNotes = allNotes.filter(note => note.id !== deleteId);  // Filter out the note with the specified id
//       fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 2), (err) => {
//         if (err) throw err;
//         res.json(allNotes);
//       });
//     });
//   });