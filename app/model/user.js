module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db'); 
   
    const User = new Schema({  
      photo: { type: String,default:''  },
      name: { type: String  },
      password: { type: String },
    });
   
    return conn.model('blogUser', User);
  }