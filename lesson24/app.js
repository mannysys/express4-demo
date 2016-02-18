/**
 * Created by shadow on 16/2/8.
 */

'use strict';

const express = require('express');
const multer = require('multer');

const app = express();

/* 第一种上传方法 */
//var storage = multer.diskStorage({
//    //指定临时文件夹
//    destination: function (req, file, cb) {
//        cb(null, 'myfiles2')
//    },
//    //指定文件名
//    filename: function (req, file, cb) {
//        cb(null, file.fieldname + '-' + Date.now())
//    }
//})

/* 第二种上传方法 */
//上传的文件,全都存储在内存中,并没有写入到硬盘,上传后属性中buffer是数据体
var storage = multer.memoryStorage();

//上传文件过滤器
var fileFilter = function(req,file,cb){
    //如果上传的图片类别不等于'image/jpeg',就过滤掉
    if(file.mimetype !== 'image/jpeg'){
        cb(null, false);
    }else{
        cb(null, true);
    }

}


var upload = multer({ storage: storage, fileFilter});


/* 第三种上传方法 */
//const upload = multer({ dest: 'myfiles'}); //上传的文件存储目录

app.use(express.static('public')); //指定静态目录
//app.use(upload.single('myfile')); //加入中间件,解析一个文件
//app.use(upload.array('myfile',3)); //可以一次上传多个文件,最多3个
//可以上传name属性名不同文件(maxCount允许上传最大多少个)
//app.use(upload.fields([{name:'myfile',maxCount:2},{name:'myfile2',maxCount:1}]));

//中间件
var  myUpload = upload.fields([{name:'myfile',maxCount:2},{name:'myfile2',maxCount:1}]);

//拦截 /upload 这个路由,先执行中间件myUpload
app.post('/upload', function(req, res){

    myUpload(req,res, function next(err){
        if(err){
            res.send('上传文件格式不正确');
        }else{
            console.log(req.body);
            console.log(req.file);
            console.log(req.files);
            res.redirect('/');
        }
    });

});


//处理中间件抛出的错误
//function myMiddle(req,res,next){
//    next(new Error('错误信息!'));
//};
//app.get('/test', function(req,res){
//    myMiddle(req,res, function(err){
//        if(err){
//            res.send('error !');
//        }
//    });
//
//});


app.listen(3000);