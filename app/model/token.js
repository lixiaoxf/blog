module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db'); 
   
    const Token = new Schema({  
      uid: { type: String  },
      token: { type: String  }
    });
   
    return conn.model('token', Token);
  }