var express = require('express');
var app     = express();

// Configuration - common
app.configure(function(){

    // Options
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });

    // Middlewares
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.cookieSession({
        key: process.env.COOKIE_KEY || 'nodepad',
        secret: process.env.COOKIE_SECRET || 'secret'
    }));
    app.use(express['static'](__dirname + '/public'));
    app.use(app.router);
});

// Configuration - development
app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Configuration - production
app.configure('production', function() {
    app.use(express.errorHandler());
});

// Init controllers
require('./controllers/static.js')(app);
require('./controllers/documents.js')(app);
require('./controllers/error.js')(app);

// Start server
var port = process.env.LISTEN || 8080;

app.listen(port, function() {
    console.log("Listening on " + port);
});