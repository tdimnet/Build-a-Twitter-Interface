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
  twit.get('https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl&result_type=recent', function(err, data, response) {
    console.log(data)
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
