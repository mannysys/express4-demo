'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//express内置的路由设置
app.set('strict routing',true); //不能在url最后加斜杠/
app.set('case sensitive routing',true);//开启大小写区分模式



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/testone',function(req,res){
  res.send('testone');

});


//创建路由对象
var router = express.Router({
  mergeParams:true, //合并副路由信息,导入上一个路由数据
  caseSensitive:true, //区分大小写
  strict:true //启动url最后面带斜杠的 /
});

router.get('/', function (req,res) {
  res.send('router info : '+req.params.name+req.params.group);
})


//如果url中用冒号: 会转换成json对象
//通过url访问http://localhost:3000/user/tiger/nodejs
app.get('/user/:name/:group',function(req,res,next){
  //通过这种方式可以得到name
  let name = req.params.name;
  let group = req.params.group;
  next();
});

app.use('/user/:name/:group',router);







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
