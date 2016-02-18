/**
 * Created by shadow on 16/2/5.
 */

'use strict';

const app = require('express')();


//app.get('/',function(req,res,next){
//    console.log('001');
//    next();
//});
//
//app.get('/',function(req,res,next){
//    console.log('002');
//    next();
//});

//路由处理器组链
app.get('/',
    function(req,res,next){
        console.log('001');
        next();
    },
    function(req,res,next){
        console.log('002');
        next();
    },
    function(req,res){
        console.log('003');
        res.send('hello');
    });


















app.listen(3000);