// Nathan's code:
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to parse all data coming from the user and db
const cors = require('cors'); //to include cross orgin request
const bcryptjs = require('bcryptjs');//to hash and compare password in an encrypted method
const config = require('./config.json');//has credentials
const User = require('./models/user.js'); //this refers to the structure for user ojects
const Product = require('./models/product.js'); //this refers to the structure for product ojects
const Comment = require('./models/comment.js'); //this refers to the structure for product ojects

const port = 8888; //set server port [8888: localhost / 3000: 192.168.33.10]

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/sum3?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true}) // connect to above
.then(()=> console.log('Mongo DB connection established!')) //success message
.catch(err =>{ //error catch
  console.log(`DBConnectionError: ${err.message}`); //error message
});

//test the connectivity
const db = mongoose.connection; // checks for connection
db.on('error', console.error.bind(console, 'connection error:')); //error message
db.once('open', function() { // on open do this once
  console.log('You are now connected to Mongo DB!'); // success message
});
// end Nathan's code

// Alexis' code:
// shorten bootstrap,popper and js linking (only works with public folder structure)
app.use((req, res, next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//indclude this to go to the next middleware
});
// app.use(express.static('front-end'));
// app.use('/bootstrap', express.static(path.join(__dirname, 'front-end/node_modules/bootstrap/dist')));
// app.use('/jquery', express.static(path.join(__dirname, 'front-end/node_modules/jquery/dist')));
// app.use('/popper', express.static(path.join(__dirname, 'front-end/node_modules/@popperjs/core/dist/umd')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
// end Alexis' code

//Nathan's code:
app.get('/', (req, res) => res.send('Hello World!')) //prints message on load

//-------------------------------Start User Section-------------------------------//

//Sign Up User
app.post('/signUpUser', (req,res)=>{ // this is for create
  User.findOne({username:req.body.username},(err,userResult)=>{   //checking if user is found in the db already
    if (userResult){
      res.send('Username already exists. Please try another one');
    } else{
       const hash = bcryptjs.hashSync(req.body.password); //hash the password
       const user = new User({
         _id : new mongoose.Types.ObjectId,
         username : req.body.username,
         firstName : req.body.firstName,
         lastName : req.body.lastName,
         email : req.body.email,
         password : hash
       });
       //save to database and notify the user accordingly
       user.save().then(result =>{
         res.send(result);
       }).catch(err => res.send(err));
    } // end else
  }) // end user.findone
}); //end sign up user


//Delete User
app.delete('/deleteUser/:id',(req,res) => {
  const idParam = req.params.id;
  User.findOne({_id:idParam}, (err, user) => { //_id refers to mongodb
    if (user) {
      User.deleteOne({_id:idParam}, err => {
        res.send('Deleted user');
      }); // end delete one
    } else {
      res.send('User not found');
    } // end else statement
  }).catch(err => res.send(err)); // end find one
}); // end delete user


//Log In User
app.post('/loginUser', (req,res)=>{
  User.findOne({username:req.body.username},(err,userResult)=>{
    if (userResult){
      if (bcryptjs.compareSync(req.body.password, userResult.password)){
        res.send(userResult);
      } else {
        res.send('Not authorized');
      } // end inner if
    } else {
       res.send('User not found. Please sign up');
    } // end outer if
  }); // end findOne
}); // end login user


//Log Out User (apparantly this happens in the front end js)


//Display All Users
app.get('/displayAllUsers', (req,res)=>{ //create request to show all products within Product
  User.find().then(result =>{ // finds Product db
  res.send(result); //print result
  }) // end find()
}); // end display all users


//Display User by id
app.get('/displayUser/:id', (req,res)=>{ //create request to search user by id
  const idParam = req.params.id;
  User.findOne({_id:idParam}, (err, user) => { //_id refers to mongodb
    if (user) {
      res.send(user);
    } else {
      res.send('User not found');
    } // end else statement
  }).catch(err => res.send(err)); // end find one
}); // end display user by id


//Update User
app.patch('/updateUser/:id',(req,res)=> {
  const idParam = req.params.id;
  User.findById(idParam,(err)=> {
    const hash = bcryptjs.hashSync(req.body.password); //hash the password
    const updatedUser = {
      username : req.body.username,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : hash,
      userDesc : req.body.userDesc
    }; // end updated user const
    User.updateOne({_id:idParam}, updatedUser).then(result => {
      res.send(result);
    }).catch(err => res.send(err)); // end update one
  }).catch(err => res.send('User not found')); // end find by id
}); // end update user


//Update Profile Picture
app.patch('/updateProfileImg/:id',(req,res)=> {
  const idParam = req.params.id;
  User.findById(idParam,(err)=> {
    const updatedUser = {
      profileImg : req.body.profileImg
    }; // end updated user const
    User.updateOne({_id:idParam}, updatedUser).then(result => {
      res.send(result);
    }).catch(err => res.send(err)); // end update one
  }).catch(err => res.send('User not found')); // end find by id
}); // end update user

//-------------------------------End User Section-------------------------------//


//-------------------------------Start Product Section-------------------------------//

//Add Product
app.post('/addProduct', (req,res)=> {
 // checking if product is found in the db already
  Product.findOne({name:req.body.productName},(err, productResult)=> {
    if (productResult){
      res.send('Product is already in database. Please try again!');
    } else {
      const addProduct = new Product({
        _id : new mongoose.Types.ObjectId,
        productName : req.body.productName,
        productDesc : req.body.productDesc,
        productType : req.body.productType,
        productImg1 : req.body.productImg1,
        productImg2 : req.body.productImg2,
        productImg3 : req.body.productImg3,
        productPrice : req.body.productPrice,
        productUsername : req.body.productUsername,
        productProfileImg : req.body.productProfileImg,
        user_id : req.body.user_id
      }); // end add product const
      //save to database and notify the user accordingly
      addProduct.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    } // end else statement
  }) // end find one
}); // end add product


//Delete Product
app.delete('/deleteProduct/:id',(req,res) => {
  const idParam = req.params.id;
  Product.findOne({_id:idParam}, (err, product) => { //_id refers to mongodb
    if (product) {
      Product.deleteOne({_id:idParam}, err => {
        res.send('Deleted product');
      }); // end delete one
    } else {
      res.send('Product not found');
    } // end else statement
  }).catch(err => res.send(err)); // end find one
}); // end delete product


//Update Product
app.patch('/updateProduct/:id',(req,res)=> {
  const idParam = req.params.id;
  Product.findById(idParam,(err)=> {
    const updatedProduct = {
      productName : req.body.productName,
      productDesc : req.body.productDesc,
      productType : req.body.productType,
      productImg1 : req.body.productImg1,
      productImg2 : req.body.productImg2,
      productImg3 : req.body.productImg3,
      productPrice : req.body.productPrice
    };
    Product.updateOne({_id:idParam}, updatedProduct).then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  }).catch(err => res.send('Product not found')); // end find by id
}); // end update product


//Display All Products
app.get('/displayAllProducts', (req, res)=> {
  Product.find().then(result => {
    res.send(result);
  }); // end product.find()
}); // end display all products


//Display Single Product
app.get('/displaySingleProduct/:id', (req,res)=>{
  const idParam = req.params.id;
  Product.find({_id:idParam}, (err, product) => {
    if (product) {
      res.send(product);
    } else {
      res.send('Product not found');
    } // end else statement
  }).catch(err => res.send(err)); // end find one
}); // end display single product


//Display Products By User
app.get('/displayUserProducts/:id', (req,res)=>{
  const idParam = req.params.id;
  Product.find({user_id:idParam}, (err, product) => {
    if (product) {
      res.send(product);
    } else {
      res.send('User not found');
    } // end else statement
  }).catch(err => res.send(err)); // end find one
}); // end display products by user


//-------------------------------End Product Section-------------------------------//


//-------------------------------Start Comment Section-------------------------------//

//Add Comment
app.post('/addComment', (req,res)=> {
  const addComment = new Comment({
    _id : new mongoose.Types.ObjectId,
    commentText : req.body.commentText,
    commentUsername : req.body.commentUsername,
    commentProfileImg : req.body.commentProfileImg,
    seller : req.body.seller,
    user_id : req.body.user_id,
    product_id : req.body.product_id
  }); // end add comment const
      //save to database and notify the user accordingly
  addComment.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
}); // end add comment


//Delete Comment
app.delete('/deleteComment/:id',(req,res) => {
  const idParam = req.params.id;
  Comment.findOne({_id:idParam}, (err, comment) => { //_id refers to mongodb
    if (comment) {
      Comment.deleteOne({_id:idParam}, err => {
        res.send('Deleted comment');
      }); // end delete one
    } else {
      res.send('Comment not found');
    } // end else statement
  }).catch(err => res.send(err)); // end find one
}); // end delete comments


//Display All Comments
app.get('/displayAllComments', (req, res)=> {
  Comment.find().then(result => {
    res.send(result);
  }); // end product.find()
}); // end view all comments


//Display Comments by Product
app.get('/displayProductComments/:id', (req,res)=>{
  const idParam = req.params.id;
  Comment.find({product_id:idParam}, (err, comment) => {
    if (comment) {
      res.send(comment);
    } else {
      res.send('Product not found');
    } // end else statement
  }).catch(err => res.send(err)); // end find one
}); // end display product comments


//-------------------------------End Comment Section-------------------------------//


// leave right at bottom
app.listen(port, () => console.log(`App listening on port ${port}!`))
