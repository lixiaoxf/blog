const Service = require('egg').Service;
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
// mongoose.connect('mongodb://127.0.0.1:27017/eggtest');
// const con = mongoose.connection;
// con.on('error', console.error.bind(console, '连接数据库失败'));
// con.once('open', () => {
//     console.log('连接成功');
// });

class testService extends Service {
    async getData() {
        console.log(this.app.mongoose)
        const conn = this.app.mongooseDB.get('db1'); 
        const UserSchema = new Schema({
            userName: { type: String  },
            age: { type: String  },
          });
        return conn.model('User', UserSchema);  
    }
    async saveData(){
        console.log('=============================')
        console.log(this.ctx.model.user)
        this.ctx.model.user.create({
            name:'lixiao',
            age:'21'
        },function(res){
            console.log(res)
        })
    }
  }
  
  module.exports = testService;