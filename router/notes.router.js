'use strict';

const express = require('express');
const router = express.Router();
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

router.get('/notes', (req, res, next) => {
  const searchTerm = req.query.searchTerm;
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

router.get('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    res.json(item);
  });
});

router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    } if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

module.exports = { router };