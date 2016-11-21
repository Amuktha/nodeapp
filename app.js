var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var fs = require('fs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    extended: true
}));


app.get('/v1/users', function (req, res) {
    fs.readFile(__dirname + "/resources/" + "users.json", 'utf8', function (err, data) {
        if(err){
            console.log(err);
        }
        res.end(data);
    });
});

app.post('/v1/users', function(req,res){
    fs.readFile(__dirname + "/resources/" + "users.json", 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            obj.push(req.body); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back
        }});


    res.send(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});