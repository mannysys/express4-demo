/**
 * Created by shadow on 16/2/10.
 */

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());



app.get('/', function(req,res){

    res.send(req.cookies);

});

app.get('/add', function(req,res){
    var name = req.query.name;
    var value = req.query.value;
    //设置cookie
    res.cookie(name,value);
    res.send();
});


app.get('/remove', function(req,res){
    //删除cookie
    res.clearCookie('name');
    res.redirect('/');
});


app.listen(3000);