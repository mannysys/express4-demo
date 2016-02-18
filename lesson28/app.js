/**
 * Created by shadow on 16/2/10.
 */


const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();


app.use(cookieParser());
//设置属性加密
app.use(session({
    secret:'tiger' //任意加密的一个字符串
}));

//
app.get('/num', function(req,res){
    if(!req.session.num){
        req.session.num = 1;
    }

    req.session.num++;
    res.send('my num is ' + req.session.num);

});


app.listen(3000);