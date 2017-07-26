'use strict';

// Import statements
const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({ extended: true }));

// setter statements in order to show the templating files
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


// Take the username and profil picture of the declared user
const getProfil = function getProfilInfo(next) {
  twitter.get('account/verify_credentials', (err, data, response) => {
    const username = data.screen_name;
    const profilPicture = data.profile_image_url;
    const bannerPicture = data.profile_banner_url;
    const followersCount = data.followers_count;
    const profilData = {
      username: username,
      profilPicture: profilPicture,
      bannerPicture: bannerPicture,
      followersCount: followersCount
    };
    next(null, profilData);
  })
}

// Retrieve the five latest tweets of the user
const recentTweets = function getRecentTweets(next) {
  twitter.get('statuses/user_timeline', { count: 5 }, (err, data, response) => {

    const tweetsData = [];
    for (var i = 0; i < data.length; i++) {
      const dateSent = data[i].created_at.substr(0, 10);
      const yearSent = data[i].created_at.substr(26, 30);
      const fullDate = dateSent + ' ' + yearSent;

      const tweetInfo = {
        text: data[i].text,
        created_at: fullDate,
        username: data[i].user.screen_name,
        profilPicture: data[i].user.profile_image_url,
        retweets: data[i].retweet_count,
        like: data[i].favorite_count,
      }
      tweetsData.push(tweetInfo);
    }

    next(null, tweetsData);
  });
}

// Take the five latests recent friends of the user
const recentFriends = function getRecentFriends(next) {
  twitter.get('followers/list', { count: 5 }, (err, data, response) => {
    const friendsData = [];
    for (var i = 0; i < data.users.length; i++) {
      const friends = {
        realName: data.users[i].name,
        screenName: data.users[i].screen_name,
        profilPicture: data.users[i].profile_image_url
      }
      friendsData.push(friends);
    }
    next(null, friendsData)
  });
}


const privateMessages = function getPrivateRecentMessages(next) {
  twitter.get('direct_messages', { count: 5 }, (err, data, response) => {
    const directMessagesData = [];
    for (var i = 0; i < data.length; i++) {
      // Date format
      const dateSent = data[i].created_at.substr(0, 10);
      const yearSent = data[i].created_at.substr(26, 30);
      const fullDate = dateSent + ' ' + yearSent;

      // Time format
      const timeSent = data[i].created_at.substr(11, 9);

      const message = {
        text: data[i].text,
        profilPictureSender: data[i].sender.profile_image_url,
        senderUsername: data[i].sender.screen_name,
        fullDate: fullDate,
        timeSent: timeSent
      }
      directMessagesData.push(message)
    }
    next(null, directMessagesData)
  });
}


// Match the home route
app.get('/', (req, res) => {
    async.parallel(
      [
        getProfil,
        recentTweets,
        recentFriends,
        privateMessages,
      ], function(err, results) {
        const profilData = results[0];
        const TweetsData = results[1];
        const friendsData = results[2];
        const privateMessagesData = results[3];
        res.render('index', { profilData: profilData, TweetsData: TweetsData, friendsData: friendsData, privateMessagesData: privateMessagesData });
      }
    )
  }
);

// Post a new tweet from the interface
app.post('/', (req, res, next) => {
  // If a tweet exists, fill in the status and then redirect
  if (req.body.tweet) {
    twitter.post('statuses/update', { status: req.body.tweet }, (err, data, response) => {
      res.redirect('/');
    });
  // Otherwise redirect the user
  } else {
    res.redirect('/');
  }
});


// The error view
app.get('/error', (req, res) => {
    res.render('error');
});

// Handle 404 errors
app.use('*', (req, res) => {
    res.redirect('/error');
});



// Start server and watch for changes
app.listen(3000, (
    console.log('The server is now running on port 3000')
));
