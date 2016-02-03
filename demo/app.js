'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//文件数据库
var db = require('./db');

var routes = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');

//验证码
var PW = require('png-word');
var pw = PW(PW.GRAY);
var r = require('random-word')('abcdefghijklmnopqrst0123456789');


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
//加入插件express-session
app.use(session({
  secret: 'keyboard cat'
}));
app.use(express.static(path.join(__dirname, 'public')));


// 验证码refresh png number
app.get('/refresh', function (req,res) {
  var numtxt = req.session.validat_num = r.random(4);
  pw.createPNG(numtxt, function (pngnum) {
    res.send(pngnum);
  })
});

//主页面
app.get('/', function(req,res) {
  // logined判断用户是否登录
  res.render('index',{list:db.list, logined:req.session.logined});

});
//添加数据
app.post('/add', function(req,res){
  //req.body.title 请求post方式
  db.add({title:req.body.title}); //添加表单数据
  res.redirect('/');//跳转到首页
});
//删除数据
app.get('/del', function(req,res){
  //req.query.index 请求get方式
  let index = req.query.index;
  db.del(index);
  res.redirect('/');//跳转到首页
});
//根据index查找数据,做更改数据
app.get('/get/:index', function(req,res){
  //req.params.index请求ajax方式
  var index = req.params.index;
  var article = db.get(index);
  res.send(article);
});
//更改数据
app.post('/update', function(req,res){
  var index = req.body.index;
  var title = req.body.title;
  db.update(index,{title});
  res.redirect('/');//跳转到首页
});

//登录功能
app.post('/login', function(req,res){
  let loginname = req.body.loginname;
  let password = req.body.password;
  let vnum = req.body.vnum;
  if(loginname === 'leo' && password === '123' && vnum === req.session.validat_num){
    req.session.logined = true;
    res.send('success');
  }else{
    res.send('error');
  }

});
//退出功能
app.get('/logout',function(req,res){
  req.session.logined = false;
  res.redirect('/');//跳转到首页
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
