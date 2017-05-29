'use strict';

const express   = require('express');
const config    = require('./config.js');

const app = express();

app.use(
  '/static',
  express.static(__dirname + '/public')
);

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(3000, () => {
  console.log('The server is running on port 3000');
});
