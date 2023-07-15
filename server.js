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

app.get('/api/notes', (req, res) => {
  const dbData = fs.readFileSync('./db/db.json', 'utf8');
  const dbParse = JSON.parse(dbData);
  res.json(dbParse);
}); 

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
  }

  const dbData = fs.readFileSync('./db/db.json', 'utf8');
  const dbParse = JSON.parse(dbData);
  dbParse.push(newNote);
  const newDb = JSON.stringify(dbParse);

  fs.writeFile('./db/db.json', newDb, (err) => 
  err ? console.error(err) : console.log('Success!'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}!`)
);