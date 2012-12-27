var pg = require('pg');

// Configure client
pg.defaults.poolSize = 10;

function connection(callback) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        callback.call({}, err, client);
    });
}

function query(text, params, callback) {
    connection(function(err, client) {
        if (err) {
            return callback.call({}, err, null);
        }
        client.query(text, params, function(err, result){
            callback.call({}, err, result);
        });
    });
}

module.exports =  {
    connection: connection,
    query: query
};
