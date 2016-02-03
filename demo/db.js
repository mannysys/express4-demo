/**
 * Created by shadow on 16/2/3.
 */

//数据持久化,存储到json文件中

const repos = require('./data');
const fs = require('fs');


module.exports = {
    store(){
        fs.writeFileSync(__dirname + '/data.json',JSON.stringify(repos));
    },
    get(index){
        return repos[index];//根据数组索引返回值
    },
    get list(){
        return repos;
    },
    add(article){
        repos.push(article);
        this.store();
    },
    del(index){
        repos.splice(index,1);
        this.store();
    },
    update(index,newArticle){
        repos.splice(index,1,newArticle);
        this.store();
    }
};