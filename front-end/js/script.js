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


// ---------------- Shay Code Starts --------------


// VIEW ALL PRODUCT CARDS
function viewProducts(){
	$.ajax({
		url : `${url}/displayAllProducts`,
		type : 'GET',
		dataType : 'json',
		success : function(products) {
			// console.log(products);
			document.getElementById('cardContainer').innerHTML += "";
			//Display all product cards
			for (let i = 0; i < products.length; i++) {
				document.getElementById('cardContainer').innerHTML +=
				`<div class="card col-4"">
			  		<img src="${products[i].productImg1}" class="card-img-top" alt="Card Thumbnail">
		  			<div class="card-body">
		    			<h5 class="card-title">${products[i].productName}</h5>
		    			<p class="card-text">$${products[i].productPrice}.00</p>
		    			<button type="button" class="btn cardBtn" id="viewProjectBtn" data-toggle="modal" data-target=".product-modal">View More</button>
		  			</div>
				</div>`;
			}
		}, //success
		error: function(){
			console.log('Error: Cannot call API');
		} // error
	}); //ajax
} //viewProducts function 
viewProducts();


// VIEW PROJECT MODAL
		function showProductModal(modal){
			console.log(modal);
			document.getElementById('productModal').innerHTML +=
				`<div class="modal fade bd-example-modal-lg product-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
				  <div class="modal-dialog modal-lg" role="document">
				    <div class="modal-content">
				      <div class="modal-header productModalHeader">
				        <h3 class="modal-title">Product Name</h3>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body productModalBody">
				        <h6> Username </h6>
				        	<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
							  <ol class="carousel-indicators">
							    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
							    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
							    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
							  </ol>
							  <div class="carousel-inner">
							    <div class="carousel-item active">
							      <img src="img/bannerImg.jpg" class="d-block w-100" alt="...">
							    </div>
							    <div class="carousel-item">
							      <img src="img/bannerImg.jpg" class="d-block w-100" alt="...">
							    </div>
							    <div class="carousel-item">
							      <img src="img/bannerImg.jpg" class="d-block w-100" alt="...">
							    </div>
							  </div>
							  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
							    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
							    <span class="sr-only">Previous</span>
							  </a>
							  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
							    <span class="carousel-control-next-icon" aria-hidden="true"></span>
							    <span class="sr-only">Next</span>
							  </a>
							</div>
							<div class="row">
								<div class="col">
								<p> This section will contain information about the plant as written by the seller. </p>
								<h4> $00.00 </h4>
								<button class="btn cardBtn" data-dismiss="modal"> Buy </button>
								</div>
								<div class="col">
									<h5> Comment </h5>
								</div>
							</div>
				      </div>
				    </div>
				  </div>
				</div>`;
		} //showProductModal() function ends 
		showProductModal();



// ADD PROJECT
 $('#addProjectForm').submit(function(){

 	event.preventDefault();

    let productName = $('#addProductFormName').val();
    let productDesc = $('#addProductFormDescription').val();
	let productType = $('#addProductFormType').val();
	let productImg1 = $('#addProductFormImg1').val();
	let productImg2 = $('#addProductFormImg2').val();
	let productImg3 = $('#addProductFormImg3').val();
	let productPrice = $('#addProductFormPrice').val();
    let user_id = sessionStorage.getItem('user-id');

    console.log(productName, productDesc, productType, productImg1, productImg2, productImg3, productPrice);

    // check to see that all necessary fields have been entered
    if (productName == '' || productDesc == '' || productType == '' || productImg1 == '' || productImg2 == '' || productImg3 == '' ||  productPrice == ''){
		alert('Please enter all details');
	} else {

      $.ajax({
        url :`${url}/addProduct`,
        type : 'POST',
        data : {
          productName : productName,
          productDesc : productDesc,
          productType : productType,
          productImg1 : productImg1,
          productImg2 : productImg2,
          productImg3 : productImg3,
          productPrice : productPrice,
          user_id : user_id
        },

        success : function(product){
        	console.log(product);
           if (!(product == 'name taken already. Please try another one')) {
		      alert('added the product');
		      } else {
		        alert('name taken already. Please try another one');
      		  }

		   	$('#addProductFormName').val();
		    $('#addProductFormDescription').val();
			$('#addProductFormType').val();
			$('#addProductFormImg1').val();
			$('#addProductFormImg2').val();
			$('#addProductFormImg3').val();
			$('#addProductFormPrice').val();
			$('#addProductuser_id').val();
		    $('#addProductFormUserId').val();

			 }, //success
			 error:function(){
			 	console.log('error: cannot call api');
			 } // error
		}); // ajax
  	}; //else
}); // end of add portfolio function

 // UPDATE PRODUCT 


 // DELETE PRODUCT

//Categories Menu Functionality
  $('#categoriesMenuBtn').click(function(){
    $('#categoriesMenu').toggle();
  });


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



//
//
//
// PRODUCT JS END












}); // end document.ready function
