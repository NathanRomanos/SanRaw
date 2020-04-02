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

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@${config.MONGO_CLUSTER}.mongodb.net/sum3?retryWrites=true&w=majority`; //set what mongoDb to look at (set which collection with word after mongodeb.net/)
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



//-------------------------------Start User Section-------------------------------//



//-------------------------------End User Section-------------------------------//





//-------------------------------Start Product Section-------------------------------//



//-------------------------------End Product Section-------------------------------//





//-------------------------------Start Comment Section-------------------------------//



//-------------------------------End Comment Section-------------------------------//