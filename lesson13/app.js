var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//通过前台模板 <input type="hidden" name="__method" value="search"/>
//伪装http请求方式,将GET/POST替换(express必须支持的方式可以去查http://expressjs.com/en/4x/api.html#req)
//app.use(function(req,res,next){
//  req.oldMethod = req.method; //先把http请求方式保存
//  req.method = req.query.__method; //重写http请求方式GET/POST,更换成search
//  next();
//});

//加入重写HTTP请求方式的中间件
app.use(methodOverride('__method'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//以中间件的方式,返回HTTP请求方式app.search,可以写一些逻辑业务
//app.use(methodOverride(function(req,res){
//
//  return req.body.__method;
//
//}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


app.search('/',function(req,res){
  res.send('my name is search ');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
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
