//Nathan's code:
const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  productSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  productName : String,
  productDesc : String,
  productType : String,
  productImg1 : String,
  productImg2 : String,
  productImg3 : String,
  productPrice : Number,
  productUsername : String,
  productProfileImg : String,
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('Product', productSchema);
//end Nathan's code
