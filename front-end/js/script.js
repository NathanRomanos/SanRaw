// Nathan's Code:
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

console.log(sessionStorage)

//Automatic hide
$('#profileDiv').hide();

if (sessionStorage['length'] === 0) {
  console.log('session storage is empty');
  $('#loginUserBtn').show();
  $('#registerNewUserBtn').show();
  $('.logoutUserBtn').hide();
  $('#profileButton').hide();

} else {
  console.log('Session is being stored');
  $('#loginUserBtn').hide();
  $('#registerNewUserBtn').hide();
  $('.logoutUserBtn').show();
  $('#profileButton').show();
}
// Nathan's code ends

//
//
//
// LOGIN & REGISTER JS START

//Alexis' code:
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
        if (registerData === 'user details incorrect. Please try again') {
          alert ('Username in use. Please Register again');
        } else {
            console.log(registerData);
        }
      }, //success
      error : function(){
        console.log('error: user cannot be registered');
      }//error

    }); //ajax

  }); //registerForm
//Alexis' code ends


//Nathan's code:
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
        if (user == 'User not found. Please sign up'){
        alert('user not found. Please enter correct data or register a new user');

      } else if (user == 'Not authorized'){
          alert('Please try with correct details');
          $('#username').val('');
          $('#password').val('');
        } else{
          console.log('You are logged in');
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
          $('.logoutUserBtn').show();
          $('#profileButton').show();

        } // end inner if statement
      },// end success function
      error:function(){
        console.log('error: cannot call api');
      }//ed error message
    });//end ajax

  }// end outer if statement
});// end login function

// logout Btn
$('.logoutUserBtn').click(function(){
  console.log('You are logged out');
  sessionStorage.clear();
  $('#loginUserBtn').show();
  $('#registerNewUserBtn').show();
  $('#homeDiv').show();
  $('#profileDiv').hide();
  $('.logoutUserBtn').hide();
  $('#profileButton').hide();
  console.log(sessionStorage);
});
//
//
//
// LOGIN & REGISTER JS END






//
//
//
// PROFILE PAGE START


function editUserImg(){

};

//Profile Image
if (sessionStorage['user-profileImg'] == "undefined") {
  document.getElementById('userImgDiv').innerHTML = `<img id="userImg" class="userImg" src="http://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg" data-toggle="modal" data-target=".editProfileImg-modal" alt="Default User Image">`
} else {
    document.getElementById('userImgDiv').innerHTML = `<img id="userImg" class="userImg" src="${sessionStorage['user-profileImg']}" data-toggle="modal" data-target=".editProfileImg-modal" alt="User Image">`
};


$('#editUserImgSubmit').click(function(){
  event.preventDefault();
  console.log('hi');
    let userID = sessionStorage['user-id'];
    let profileImg = $('#editUserImgInput').val();

  $.ajax({
    url :`${url}/updateProfileImg/${userID}`,
    type :'PATCH',
    data:{
      profileImg : profileImg
    },
    success : function(user){
      console.log(user);
      sessionStorage.setItem('user-profileImg',user['profileImg']);
      console.log(sessionStorage);
    },// end success function
    error:function(){
      console.log('error: cannot call api');
    }//end error message
  });//end ajax
});

//Display information on profile page
$('#profileButton').click(function(){
  event.preventDefault();

  $('#homeDiv').hide();
  $('#profileDiv').show();

    let userID = sessionStorage['user-id'];
    let profileImg = $('#editUserImgInput').val();

  $.ajax({
    url :`${url}/displayUser/${userID}`,
    type :'GET',
    dataType :'json',
    success : function(displayUser){
      if (displayUser['profileImg'] == "undefined") {
        document.getElementById('userImgDiv').innerHTML = `<img id="userImg" class="userImg" src="http://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg" data-toggle="modal" data-target=".editProfileImg-modal" alt="Default User Image">`
      } else {
          document.getElementById('userImgDiv').innerHTML = `<img id="userImg" class="userImg" src="${displayUser['profileImg']}" data-toggle="modal" data-target=".editProfileImg-modal" alt="User Image">`
      };
      //displaying the ajax information on the page
      document.getElementById('userInfoResults').innerHTML =
      `<div class="col-2">
        <h6 class="userInfolabel"> First Name </h6>
        <br>
        <h6 class="userInfolabel"> Last Name </h6>
        <br>
        <h6 class="userInfolabel"> Description </h6>
      </div>
      <div class="col-4">
        <p class="userInfoInput">${displayUser['firstName']}</p>
        <br>
        <p class="userInfoInput">${displayUser['lastName']}</p>
        <br>
        <p class="userInfoInput">${displayUser['userDesc']}</p>
      </div>
      <div class="col-2">
        <h6 class="userInfolabel"> Username </h6>
        <br>
        <h6 class="userInfolabel"> Email </h6>
      </div>
      <div class="col-4">
        <p class="userInfoInput">${displayUser['username']}</p>
        <br>
        <p class="userInfoInput">${displayUser['email']}</p>
      </div>`;
      console.log(displayUser);

      //Retrieving edit modal information from ajax
      document.getElementById('editUser-modal').innerHTML =
      `<form>
          <div class="row">
						<div class="col-4">
							<label class="userInfoLabel" for="infoFormFirstName">First Name</label>
						</div>
						<div class="col-8">
							<input type="text" id="infoFormFirstName" class="form-control" value="${displayUser['firstName']}">
						</div>
					</div>
					<div class="row">
						<div class="col-4">
							<label class="userInfoLabel" for="infoFormLastName">Last Name</label>
						</div>
						<div class="col-8">
							<input type="text" id="infoFormLastName" class="form-control" value="${displayUser['lastName']}">
						</div>
					</div>
					<div class="row">
						<div class="col-4">
							<label class="userInfoLabel" for="infoFormDescription">Description</label>
						</div>
						<div class="col-8">
							<textarea class="form-control" id="infoFormDescription" rows="3">${displayUser['userDesc']}</textarea>
						</div>
					</div>
					<div class="row">
						<div class="col-4">
							<label class="userInfoLabel" for="infoFormUsername">Username</label>
						</div>
						<div class="col-8">
							<input type="text" id="infoFormUsername" class="form-control" value="${displayUser['username']}">
						</div>
					</div>
					<div class="row">
						<div class="col-4">
							<label class="userInfoLabel" for="infoFormEmail">Email</label>
						</div>
						<div class="col-8">
							<input type="email" id="infoFormEmail" class="form-control" value="${displayUser['email']}">
						</div>
					</div>
					<div class="row">
						<div class="col-4">
							<label class="userInfoLabel" for="infoFormPassword">Password</label>
						</div>
						<div class="col-8">
							<input type="password" id="infoPassword" class="form-control" placeholder="password">
						</div>
					</div>
				</form>`
    },// end success function
    error:function(){
      console.log('error: cannot call api');
    }//end error message
  });//end ajax
});


//Edit User Information Functionality
$('#editUserSubmit').click(function(){
  event.preventDefault();
  console.log('hi');

  let userID = sessionStorage['user-id'];
  let firstName = $('#infoFormFirstName').val();
  let lastName = $('#infoFormLastName').val();
  let userDesc = $('#infoFormDescription').val();
  let username = $('#infoFormUsername').val();
  let email = $('#infoFormEmail').val();
  let password = $('#infoPassword').val();

  console.log(username, password);

  if (username == '' || password == '' || email == '' || firstName == '' || lastName == '' || userDesc == ''){
    alert('Please enter all details');
  } else {

  $.ajax({
    url :`${url}/updateUser/${userID}`,
    type :'PATCH',
    data:{
      email : email,
      username : username,
      password : password,
      firstName : firstName,
      lastName : lastName,
      userDesc : userDesc
      },

    success : function(user){
      // if (#infoPassword) {
      //
      // }
      alert('updated the user');
      console.log(user);
      console.log(sessionStorage);

        //change the navbar
        $('#loginUserBtn').hide();
        $('#registerNewUserBtn').hide();
        $('#logoutUserBtn').show();
        $('#profileButton').show();
    },// end success function
    error:function(){
      console.log('error: cannot call api');
    }//ed error message
  });//end ajax

}// end outer if statement
});// end Update User function







//Home button
$('#homeButton').click(function(){
  event.preventDefault();

  $('#homeDiv').show();
  $('#profileDiv').hide();

});


//
//
//
// PROFILE PAGE END






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
