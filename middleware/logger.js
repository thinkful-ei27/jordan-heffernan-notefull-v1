'use strict';

const morgan = require('morgan');
morgan('dev');

module.exports = {morgan};

// function requestLogger(req, res, next) {
//   const now = new Date();
//   console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`);
//   next();
// }

// module.exports = { requestLogger };