var express = require('express');
var app = express();
var https = require('https')
var http = require('http')

var multer = require('multer');
var cookiPars = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

app.use(require('cors')());
app.use(require('morgan')('dev'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser)
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

//var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
var sessionHandler = require('./public/js/session_hendler');
var store = sessionHandler.createStore();
app.use(cookiPars());

app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret'
}));



app.get('/', function (req, res) {
    res.render('monit.ejs');
});

app.get('/newusers', function (req, res) {
    res.render('newusers.ejs');
});

app.use(multer({ dest: "uploads" }).single("filedata"));

//подключение роутов
var authRout = require('./routes/auth');
var filsRoyt = require('./routes/savefile');




//использование роутов
app.use(authRout.login);
app.use(authRout.admin);
app.use(authRout.user);
app.use(filsRoyt.savefail);
app.use(authRout.logout);
app.use(authRout.algoritm);


app.get('/news', function (req, res) {
    res.render('news.ejs');
});



module.exports = app;