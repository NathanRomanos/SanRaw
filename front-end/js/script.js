console.log('hello?');

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



//
//
//
// PRODUCT JS END