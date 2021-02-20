var fs = require('fs')
var express = require('express')
var router = express.Router()
var dbPath = require('./db/users.json')
router.get('/api/user',function(req, res) {
    // fs.readFile(dbPath, 'utf8', function (err, data) {
    //     if(err){console.log(err)}
    //     else{console.log(data)}
    // })
})
router.post('/api/user',function(req, res) {
    // fs.readFile(dbPath, 'utf8', function (err, data) {
    //     if(err){console.log(err)}
    //     else{console.log(data)}
    // })
})