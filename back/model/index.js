var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); 

// Connection URL
var url = 'mongodb://localhost:27017';

// Database Name
var dbName = 'myproject';

//封装数据库的连接方法
function connect(callback){
    MongoClient.connect(url,function(err,client){
        if(err){
            console.log('Database connection err!')
        }else{
            var db = client.db(dbName)
            callback && callback(db)
            client.close()
        }
    })
}

module.exports ={
    connect
}