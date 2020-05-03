const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const commentSchema = new mongoose.Schema({
_id : mongoose.Schema.Types.ObjectId,
commentText : String,
commentUsername : String,
commentProfileImg : String,
seller : Boolean,
user_id : {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'User'
},
product_id: {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'Product'
}
});

module.exports = mongoose.model('Comment', commentSchema);
//Nathan's code ends
