var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



require('./lib/mongooseConnection');
require('./models/Advert');
require('./models/User');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/apiv1/adverts', require('./routes/apiv1/adverts'));
app.use('/apiv2/adverts', require('./routes/apiv2/adverts'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page

  res.status(err.status || 500);

  if(isApi(req)){

      // En vez de este código, llamar a customError para internacionalizar
    res.json({success:false,error:err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.render('error');
});

//Miro si es una llamada a la api
function isApi(req) {
    return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
