var express = require('express');
var path = require('path');

var app = express();
var router = express.Router();

// If env is development, use webpack hot reloading
if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    require('./index.dev.js').useWebpackMiddleware(app);
} else {
    console.log('PRODUCTION ENVIRONMENT');
    app.use('/', express.static(__dirname + '/dist'));
    // TODO - Uncomment this when ready
    // app.use(favicon(path.join(__dirname, '../dist/imgs', 'favicon.ico')));
}

app.use('/4chan', require('./routes/4chan'));

app.use('/', function(req, res, next) {
  res.render('index');
  res.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
