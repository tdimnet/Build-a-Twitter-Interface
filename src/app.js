'use strict';

// Import statements
const express = require('express');
const Twit = require('twit');
const config = require('./config.js');

const app = express();
const twitter = new Twit(config);

// setter statements in order to show the templating files
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

const profilInfo = function getProfilInfo() {
  console.log('foo');
}

const recentFriends = function getRecentFriends() {
  twitter.get('followers/list', { count: 5 }, (err, data, response) => {
    console.log(data.users.length);
  });
}

// Match the home route
app.get('/', (req, res) => {
    res.render('index');
    // profilInfo();
    recentFriends();
});

// Start server and watch for changes
app.listen(3000, (
    console.log('THe server is now running on port 3000')
));
