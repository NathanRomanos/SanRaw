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
// shorten bootstrap,popper and js linking
app.use((req, res, next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//indclude this to go to the next middleware
});
app.use(express.static('front-end'));
app.use('/bootstrap', express.static(path.join(__dirname, 'front-end/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'front-end/node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'front-end/node_modules/@popperjs/core/dist/umd')));
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
app.delete('/deleteUser/:id', (req,res)=>{ //create request to delete a user
  const idParam = req.params.id; //set new reference idParam from last forward slash in request
  const user = req.params.userId;
    User.findOne({_id:idParam},(err, userResult)=>{ //search Product db for id
    if (userResult) { //do this if present
      User.findOne({userId:user},(err,userResult2)=>{
          if (userResult2){
            User.deleteOne({_id:idParam},err=>{ //delete match
              res.send('deleted user'); //confirm message
            }); // end inner find one
          } else {
            res.send('wrong user');
          } // end else
      }); // end 2nd findone

    } else { //if not found do this
      res.send('not found') //no match message
    } // end else
  }).catch(err => res.send(err)); // end outer findone
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
app.get('/displayUser/p=:id', (req,res)=>{ //create request to search user by id
  const idParam = req.param.id; //set new reference idParam from last forward slash in request
  for (let i = 0; i < user.length; i++){ // run loop through db
    if (idParam.toString() === user[i]._id.toString()) { //if match is found do this
    res.json(user[i]); //print found project
    } // end if statement
  } // end for loop
}); // end display user by id

//Update User


//-------------------------------End User Section-------------------------------//





//-------------------------------Start Product Section-------------------------------//



//-------------------------------End Product Section-------------------------------//





//-------------------------------Start Comment Section-------------------------------//



//-------------------------------End Comment Section-------------------------------//

// leave right at bottom
app.listen(port, () => console.log(`App listening on port ${port}!`))
