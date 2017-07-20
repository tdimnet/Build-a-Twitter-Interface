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
    console.log('Fetching profil info');
    profilInfo();
    next();
  }, (req, res, next) => {
    console.log('Fetching recent tweets');
    recentTweets();
    next();
  }, (req, res, next) => {
    console.log('Fetching recent friends');
    recentFriends();
    next();
  }, (req, res, next) => {
    console.log('Fetching private messages');
    privateMessages();
    next();
  }, (req, res, next) => {
    console.log('Displaying view');
    res.render('index');
  }
);

// Start server and watch for changes
app.listen(3000, (
    console.log('THe server is now running on port 3000')
));
