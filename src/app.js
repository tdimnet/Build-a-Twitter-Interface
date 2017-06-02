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

// Retrieve the profil info
const getProfilInfo = () => {
  twit.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    console.log('caught error', err.stack)
  })
  .then(function (result) {
    console.log('data', result.data);
  })
};

// Retrieve the most recents friends
const getRecentFriends = () => {
  twit.get('followers/list',  function (err, data, response) {
    console.log(data.users)
  });
}

// Retrieve the most recents private messages
const getRecentPrivateMessages = () => {
  twit.get('direct_messages',  function (err, data, response) {
    console.log(data.users)
  });
}


app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(3000, () => {
  console.log('The server is running on port 3000');
  getRecentPrivateMessages();
});
