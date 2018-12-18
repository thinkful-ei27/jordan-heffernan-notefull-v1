const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('forget', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

const newNote = {
  title: 'My Cat',
  content: 'George. He is the greatest cat!'
};

notes.create(newNote, (err, len) => {
  if (err) {
    console.error(err);
  } else {
    console.log(len);
  }
});

notes.delete(1010, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('deleted a note');
  }
} );