/**
 * Created by shadow on 16/2/9.
 */

const express = require('express');
const consolidate = require('consolidate');

const app = express();

app.engine('html',consolidate.ejs); //设置解析的扩展名
app.set('view engine','html'); //指定引擎扩展名的省略
app.set('views', __dirname + '/views');

app.get('/', function(req,res){

    const arr = [
        3,4,5,6,7,8,9
    ];

    res.render('home', {name:'tiger', arr, testFun:function(a,b){
        return a + b;
    }});

});





app.listen(3000);