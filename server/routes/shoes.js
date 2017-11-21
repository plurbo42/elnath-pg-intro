var express = require('express');
var router = express.Router();

var pool = require('../modules/pool')

router.get('/', function (req, res) {
    //attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //There was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database. Let's get things from the database
            client.query('SELECT * FROM shoes;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('query failed ', errorMakingQuery)
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    });
});

router.post('/', function (req, res) {
    //attempt to connect to db
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase)
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO shoes (name, cost) VALUES($1, $2);`, [req.body.name, req.body.cost], function(errorMakingQuery, result){
                console.log('Error making query ', errorMakingQuery)
                done();
                if(errorMakingQuery){
                    console.log('query failed ', errorMakingQuery)
                    res.sendStatus(500);
                }else{
                    res.sendStatus(201);
                }
            })
        }
    })
});

module.exports = router;
