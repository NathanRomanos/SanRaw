console.log('working');

let url;

$.ajax({

		url :'config.json',
		type :'GET',
		dataType :'json',
		success : function(configData){
			console.log(configData);
			url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
		},
		error:function (){
			console.log('oops');
		}
   }); // end initial server GET


$(document).ready(function() {

  
//Automatic hide
  $('#logoutUserBtn').hide();

//
//
//
// LOGIN & REGISTER JS START

//register [alexis]
$('#register_sub').click(function(){

    event.preventDefault();

    let username = $('#register_username').val();
    let firstName = $('#register_firstName').val();
    let lastName = $('#register_lastName').val();
    let email = $('#register_email').val();
    let password = $('#register_password').val();

    // username = document.getElementById('register_username').value;
    // firstName = document.getElementById('register_firstName').value;
    // lastName = document.getElementById('register_lastName').value;
    // email = document.getElementById('register_email').value;
    // password = document.getElementById('register_password').value;
    console.log(username,firstName,lastName,email,password);

    $.ajax({
      url : `${url}/signUpUser`,
      type : 'POST',
      data:{
      	username : username,
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password
      },
      success : function(registerData){
        console.log(registerData);
        if (registerData === 'user details incorrect. Please try again') {
          alert ('Username in use. Please Register again');
        } else { 
      sessionStorage.setItem('username', registerData['username']);
      sessionStorage.setItem('firstName', registerData['firstName']);
      sessionStorage.setItem('lastName', registerData['lastName']);
      sessionStorage.setItem('email', registerData['email']);
      sessionStorage.setItem('password', registerData['password']);
        }
      }, //success
      error : function(){
        console.log('error: user cannot be registered');
      }//error

    }); //ajax
    
  }); //registerForm


//login
<<<<<<< HEAD
$('#loginSubmit').click(function(){
event.preventDefault();

let username = $('#loginUsername').val();
let password = $('#loginPassword').val();

console.log(username, password);

	if (username == '' || password == ''){
	  alert('Please enter all details');
	} else {

	$.ajax({
	  url :`${url}/loginUser`,
	  type :'POST',
	  data:{
	    username : username,
	    password : password
	    },

	  success : function(user){
	    console.log(user);
	    if (user == 'user not found. Please register'){
	    alert('user not found. Please enter correct data or register a new user');

	    } else if (user == 'not authorized'){
	      alert('Please try with correct details');
	      $('#username').val('');
	      $('#password').val('');
	    } else{
	      //save the user's details in the session storage to be used later
	      sessionStorage.setItem('user-id', user['_id']);
	      sessionStorage.setItem('user-userName',user['username']);
	      sessionStorage.setItem('user-firstName',user['firstName']);
	      sessionStorage.setItem('user-lastName',user['lastName']);
	      sessionStorage.setItem('user-email',user['email']);
	      sessionStorage.setItem('user-profileImg',user['profileImg']);
	      sessionStorage.setItem('user-userDesc',user['userDesc']);
	      console.log(sessionStorage);

	      //change the navbar
	      $('#loginUserBtn').hide();
	      $('#registerNewUserBtn').hide();
	      $('#logoutUserBtn').show();

	    } // end inner if statement
	  },// end success function
	  error:function(){
	    console.log('error: cannot call api');
	  }//ed error message
	});//end ajax

	}// end outer if statement
=======
  $('#loginSubmit').click(function(){
    event.preventDefault();

    let username = $('#loginUsername').val();
    let password = $('#loginPassword').val();

    console.log(username, password);

    if (username == '' || password == ''){
      alert('Please enter all details');
    } else {

    $.ajax({
      url :`${url}/loginUser`,
      type :'POST',
      data:{
        username : username,
        password : password
        },

      success : function(user){
        console.log(user);
        if (user == 'user not found. Please register'){
        alert('user not found. Please enter correct data or register a new user');

        } else if (user == 'not authorized'){
          alert('Please try with correct details');
          $('#username').val('');
          $('#password').val('');
        } else{
          //save the user's details in the session storage to be used later
          sessionStorage.setItem('user-id', user['_id']);
          sessionStorage.setItem('user-userName',user['username']);
          sessionStorage.setItem('user-firstName',user['firstName']);
          sessionStorage.setItem('user-lastName',user['lastName']);
          sessionStorage.setItem('user-email',user['email']);
          sessionStorage.setItem('user-profileImg',user['profileImg']);
          sessionStorage.setItem('user-userDesc',user['userDesc']);
          console.log(sessionStorage);

          //change the navbar
          $('#loginUserBtn').hide();
          $('#registerNewUserBtn').hide();
          $('#logoutUserBtn').show();

        } // end inner if statement
      },// end success function
      error:function(){
        console.log('error: cannot call api');
      }//ed error message
    });//end ajax

  }// end outer if statement
>>>>>>> 2f2fd4abc9d48e436bdf60ed1101ecc8371230fe
});// end login function

// logout Btn
$('#logoutUserBtn').click(function(){
  console.log('You are logged out');
  sessionStorage.clear();
  $('#loginUserBtn').show();
  $('#registerNewUserBtn').show();
  $('#logoutUserBtn').hide();
  console.log(sessionStorage);
});
//
//
//
// LOGIN & REGISTER JS END






//
//
//
// USER JS START



//
//
//
// USER JS END






//
//
//
// PRODUCT JS START

  
//Categories Menu Functionality
  $('#categoriesMenuBtn').click(function(){
    $('#categoriesMenu').toggle();
  });
<<<<<<< HEAD

//displays all plants [alexis]
$.ajax({
url :`${url}/displayAllProducts`, //from Mongo db
type :'GET',
dataType:'json',

success : function(productCard){
  console.log(productCard);

  document.getElementById('cardContainer').innerHTML = "";
	  for(let i=0; i<productCard.length; i++){
	    document.getElementById('cardContainer').innerHTML +=
		
		`		<div class="card col-4">
				  <img src="${productCard[i].productImg1}" class="card-img-top" alt="Card Thumbnail">
				  <div class="card-body">
				    <h5 class="card-title">${productCard[i].productName}</h5>
				    <p class="card-text">${productCard[i].productPrice}</p>
				    <button type="button" class="btn cardBtn" data-toggle="modal" data-target=".product-modal">View More</button>
				  </div>
				</div>
	    `;
	  }
  },//success

  error:function(){
    console.log('error: product cards cannot be called');
  }//error
});//ajax


//displays modal content [alexis]
// $.ajax({
// url :`${url}/displayAllProducts`, //from Mongo db
// type :'GET',
// dataType:'json',

// success : function(productModal){
//   console.log(productModal);

//   document.getElementById('modal-content').innerHTML = "";
// 	  for(let i=0; i<productCard.length; i++){
// 	    document.getElementById('modal-content').innerHTML +=
		
// `
// 	<div class="modal-header productModalHeader">
// 		<h3 class="modal-title">${productCard[i].productName}</h3>
// 		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
// 		<span aria-hidden="true">&times;</span>
// 		</button>
// 	</div>
// 		<div class="modal-body productModalBody">
// 			<h6> ${productCard[i].productType} </h6>

// 				<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
// 					<ol class="carousel-indicators">
// 						<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
// 						<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
// 						<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
// 					</ol>
// 					<div class="carousel-inner">
// 						<div class="carousel-item active">
// 						<img src="${productCard[i].productImg1}" class="d-block w-100" alt="...">
// 					</div>
// 						<div class="carousel-item">
// 						<img src="${productCard[i].productImg2}" class="d-block w-100" alt="...">
// 					</div>
// 						<div class="carousel-item">
// 						<img src="${productCard[i].productImg3}" class="d-block w-100" alt="...">
// 					</div>
// 				</div>
// 				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
// 					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
// 					<span class="sr-only">Previous</span>
// 				</a>
// 				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
// 					<span class="carousel-control-next-icon" aria-hidden="true"></span>
// 					<span class="sr-only">Next</span>
// 				</a>
// 				</div>

// 				<div class="row">
// 					<div class="col">
// 						<p> ${productCard[i].productDesc}</p>
// 						<h4> ${productCard[i].productPrice} </h4>
// 						<button class="btn cardBtn" data-dismiss="modal"> Buy </button>
// 					</div>
// 					<div class="col">
// 						<h5> Comment </h5>
// 					</div>
// 				</div>
// 		</div>
// `;
// 	  }
//   },//success

//   error:function(){
//     console.log('error: modal cannot be called');
//   }//error
// });//ajax
=======
>>>>>>> 2f2fd4abc9d48e436bdf60ed1101ecc8371230fe


//
//
//
// PRODUCT JS END












}); // end document.ready function
