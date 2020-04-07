const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  itemSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String,
  desc : String,
  type : String,
  img1 : String,
  img2 : String,
  img3 : String,
  price : Number,
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('Item', itemSchema);
