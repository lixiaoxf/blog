module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db'); 
   
    const Blog = new Schema({  
      title: { type: String  },
      desc: { type: String  },
      content: { type: String  },
      labels: { type: String }
    },{timestamps: {createdAt: 'created', updatedAt: 'updated'}});
   
    return conn.model('blog', Blog);
  }