const express = require('express');

const PORT = 3001;
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, '/public/')));

app.listen(PORT, () =>
  console.log(`Serving static asset routes at http://localhost:${PORT}!`)
);