const express = require('express');
const router = express.Router();

// MySQL connect - table name : board
var mysql = require('mysql');
var dbconfig = require('../mysql/db_info');
var connection = mysql.createConnection(dbconfig);

// index page (Print all posts)
router.get('/', function (req, res) {
    connection.query('SELECT * FROM board ORDER BY date DESC', function (err, results) {
        if (err) console.error("query error : " + err);
        else {
            res.render('index', { data: results });
        }
    });
});

// Print post (no=?)
router.get('/board/:no', function (req, res) {
    var no = req.params.no;
    connection.query('SELECT title, id, date, hit, content from board WHERE no="' + no + '"', function (err, results) {
        if (err) console.error("query error : " + err);
        else {
            res.render('board', { data: results });
        }
    });
});

// Create post page
router.get('/create', function (req, res) {
    res.render('create');
});

// Create process
router.post('/create', function (req, res) {
    connection.query('INSERT INTO board (title, id, password, content, date) VALUES ("' + req.body.title + '", "' + req.body.id + '","' + req.body.password + '","' + req.body.content + '",now())', function (err, results) {
        if (err) console.error("query error : " + err);
        res.redirect('/');
    });
});

// Created by
router.get('/about', function (req, res) {
    res.render('about');
});

module.exports = router;