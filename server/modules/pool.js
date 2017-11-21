var pg = require('pg');

var config = {
    database: 'shoe_store',
    host: 'localhost',
    port: 5432,
    max: 10, //how many connections at one time
    idleTimeoutMilles: 30000, //
};

var pool = new pg.Pool(config);

module.exports = pool;