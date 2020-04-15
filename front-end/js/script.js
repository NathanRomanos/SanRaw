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


//
//
//
// PRODUCT JS END












}); // end document.ready function
