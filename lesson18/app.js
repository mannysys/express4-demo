/**
 * Created by shadow on 16/2/5.
 */

'use strict';

const express = require('express');
const app = express();
const router = express.Router();

//加入子路由
//http://localhost:3000/myrouter/test
app.use('/myrouter',router);
//子路由
router.get('/test',function(req,res){
    res.send('sub router test');
});



//为根目录添加中间件 (监听的是根目录下全路径)
app.use('/',function(req,res,next){
    req.myname = 'leo';
    next();
});

app.get('/',function(req,res){
    res.send('hello world my name is ' + req.myname);
});
app.get('/test',function(req,res){
    res.send('hello world two my name is ' + req.myname);

});



//只要是访问allpath都会由该函数处理(all是匹配任意http动词方法)
app.all('/allpath',function(req,res){
    res.send('app all handle');
});



app.listen(3000);