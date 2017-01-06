// Libs
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Configuration
const PORT = process.env.PORT || 8081;

//The Routes
var ringbell = require('./routes/ringbell');
var health = require('./routes/healthcheck');

// The app
let app = express();

app.use('/', ringbell);
app.use('/health', health);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
//app.use(function (err, req, res, next) {
//    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//    // render the error page
//    res.status(err.status || 500);
//    res.render('error');
//});

app.listen(PORT);
console.log("Server listening on: http://localhost:%s", PORT);

// Export the app for unit testing
module.exports = app;