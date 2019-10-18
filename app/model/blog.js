module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db'); 
   
    const Blog = new Schema({
      title: { type: String  },
      des: { type: String  },
      content: { type: String  },
      img: { type: String },
      type: { type: String }
    });
   
    return conn.model('blog', Blog);
  }