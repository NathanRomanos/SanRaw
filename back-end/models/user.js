//Nathan's code:
const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const userSchema = new mongoose.Schema({
_id : mongoose.Schema.Types.ObjectId,
email : String,
username : String,
password : String,
firstName : String,
lastName : String,
userDesc : String,
profileImg : String
});

module.exports = mongoose.model('User', userSchema);
//Nathan's code ends
