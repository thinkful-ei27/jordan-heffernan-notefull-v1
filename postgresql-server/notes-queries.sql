SELECT title FROM notes;

SELECT id, title, created FROM notes LIMIT 5;

SELECT id, title, created FROM notes ORDER BY title ASC;

SELECT id, title, created FROM notes ORDER BY created DESC;

SELECT id, title, created FROM notes ORDER BY id DESC;

SELECT id, title, created FROM notes WHERE title = '7 things lady gaga has in common with cats';

SELECT id, title, created FROM notes WHERE title LIKE '% ways%';

UPDATE notes SET title = 'The Most amazing animals are all cats', content = 'Big Cat, Spooky Cat, Diddy Cat, Cyd Dog' WHERE id = 3;

SELECT id, title, created FROM notes WHERE title LIKE '% amazing %';

INSERT INTO notes
  (title) VALUES ('bad cats title');

DELETE FROM notes WHERE id = 5;