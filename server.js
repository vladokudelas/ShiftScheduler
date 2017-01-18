var express = require('express')
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')
var moment = require('moment');

var saveDir = path.join(__dirname, 'save');
 
var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/', function (req, res) {
    var fileName = moment().format('YYYY-M-D-HH-mm-ss') + '.json';
    var filePath = '';
    if (req.body.month) {
        var dirPath = path.join(saveDir, moment(res.month).format('YYYY-M'));
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        filePath = path.join(dirPath, fileName)
    } else {
        filePath = path.join(saveDir, fileName);
    }

    jsonfile.writeFile(filePath, req.body.data, function (err) {
        console.error(err)
    })

    res.send('ok');
})

app.listen(3000, function () {
    console.log('Server app listening on port 3000!')
})