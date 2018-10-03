const express = require('express');
const router = express.Router();

// MySQL connect
var mysql = require('mysql');
var dbconfig = require('../mysql/db_info');
var connection = mysql.createConnection(dbconfig);

// index page (Print all posts)
router.get('/', function (req, res) {
    connection.query('SELECT * FROM board ORDER BY date DESC', function (err, results) {
        if (err) console.error("query error : " + err);
        else {
            obj = {print : results};
            res.render('index', obj);
        }
    })
});

// Created by
router.get('/about', function (req, res) {
    res.render('about');
});

module.exports = router;