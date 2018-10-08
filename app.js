var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
// view engine setup
mongoose.connect('mongodb://127.0.0.1:27017/chantoli1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connection succesful:');
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

require('./models/dictionary');
//require('./models/language');
require('./models/word');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dictionaryRouter = require('./routes/dictionary');
var courseRouter = require('./routes/course');
var videoRouter =  require('./routes/video');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dictionary', dictionaryRouter);
app.use('/course', courseRouter);
app.use('/video', videoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
