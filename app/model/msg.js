var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title:  String
  });
const opts = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    socketTimeoutMS: 30000,
    poolSize: 10,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    autoReconnect: true,
    useNewUrlParser:true
};  
var db = mongoose.createConnection('mongodb://lixiao:lixiao@127.0.0.1:27017/pp', opts)

var Blog = db.model('blog', blogSchema);  

Blog.find().then(res=>{
    console.log(res)
})