
module.exports = function(app) {

    // Not-found handler
    app.use(function(req, res, next){
        res.status(404);
        res.render('error/404');
    });

    // Error Handler
    app.use(function(err, req, res, next){
        res.status(500);
        res.render('error/500');
    });

};