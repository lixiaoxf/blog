module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db'); 
   
    const Labels = new Schema({  
      name: { type: String  },
      blogIds: { type: Array }
    });
   
    return conn.model('Labels', Labels);
  }