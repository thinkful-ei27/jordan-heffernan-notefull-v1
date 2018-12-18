'use strict';

const express = require('express');
const data = require ('./db/notes');
const { PORT } = require('./config');
const { requestLogger } = require('./middleware/logger');

const app = express();

app.use(requestLogger);

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



app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});