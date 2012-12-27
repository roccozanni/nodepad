var crypto = require('crypto');
var db     = require('../lib/db.js');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('static/index');
    });

    app.get('/favicon.ico', function(req, res) {
        res.send(404);
    });

    app.get('/login', function(req, res) {
        res.render('static/login', {redirect: req.query.redirect || '/documents' });
    });

    app.get('/logout', function(req, res) {
        req.session = null;
        res.redirect("/");
    });

    app.post('/authenticate', function(req, res) {

        var redirect = req.redirect || "/documents";
        var username = req.body.username;
        var password = crypto.createHash('sha1').update(req.body.password).digest("hex");

        db.query("SELECT * FROM users WHERE username = $1 and password = $2",
            [username, password], function(err, result) {

            if (err) {
                return next(new Error("username or password does not match"));
            }

            if (result.rows.length === 0) {
                return res.redirect('/login?redirect=' + res.redirect);
            }

            req.session.user_id = result.rows[0].user_id;
            res.redirect(redirect);
        });
    });
};