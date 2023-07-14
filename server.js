const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');

const PORT = 3001;
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/'))
);

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(noteData)); 

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
  }
  let dataVar;

  fs.readFile('./db/db.json', (error, data) => {
    dataVar = JSON.parse(data);
    dataVar.push(newNote);
    console.log(dataVar);
    const dbArr = JSON.stringify(dataVar);

    fs.writeFile('./db/db.json', dbArr, (err) =>
      err ? console.error(err) : console.log('Success!')
    )
  })
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}!`)
);