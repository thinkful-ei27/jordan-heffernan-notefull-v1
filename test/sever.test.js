'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {
  
  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2+2).to.equal(4);
  });
});

describe('Express static', function () {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function () {

  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

//GET /api/notes returns 10 notes as an array of objects with id, title, and content
//should return correct search results with valid query

describe('GET api/notes', function () {

  it('should return 10 notes as an array of objects, each with id, title, and content', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ['id', 'title', 'content'];
        res.body.forEach(function(item) {
          expect(item).to.be.an('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });
});

describe('GET api/notes with search', function () {

  it('should return every note with defined search term as an array of objects, each with id, title, and content', function () {
    return chai.request(app)
      .get('/api/notes?searchTerm=gaga')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        const expectedKeys = ['id', 'title', 'content'];
        res.body.forEach(function(item) {
          expect(item).to.be.an('object');
          expect(item).to.include.keys(expectedKeys);
          expect(item.title).to.include('gaga');
        });
      });
  });
});

//GET /api/notes/:id should return correct note object with id, title, and content for give id
//should respond with a 404 for invalid ids (/api/notes/DOESNOTEXIST)

describe('GET /api/notes/:id', function () {

  it('should return a single note that matches the id as an object with an id, title, and content', function () {
    return chai.request(app)
      .get('/api/notes/1003')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).have.status(200);
        expect(res.body).to.be.an('object');
        const expectedKeys = ['id', 'title', 'content'];
        expect(res.body).to.include.keys(expectedKeys);
        expect(res.body.id).to.equal(1003);
      });
  });
});

describe('GET /api/notes/drooples', function () {
  it('should return 404 error that item does not exist', function () {
    return chai.request(app)
      .get('/api/notes/droople')
      .then(function (res) {
        expect(res).have.status(404);
        expect(res.body.message).to.include('Not Found');
      });
  });
});

//POST /api/notes should create and return a new item with location hearder when provided valid data
//should return and object with a message prop "missing title in request body" when missing 'title' field

describe('POST /api/notes', function () {

  it('should return an object representing new note item including id, title, and content', function () {
    const newItem = {title: 'You\'ll never guess how many cats can Vegeta take care of', content: 'over 9000'};
    return chai.request(app)
      .post('/api/notes/')
      .send(newItem)
      .then(function (res) {
        expect(res).to.exist;
        expect(res).have.status(201);
        expect(res.body).to.be.an('object');
        const expectedKeys = ['id', 'title', 'content'];
        expect(res.body).to.include.keys(expectedKeys);
        expect(res.body).to.deep.equal(
          Object.assign(newItem, { id: res.body.id })
        );
        // expect(res.body.title).to.deep.include(newItem.title);
        // expect(res.body.content).to.deep.include(newItem.content);
      });
  });
});

describe('POST /api/notes missing title', function () {

  it('should return 404 error and message requesting change to empty title', function () {
    const badItem = {content: 'this object is missing a cats title'};
    return chai.request(app)
      .post('/api/notes')
      .send(badItem)
      .then(function (res) {
        expect(res).to.exist;
        expect(res).have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.deep.include('Missing \'title\' in request body');
      });
  });
});

//PUT /api/notes/:id should update and return note object when given valid data
//should respond with 404 for invlaid id
//should return and object with a message prop "missing title in request body" when missing 'title' field

describe('PUT /api/notes/:id', function () {

  it('should return an object of delcared id with updated title and content provided', function () {
    const updateData = {
      title: 'no new titles, only old cats',
      content: 'Mr. Mustophulies, Korin, Señor Gato'
    };
    return chai.request(app)
      .put('/api/notes/1001')
      .send(updateData)
      .then(function (res) {
        expect(res).to.exist;
        expect(res).have.status(200);
        expect(res.body).to.be.an('object');
        const expectedKeys = ['id', 'title', 'content'];
        expect(res.body).to.include.keys(expectedKeys);
        expect(res.body).to.deep.equal(
          Object.assign(updateData, {id: res.body.id})
        );
      });
  });
});

describe('PUT /api/notes/:id', function () {

  it('should return 400 error with message saying there is a missing title in request body when empty title is submitted', function () {
    const badData = {
      content:'missing cat names'
    };
    return chai.request(app)
      .put('/api/notes/1000')
      .send(badData)
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res).have.status(400);
        expect(res.body.message).to.deep.include('Missing \'title\' in request body');
      });
  });
});

describe('PUT /api/notes/BADID', function () {

  it('should return 404 error when given a bad ID', function () {
    const updateData = {
      title: 'no new titles, only old cats',
      content: 'Mr. Mustophulies, Korin, Señor Gato'
    };
    return chai.request(app)
      .put('/api/notes/10000')
      .send(updateData)
      .then(function(res) {
        expect(res).to.exist;
        expect(res).to.be.json;
        expect(res).have.status(404);
        expect(res.body.message).to.deep.include('Not Found');
      });
  });
});

//DELETE /api/notes/:id should delete an item by id

describe('DELETE /api/notes/:id', function () {

  it('should return 204 status on delet of existing item', function () {
    return chai.request(app)
      .delete('/api/notes/1001')
      .then(function(res) {
        expect(res).have.status(204);
      });
  });
});