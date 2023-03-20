var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
///////////////////////////////////////////////////////////////////
var adminRouter = require('./src/admin/routes/index');
var apiRouter = require('./src/api/routes/index');
var connectDB = require('./src/utils/helper/connectDB')
///////////////
const session = require('express-session')
// const Redis = require('ioredis')

// const RedisStore = require('connect-redis').default
// const clientRedis = new Redis({
//   port: 1805
// })
require("dotenv").config();




////////////////////////////////////////////////////////////
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect db
connectDB()

///setup session redis
app.use(session({
  secret: process.env.SESSION_SECRET,
  // store: new RedisStore({client: clientRedis}),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 30 * 60 * 1000
  }
}))

// router ///////////////////////////////

app.use('/api', apiRouter)
app.use('/', require('./src/admin/routes/index'))
// apiRouter(app)

//////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('not found')
 
  res.render('404', {layout: false});
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
