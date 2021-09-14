var cookiPars = require('cookie-parser');
var sessions = require('express-session');

var MSSQLStore = require('connect-mssql')(sessions);
var mssql = require('mssql');

module.exports = {
    createStore: function () {
        var config = {
            user: 'SA',
            password: 'Server1215',
            server: '192.168.56.110',
            datebase: 'TestDB',
            //port:'',
             pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            }
        }
       // return new MSSQLStore(config);
    }
}


