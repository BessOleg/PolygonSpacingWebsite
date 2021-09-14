var fs = require('fs');
function fileHandler() {
    fs.readFile('users.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log(obj);
        
    });
}
