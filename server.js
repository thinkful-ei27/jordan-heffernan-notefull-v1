'use strict';

const express = require('express');

const data = require ('./db/notes');

const app = express();

const { PORT } = require('./config');

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

app.get('/api/notes', (req, res) => {
  if (req.query.searchTerm) {
    const searchTerm = req.query.searchTerm;
    const resData = data.filter(item => item.title.includes(`${searchTerm}`) || item.content.includes(`${searchTerm}`));
    res.json(resData);
  } else {
    res.json(data);
  }
});


app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(item => item.id === Number(req.params.id)));
});