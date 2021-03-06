var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var labelRouter = require('./routes/label');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('hust'));
app.use(require('cors')())
//set session
app.use(session({
  secret: 'hust',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*1} //time
}))

app.use(express.static(path.join(__dirname, 'public')));

//登录拦截
// app.get('*',function(req,res,next){
//   var username = req.session.username
//   var path = req.path
//   console.log('session',username)
  
//   if(path !='/login' && path != '/regist'){
//     if(!username){
//       console.log('no user')
//       // res.redirect('/login')
//     }
//   }
//   next()
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/label',labelRouter);



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
