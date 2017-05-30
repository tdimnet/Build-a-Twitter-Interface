'use strict';

const express   = require('express');
const Twit      = require('twit');
const config    = require('./config.js');

const twit = new Twit(config);

const app = express();

app.use(
  '/static',
  express.static(__dirname + '/public')
);

function test() {
  twit.get('https://api.twitter.com/1.1/followers/list.json?user_id=' + config.access_token + '', (err, data, res) => {
    console.log(data);
    // console.log(config.access_token)
  })
}

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(3000, () => {
  console.log('The server is running on port 3000');
  test();
});
