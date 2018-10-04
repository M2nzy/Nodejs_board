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
            res.render('board', { no: no, title: results[0].title, id: results[0].id, date: results[0].date, hit: results[0].hit, content: results[0].content });
        }
    });
});

// Create post page
router.get('/board', function (req, res) {
    res.render('create');
});

// Create process
router.post('/board', function (req, res) {
    connection.query('INSERT INTO board (title, id, password, content, date) VALUES ("' + req.body.title + '", "' + req.body.id + '","' + req.body.password + '","' + req.body.content + '",now())', function (err, results) {
        if (err) console.error("query error : " + err);
        res.redirect('/');
    });
});

// Enter what you want to edit
router.get('/update/:no', function (req, res) {
    var no = req.params.no;

    connection.query('SELECT title, id, password, content, date from board WHERE no="' + no + '"', function (err, results) {
        if (err) console.error("query error : " + err);
        else {
            res.render('update', { no: no, title: results[0].title, id: results[0].id, content: results[0].content });
        }
    });
});

// Update post page (no=?)
router.post('/update/:no', function (req, res) {
    var no = req.params.no;
    var PASSWORD = req.body.password;

    connection.query('SELECT password FROM board WHERE no="' + no + '"', function (err, results) {
        // PASSWORD correct => Update
        if (results[0].password === PASSWORD) {
            connection.query('UPDATE board SET title="' + req.body.title + '", content="' + req.body.content + '" WHERE no="' + no + '"', function(err, results){
                if (err) console.error("query error : " + err);
                res.redirect('/');
            });
        }
        else {
            res.redirect('/');
        }
    });
});

// Enter ID and PASSWORD to delete
router.get('/delete/:no', function (req, res) {
    var no = req.params.no;
    res.render('delete', { no: no });
});

// Delete post page (no=?)
router.post('/delete/:no', function (req, res) {
    var no = req.params.no;
    var ID = req.body.id;
    var PASSWORD = req.body.password;

    connection.query('SELECT id, password FROM board WHERE no="' + no + '"', function (err, results) {
        // ID, PASSWORD correct => Delete
        if (results[0].password === PASSWORD && results[0].id === ID) {
            connection.query('DELETE FROM board WHERE no="' + no + '"', function (err, results) {
                if (err) console.error('query error : ' + err);
                res.redirect('/');
            });
        }
        else {
            res.redirect('/');
        }
    });
});

// Created by
router.get('/about', function (req, res) {
    res.render('about');
});

module.exports = router;