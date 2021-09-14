var express = require('express');

var controller = require('../controllers/savefile');
var rout = express.Router();

module.exports.savefail = rout.post('/user', controller.save);