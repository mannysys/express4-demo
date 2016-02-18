/**
 * Created by shadow on 16/2/10.
 */


const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);
const app = express();

app.engine('html',consolidate.ejs);
app.set('views',__dirname + '/views');
app.set('view engine','html');

app.use(cookieParser());
app.use(session({
    store: new FileStore(),
    cookie: {maxAge:200000}, //存储有效时间200秒
    secret:'tiger' //任意加密的一个字符串
}));

app.use(bodyParser());

app.get('/', function(req,res){
    res.render('home',{logined:req.session.logined});
});
app.get('/login', function(req, res){
    if(req.session.logined){
        res.send('logined');
    }else{
        res.render('login');
    }
});
app.post('/login', function(req,res){
    var loginname = req.body.loginname;
    var password = req.body.password;
    if(loginname && password && loginname === 'leo' && password === '123'){
        req.session.logined = true;

        res.redirect('/');
    }else{
        res.render('login',{error:'登录失败!'})
    }

});


app.get('/logout',function(req,res){
    req.session.logined = undefined;
    res.redirect('back');
});



app.listen(3000);