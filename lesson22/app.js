/**
 * Created by shadow on 16/2/6.
 */

const express = require('express');
const app = express();

var version = 100;


function freshHandle(req, res, next){
    //每次响应回去之前,必须调用下这个set,通过它可以设置头部信息
    res.set('etag',version);

    //通过可以判断客户端缓存内容是不是新的
    //如果是新数据,客户端就直接使用自己的缓存的数据,就不会从服务器端获取资源
    //如果req.fresh是true的话,req.stale肯定是false
    if(req.fresh){
        res.send();
    }else{
        next();
    }
}


app.get('/test', freshHandle, function(req,res){
    res.send('version ' + version);
});

//模拟下更新服务器端内容
app.get('/update', function(req,res){
    ++version;
    res.send();
});



//判断客户端是不是通过ajax请求访问的
app.get('/ajaxTest', function(req,res){
    // req.xhr返回的是true表示是ajax访问
    console.log('is xhr : ', req.xhr);


});




app.listen(3000);