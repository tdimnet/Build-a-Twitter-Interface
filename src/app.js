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

// Retrieve the five most recents friends
function getFriendsList() {
  twit.get('https://api.twitter.com/1.1/followers/list.json?user_id=' + config.access_token + '', (err, data, res) => {
    const usersList = data.users.slice(0,5);
    console.log(usersList, usersList.length);
  })
}

// Retrieve the five most recents tweets
function getMostRecentTweets() {
  twit.get('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=713045356720873472', (err, data, res) => {
    console.log(data);
  });
}

// Retrieve the five most recents tweets (need to configure a new access token)
function getDirectMessages() {
  twit.get('https://api.twitter.com/1.1/direct_messages.json', (err, data, res) => {
    console.log(data);
  });
}

//https://dev.twitter.com/rest/reference/get/users/show => There is an error => I can not access the data with the only access token..
function getImageProfil() {
  twit.get('https://api.twitter.com/1.1/users/show.json?user_id=' + config.access_token + '', (err, data, res) => {
    console.log(data);
  });
}

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(3000, () => {
  console.log('The server is running on port 3000');
});
