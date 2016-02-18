/**
 * Created by shadow on 16/2/4.
 */

'use strict';
const express = require('express');
const app  = express();
const router = express.Router();


router.param('id',function(req,res,next,value){
    console.log('value',value);
    next();
});

//做处理url参数路由
//app.param('id', function(req,res,next,id){
//    if(id !== '001'){
//        res.send(404);
//    }else{
//        next();
//    }
//
//});


router.get('/user/:id',function(req,res){

    res.send(`
        user's id = ${req.params.id}
    `);

});


app.use('/',router);


app.listen(3000);