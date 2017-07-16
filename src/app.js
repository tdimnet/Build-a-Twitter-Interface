'use strict';

// Import statements
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, (
    console.log('THe server is now running on port 3000')
));
