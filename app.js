var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

// router test
var router = require('./routes/index')(app);

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/*
mongoose.connect('mongodb://localhost/boards', { useNewUrlParser: true });
var db = mongoose.connection;

db.once("open", function () {
    console.log("DB connected");
});
db.on("error", function (err) {
    console.log("DB ERROR : ", err);
})
*/

// set port and start server
app.listen(3000, function(){
    console.log('Server On');
})