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
  twitter.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
    console.log(data)
  });
}

// Match the home route
app.get('/', (req, res) => {
    res.render('index');
    profilInfo();
});

// Start server and watch for changes
app.listen(3000, (
    console.log('THe server is now running on port 3000')
));
