'use strict';

// Import statements
const express = require('express');
const Twit = require('twit');
const config = require('./config.js');

const app = express();
const twitter = new Twit(config);


// serve the static files
app.use(
  '/static',
  express.static(__dirname + '/public')
);

// setter statements in order to show the templating files
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


const profilInfo = function getProfilInfo() {
  twitter.get('account/verify_credentials', (err, data, response) => {
    // console.log(data);
  });
}

const recentTweets = function getRecentTweets() {
  twitter.get('statuses/user_timeline', { count: 5 }, (err, data, response) => {
    // console.log(data);
  });
}

const recentFriends = function getRecentFriends() {
  twitter.get('followers/list', { count: 5 }, (err, data, response) => {
    // console.log(data);
  });
}

const privateMessages = function getPrivateRecentMessages() {
  twitter.get('direct_messages', { count: 5 }, function (err, data, response) {
    // console.log(data)
  });
}


// Match the home route
app.get('/', (req, res, next) => {
    var twitData = {};
    // For now, the first promise comes from here :)
    twitter.get('account/verify_credentials', { skip_status: true })
      .catch(err => {
        console.log('caught error', err.stack)
      })
      .then(result => result.data)
      .then(data => {
        return twitData = {
          username: data.screen_name
        }
      })
      .then(newData => {
        console.log(newData);
        res.render('index', { twitterData: newData });
      })
  }
);



// Start server and watch for changes
app.listen(3000, (
    console.log('The server is now running on port 3000')
));
