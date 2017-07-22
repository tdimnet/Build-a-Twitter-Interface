'use strict';

// Import statements
const express = require('express');
const async = require('async');
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
  const foo = twitter.get('account/verify_credentials', function(err, data, response) {
    return data;
  })
  return foo;
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
app.get('/', (req, res) => {
    var twitData = {};

    async.parallel(
      [
        function(next) {
          twitter.get('account/verify_credentials', function(err, data, response) {
            const firstData = data;
            next(null, firstData)
          })
        },
        function(next) {
          twitter.get('followers/list', { count: 5 }, (err, data, response) => {
            const secondData = data;
            next(null, secondData)
          });
        }
      ], function(err, results) {
        // Accessing followers object this way = results[1].users[0]
        console.log(results[1].users[0]);
        res.render('index');
      }
    )




  }
);



// Start server and watch for changes
app.listen(3000, (
    console.log('The server is now running on port 3000')
));
