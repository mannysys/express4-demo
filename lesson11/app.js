/**
 * Created by shadow on 16/2/3.
 */

var express = require('express');
//获取路由对象
var router = express.Router();
//定义个子路由
var subrouter = express.Router();


//定义中间件函数
function testmiddle(req,res,next){
    console.log('test testmiddle !');
    next();
}
function testmiddle2(req,res,next){
    console.log('test testmiddle 2222 !');
    next();
}

//相对于子路由下的
subrouter.get('/',function(req,res){
    res.send('subrouter ok !!');
});

//加入子路由定义的中间价(请求访问子路由的时候,才会调用该函数)
router.use(testmiddle2);

//加入子路由下的子路由,相对于下面的app.use('/router1',router);子路由下的子路由
//http://localhost:3001/router1/sub
router.use('/sub',subrouter);

//这个路由是子路由,是相对于下面,app.use('/router1',router); 这个路由
//http://localhost:3001/router1
router.get('/', function(req,res){
    res.send('router test 1');
});
router.get('/url1', function(req,res){
    res.send('router url1');
});



var app = express();

//根路由加入中间件,访问根的时候首先经过该函数
app.use('/',function(req,res,next){
    req.name = 'tiger';
    next();
});


app.use(testmiddle);//加入定义的中间件函数
app.get('/', function(req,res){

    res.send('hello world ' + req.name);

});

//监听路由
app.use('/router1',router);


app.listen(3001);