/**
 * Created by shadow on 16/2/5.
 */

'use strict';

const express = require('express');
const app = express();


//设置静态资源访问目录, 通过index可以指定默认访问的首页
//app.use(express.static('public',{index:'main.html'}));

//设置允许访问public目录下以点 .开头html文件,http://localhost:3000/.myfile.html
//app.use(express.static('public',{dotfiles:'allow'}));

// extensions:['html'] 访问url可以不用写.html后缀,可以匹配htm后缀的
app.use(express.static('public',{
    extensions:['html','htm'],
    //如果首页匹配不到index.html,还可以匹配main.html
    index:['index.html','main.html'],
    dotfiles:'allow'
}));

//可以设置多个静态资源文件夹(最好放在所有代码前面)
app.use(express.static('public'));
app.use(express.static('static'));


app.listen(3000);























