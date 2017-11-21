var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
var port = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/shoes', function(req, res){
    //attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            //There was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        }else{
            //we connected to the database. Let's get things from the database
            client.query('SELECT * FROM shoes;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('query failed ', errorMakingQuery)
                    res.sendStatus(500);
                }else{
                    res.send(result.rows);
                }
            })
        }
    });
});

//pg configuration below
var config = {
    database: 'shoe_store',
    host: 'localhost',
    port: 5432,
    max: 10, //how many connections at one time
    idleTimeoutMilles: 30000, //
}

var pool = new pg.Pool(config)

//for localhost 5000/shoes - should return array of shoe objects

app.listen(port, function(){
    console.log('listening on port ', port);
});

