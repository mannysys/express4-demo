/**
 * Created by shadow on 16/2/10.
 */
'use strict';

const express = require('express');
const app = express();
const consolidate = require('consolidate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');


app.use(cookieParser());
app.use(session({
    secret: 'xxxx',
    cookie:{maxAge:2000000}
}));
app.use(bodyParser());

app.engine('html',consolidate.ejs);
app.set('view engine','html');
app.set('views',__dirname + '/views');


//生成随机数
function generateRandomNum(x){
    if(!x) x = 10;
    return Math.round(Math.random() * x);
}

app.get('/validate',function(req,res){
    const a = generateRandomNum();
    const b = generateRandomNum();

    req.session.a = a;
    req.session.b = b;

    res.locals.msg = `
        ${a} + ${b} =
    `;
    res.render('validate');
});


app.post('/validate',function(req,res){
    var a = req.session.a;
    var b = req.session.b;
    var sum = a + b;

    //parseInt转换类型
    if(parseInt(req.body.sum) === sum){
        res.send('success');
    }else{
        res.send('error');
    }

});






app.listen(3000);