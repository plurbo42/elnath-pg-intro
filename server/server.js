var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

var shoes = [{name: 'nike', cost: '75'}]

app.get('/shoes', function(req, res){
    res.send(shoes);
});

//for localhost 5000/shoes - should return array of shoe objects

app.listen(port, function(){
    console.log('listening on port ', port);
});

