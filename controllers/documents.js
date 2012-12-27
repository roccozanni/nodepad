
var moment  = require('moment');
var _       = require('underscore');
var db      = require('../lib/db.js');
var auth    = require('../lib/auth.js');

module.exports = function(app) {

    app.get('/documents/:id', auth.restrict, function(req, res, next) {

        db.query("SELECT * FROM documents WHERE document_id = $1 and user_id = $2",
            [req.params['id'], req.session.user_id], function(err, result) {

            if (err || result.rows.length === 0) {
                return next(err);
            }

            res.render('documents/document', result.rows[0]);
        });
    });

    app.put('/documents/:id', auth.restrict, function(req, res, next) {

        var title   = req.body.title;
        var content = req.body.content;

        //TODO data validation

        db.query("UPDATE documents SET title = $1, content = $2 WHERE document_id = $3 and user_id = $4 RETURNING *",
            [title, content, req.params['id'], req.session.user_id], function(err, result) {

            if (err) {
                return next(err);
            }

            res.send(result.rows[0]);
        });
    });

    app.get('/documents', auth.restrict, function(req, res, next) {

            db.query("SELECT * FROM documents WHERE user_id = $1 ORDER BY created_at DESC",
                [req.session.user_id], function(err, result) {

            if (err) {
                return next(err);
            }

            _.each(result.rows, function(row) {
                row.created_from_now = moment(row.created_at).fromNow();
            });

            res.render('documents/documents', { documents: result.rows });
        });
    });

    app.post('/documents', auth.restrict, function(req, res, next) {

        var title   = req.query.title || req.body.title || "Document created at " + (new Date()).toString();

        db.query("INSERT INTO documents (document_id, user_id, title, created_at) VALUES (DEFAULT, $1, $2, CURRENT_TIMESTAMP) RETURNING document_id",
            [req.session.user_id, title], function(err, result) {

            if (err) {
                return next(err);
            }

            res.redirect('/documents/' + result.rows[0].document_id);
        });
    });
};
