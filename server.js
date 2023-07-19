// Dependencies
const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(express.static('public'));

// Homepage GET route
app.get('/', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/'))
);

// Notes page GET route
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Api GET route
app.get('/api/notes', (req, res) => {
  const dbData = fs.readFileSync('./db/db.json', 'utf8');
  const dbParse = JSON.parse(dbData);
  res.json(dbParse);
}); 

// Api POST route
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const id = uuid();

  const newNote = {
    title,
    text,
    id,
  }

  const dbData = fs.readFileSync('./db/db.json', 'utf8');
  const dbParse = JSON.parse(dbData);
  dbParse.push(newNote);
  const newDb = JSON.stringify(dbParse);

  fs.writeFile('./db/db.json', newDb, (err) => 
  err ? console.error(err) : console.log('Success!'))
  window.location.reload();
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}!`)
);
