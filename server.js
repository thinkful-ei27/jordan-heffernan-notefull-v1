'use strict';

// Load array of notes
// const data = require('./db/notes');

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require ('./db/notes');

const app = express();

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

app.get('/api/notes', (req, res) => {
  res.json(data);
});


app.get('/api/notes/:id', (req, res) => {
  // const item = data.find(item => item.id === Number(req.id));
  console.log(req.params);
  res.json(data.find(item => item.id === Number(req.params.id)));
  
});