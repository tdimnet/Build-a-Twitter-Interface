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


// Take the username and profil picture of the declared user
const getProfil = function getProfilInfo(next) {
  twitter.get('account/verify_credentials', function(err, data, response) {
    const username = data.screen_name;
    const profilPicture = data.profile_image_url;
    const firstData = {
      username: username,
      profilPicture: profilPicture
    };
    next(null, firstData);
  })
}

const recentTweets = function getRecentTweets() {
  twitter.get('statuses/user_timeline', { count: 5 }, (err, data, response) => {
    // console.log(data);
  });
}

const recentFriends = function getRecentFriends(next) {
  twitter.get('followers/list', { count: 5 }, (err, data, response) => {
    next(null, data.users)
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
        getProfil,
        recentFriends,
      ], function(err, results) {
        // Accessing followers object this way = results[1].users[0]
        const profilData = results[0];
        console.log(results[1]);
        res.render('index', { profilData: profilData });
      }
    )




  }
);



// Start server and watch for changes
app.listen(3000, (
    console.log('The server is now running on port 3000')
));
