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


//
//
//
// PRODUCT JS END












}); // end document.ready function
