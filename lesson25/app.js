/**
 * Created by shadow on 16/2/8.
 */

'use strict';

const express = require('express');
const app = express();


app.get('/download', function(req, res){
    res.download('./readme.txt');
});

//返回json格式数据
app.get('/json', function(req,res){
   res.send({name:'my name is tiger'});
});

//跳转
app.get('/redirect', function(req,res){
    res.redirect('/json');
});

app.get('/send', function(req,res){
   //res.send({name: 'tiger'});
   // res.send(new Buffer('jjjjjjjj'));

    res.send('<h1 style="color:red;">hello</h1>');

});




app.listen(3000);