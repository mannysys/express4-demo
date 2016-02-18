/**
 * Created by shadow on 16/2/5.
 */

'use strict';

const app = require('express')();

//这种路径模式'/1/abc?d' ,c可有可无,访问的时候,可以加c也可以不加c
app.get('/1/abc?d',function(req,res){
    res.send('hello 1');
});
// '/2/abc+d' ,表示至少有一个c才能可以(多个c也可以)
app.get('/2/abc+d',function(req,res){
    res.send('hello 2');
});
// c和d之间可以不加字符,也可以加入任意字符,末尾必须是d结尾
app.get('/3/abc\*d',function(req,res){
    res.send('hello 3');
});
// 可以让bc出现也可以不出现
app.get('/4/a(bc)?d',function(req,res){
    res.send('hello 4');
});
// bc至少出现一次
app.get('/5/a(bc)+d',function(req,res){
    res.send('hello 5');
});
// 正则表达式模式 ab和cd之间,至少出现 1或者2
app.get(/\/6\/ab[1,2]cd/,function(req,res){
    res.send('hello 6');
});

// 数组模式,匹配下面2个
app.get(['/7/a(bc)?d','/8/a(bc)+d'],function(req,res){
    res.send('hello 7 and 8');
});



app.listen(3000);