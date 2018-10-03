var express = require('express');
var path = require('path');
var app = express();

// Set bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

// Set router
var router = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);

// 404 Not Found
app.use(function (req, res, next) {
    res.status(404).send('Not Found!');
});

// Server Error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Server Error!');
});

// Set port and Start server
app.listen(3000, function () {
    console.log('Server On');
})