var express = require('express');


var controller = require('../controllers/auth');
var rout = express.Router();

module.exports.admin = rout.get('/admin', controller.admin);
module.exports.login = rout.post('/login', controller.login);
module.exports.user = rout.get('/user', controller.user);
module.exports.logout = rout.get('/logout', controller.logout);
module.exports.register = rout.post('/reg', controller.register);
module.exports.algoritm = rout.post('/algorim', controller.algoritm);