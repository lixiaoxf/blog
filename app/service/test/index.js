const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open', () => {
    console.log('连接成功');
});
