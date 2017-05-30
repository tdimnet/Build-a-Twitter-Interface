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

function getFriendsList() {
  twit.get('https://api.twitter.com/1.1/followers/list.json?user_id=' + config.access_token + '', (err, data, res) => {
    console.log(data.users.length);
  })
}


//https://dev.twitter.com/rest/reference/get/users/show => There is an error => I can not access the data with the only access token..
function getImageProfil() {
  twit.get('https://api.twitter.com/1.1/users/show.json?user_id=713045356720873472', (err, data, res) => {
    console.log(data);
  })
}

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(3000, () => {
  console.log('The server is running on port 3000');
  // getFriendsList();
  getImageProfil();
});
