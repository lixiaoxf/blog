module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('test'); 
    const UserSchema = new Schema({
        columnId: {
            type: Schema.Types.ObjectId,
        },
        name:{
            type:'string'
        },
        age:{
            type:'string'
        }
    });
    return conn.model('user', UserSchema);
  };