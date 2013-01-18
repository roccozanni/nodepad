var SendGrid = require('sendgrid').SendGrid;

module.exports = function(app) {

    // Not-found handler
    app.use(function(req, res, next){
        res.status(404);
        res.render('error/404');
    });

    // Error Handler
    app.use(function(err, req, res, next){

        // Render page
        res.status(500);
        res.render('error/500');

        // Log on console
        console.error(err.stack);

        if (!process.env.SENDGRID_USERNAME || !process.env.SENDGRID_PASSWORD) {
            return;
        }

        // Send debug email
        new SendGrid(process.env.SENDGRID_USERNAME,process.env.SENDGRID_PASSWORD).send({
          to:       process.env.DEBUG_MAIL_TO,
          from:     process.env.DEBUG_MAIL_FROM,
          subject:  'Nodepad exception',
          text:     err.stack
        });

    });
};