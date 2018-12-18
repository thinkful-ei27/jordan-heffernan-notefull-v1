'use strict';

const express = require('express');
const data = require ('./db/notes');
const simDB = require ('.db/simDB');
const notes = simDB.initilize(data);
const { PORT } = require('./config');

const { requestLogger } = require('./middleware/logger');

const app = express();



app.get('/api/notes', (req, res, ) => {
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

app.use(requestLogger);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });  
  next();
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});



app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});