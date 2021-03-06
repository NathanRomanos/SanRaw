console.log('working');

let url;

// Set the url [Nathan]
$.ajax({

		url :'config.json',
		type :'GET',
		dataType :'json',
		success : function(configData){
			console.log(configData);
			url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;

      $.ajax({
      url :`${url}/displayAllProducts`, //from Mongo db
      type :'GET',
      dataType:'json',

      success : function(productCard){
        console.log(productCard);

        //Display the cards on home [Nathan, Alexis produced the HTML]
        document.getElementById('cardContainer').innerHTML = "";
          for(let i=0; i<productCard.length; i++){
            document.getElementById('cardContainer').innerHTML +=

              `<div class="card col-4">
                <img src="${productCard[i].productImg1}" class="card-img-top" alt="Card Thumbnail">
                <div class="card-body">
                  <h5 class="card-title">${productCard[i].productName}</h5>
                  <p class="card-text">${productCard[i].productPrice}</p>
                  <button type="button" class="btn cardBtn" data-toggle="modal" data-target=".product-modal" data-ID="${productCard[i]._id}">View More</button>
                </div>
              </div>`;
          }
        },// end product card success
        error:function(){
          console.log('error: product cards cannot be called');
        }//error
      });//ajax
		}, // end config data success
		error:function (){
			console.log('oops');
		}
}); // end initial server GET


$(document).ready(function() {

console.log(sessionStorage)

//Automatic functions [Nathan]
$('#profileDiv').hide();


//Nav bar conditions [Nathan]
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
};

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


//login [Nathan]
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

// logout Btn [Nathan]
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

//Edit the Profile Picture [Nathan]
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

//Display information on profile page [Nathan]
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
        document.getElementById('userImgDiv').innerHTML = `<img id="userImg" class="userImg" src="images/profile.jpg" data-toggle="modal" data-target=".editProfileImg-modal" alt="Default User Image">`
      } else {
          document.getElementById('userImgDiv').innerHTML = `<img id="userImg" class="userImg" src="${displayUser['profileImg']}" data-toggle="modal" data-target=".editProfileImg-modal" alt="User Image">`
      };

      //displaying the ajax information on the page [Nathan, Shay produced the HTML]
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

      //Retrieving edit modal information from ajax [Nathan, Shay produced the HTML]
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


				// VIEW PRODUCTS ON USER PAGE (Shay)

				function userProducts(){

					let userID = sessionStorage['user-id'];

					$.ajax({
					url :`${url}/displayUserProducts/${userID}`, //from Mongo db
					type :'GET',
					dataType:'json',
						success : function(viewData){
						  console.log(viewData);

						  document.getElementById('userProducts').innerHTML = "";
							  for(let i=0; i < viewData.length; i++){
							  	// console.log(viewData[i].user-id);
							    document.getElementById('userProducts').innerHTML +=
								`<div class="card col-4">
								  <div class="image-div">
									  <img src="${viewData[i].productImg1}" class="card-img-top card-thumbnail" alt="Card Thumbnail">
									</div>
								  <div class="card-body">
								    <h5 class="card-title">${viewData[i].productName}</h5>
								    <p class="card-text">$${viewData[i].productPrice}.00</p>
								    <button type="button" class="btn cardBtn" data-toggle="modal" data-target=".product-modal">View More</button>
								    <div class="secondaryCardDiv">
									    <button type="button" class="btn secondaryCardBtn" data-toggle="modal" data-target=".edit-product-modal" id="editProductBtn" >Edit</button>
									    <button type="button" class="btn secondaryCardBtn" data-toggle="modal" data-target=".product-delete-confirmation-modal" id="deleteProduct" >Delete</button>
								  	</div>
								  </div>
								</div>`;
							  }
						}, //success
						
						error:function(error){
						  console.log('error: product cards cannot be called');
						}// end error message
					}); // end ajax
				}; // end userProducts function 
				userProducts();




    },// end success function
    error:function(){
      console.log('error: cannot call api');
    }//end error message
  });//end ajax
});


//Edit User Information Functionality [Nathan]
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







//Home button [Nathan]
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

//Function to display Modal [Nathan]
function displayModal(data){
  let productID = data.getAttribute('data-ID');
  console.log(productID);

  //Insert Product information into the modal [Nathan]
  $.ajax({
    url : `${url}/displaySingleProduct/${productID}`,
    type : 'GET',
    dataType : 'json',
    success : function(productData){
      console.log(productData);
      $('#productModalProfileImg').attr("src", `${productData[0]['productProfileImg']}`);
      document.getElementById('productModalTitle').innerHTML = `${productData[0]['productName']}</h3>`;
      document.getElementById('productModalUsername').innerHTML = `${productData[0]['productUsername']}</h3>`;
      document.getElementById('productModalImg1').innerHTML = `<img  src="${productData[0]['productImg1']}" class="d-block w-100" alt="Product Image One">`;
      document.getElementById('productModalImg2').innerHTML = `<img  src="${productData[0]['productImg2']}" class="d-block w-100" alt="Product Image One">`;
      document.getElementById('productModalImg3').innerHTML = `<img  src="${productData[0]['productImg3']}" class="d-block w-100" alt="Product Image One">`;
      document.getElementById('productModalDesc').innerHTML = `${productData[0]['productDesc']}</h3>`;
      document.getElementById('productModalPrice').innerHTML = "$" + `${productData[0]['productPrice']}</h3>`;

      //Add a comment [Nathan]
      $('#commentSubmit').click(function(){

        let userID = sessionStorage['user-id'];
        let commentText = $('#commentText').val();
        let commentUsername = sessionStorage['user-userName'];
        let commentProfileImg = sessionStorage['user-profileImg']
        let seller;
        if (sessionStorage['user-id'] == productData[0].user_id) {
          seller = true
        } else {
          seller = false
        };

        //add comment ajax [Nathan]
        $.ajax({
            url : `${url}/addComment`,
            type : 'POST',
            data : {
              commentText : commentText,
              commentUsername : commentUsername,
              seller : seller,
              commentProfileImg : commentProfileImg,
              user_id : userID,
              product_id : productID
            },
            success : function(newComment){
              console.log(newComment);
              displayComments()
            }, // end product data function
            error : function(){
              console.log('Cannot add comment');
            }// end error
           }); // end ajax
        });// end comment submit function


        //View the comments for the specific product [Nathan]
        function displayComments(){
          document.getElementById('commentDiv').innerHTML = "";

          $.ajax({
              url : `${url}/displayProductComments/${productID}`,
              type : 'GET',
              dataType : 'json',
              success : function(commentData){
                console.log(commentData);

                for (var c = 0; c < commentData.length; c++) {
                  // if (seller = true) {
                  //   document.getElementById('commentDiv').innerHTML +=
                  //   `<div class="comment">
  								// 		<div class="commentSellerText">
  								// 			${commentData[c].commentText}
  								// 		</div>
                  //     <img class="commentPic" src="${commentData[c].commentProfileImg}">
                  //     <div id="commentUsername">${commentData[c].commentUsername} [seller]</div>
  								// 	</div>`
                  // }
                  if (sessionStorage['user-id'] === commentData[c].user_id) {
                    document.getElementById('commentDiv').innerHTML +=
                    `<div class="comment">
  										<img class="commentPic" src="${commentData[c].commentProfileImg}">
  										<div class="commentUserText">
  											${commentData[c].commentText}
  										</div>
                      <div id="commentUsername">${commentData[c].commentUsername}</div>
  									</div>`
                  } else {
                    document.getElementById('commentDiv').innerHTML +=
                    `<div class="comment">
  										<img class="commentPic" src="${commentData[c].commentProfileImg}">
  										<div class="commentText">
  											${commentData[c].commentText}
  										</div>
                      <div id="commentUsername">${commentData[c].commentUsername}</div>
  									</div>`
                  } // end else statement

                } // end for loop

              }, // end product data function
              error : function(){
                console.log('Cannot add comment');
              }// end error
             }); // end ajax
        }
        displayComments();

      
      }, // end product data success function
        error : function(){
          console.log('Cannot call API to display the product modal');
        } // end error
        }); // end ajax


};

$('#cardContainer').on('click', '.cardBtn', function(){
  displayModal(this);
});



// ADD PROJECT [Shay]
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

    $.ajax({
    	url : `${url}/addProduct`,
    	type : 'POST',
    	data : {
	    	productName : name,
	        productDesc : desc,
	        productType : type,
	        productImg1 : img1,
	        productImg2 : img2,
	        productImg3 : img3,
	        productPrice : price,
	        user_id : user_id
    	},
    	success : function(){
    		showAllProducts(); // need showALlProducts function to display user product cards
    	}, 
    	error : function(){
    		console.log('error: cannot call api');
    	}
    });
});

 // UPDATE PRODUCT (Shay)

 	$('#editProductForm').submit(function(){
 		event.preventDefault();
 		let productId = $('#productId').val();
 		let productName = $('#addProductFormName').val();
	    let productDesc = $('#addProductFormDescription').val();
		let productType = $('#addProductFormType').val();
		let productImg1 = $('#addProductFormImg1').val();
		let productImg2 = $('#addProductFormImg2').val();
		let productImg3 = $('#addProductFormImg3').val();
		let productPrice = $('#addProductFormPrice').val();
	    let  userId = $('#userId').val();

	    console.log(productName, productDesc, productType, productImg1, productImg2, productImg3, productPrice);
	     $.ajax({
	    			url : `${url}/updateProduct/${productId}`,
	    			type : 'PATCH',
	    			data : {
	    				productName : name,
				        productDesc : desc,
				        productType : type,
				        productImg1 : img1,
				        productImg2 : img2,
				        productImg3 : img3,
				        productPrice : price,
				        user_id : sessionStorage['user-id']
	    			}, 
	    			success : function(data){
	    				console.log(data);
	    				if (data == '401 error; user has no permission to update') {
	    					alert ('401 error; user has no permission to update');
			            } else{
			              alert('modified');
				    	}
				    	$('#productId').val();
				 		$('#addProductFormName').val();
					    $('#addProductFormDescription').val();
						$('#addProductFormType').val();
						$('#addProductFormImg1').val();
						$('#addProductFormImg2').val();
						$('#addProductFormImg3').val();
						$('#addProductFormPrice').val();
					    $('#userId').val();
					    }, // success
					    error:function(){
					    	console.log('error: cannot call api');
					    } // error
					}); // ajax
	    	}
 	});


 // DELETE PRODUCT

// $('#delForm').submit(function(){
//   event.preventDefault();
//   if(!sessionStorage['userID']){
//         alert('401, permission denied');
//         return;
//     };

//   let  productId = $('#delProductId').val();

//   console.log(productId);

//   if (productId == '') {
//     alert('Please enter product id');
//   } else { $.ajax({
//           url :`${url}/deleteProduct/${productId}`,
//           type :'DELETE',
//           data:{
//             userId: sessionStorage['userID']
//           },
//           success : function(data){
//             console.log(data);
//             if (data=='deleted'){
//               alert('deleted');
//               $('#delProductId').val('');
//             } else {
//               alert('Enter a valid id');
//             }

//           },//success
//           error:function(){
//             console.log('error: cannot call api');
//           }//error


//         });//ajax
//   }
// });//submit function for delete product


//Categories Menu Functionality
  $('#categoriesMenuBtn').click(function(){
    $('#categoriesMenu').toggle();
  });


//displays all plants [alexis]
// $.ajax({
// url :`${url}/displayAllProducts`, //from Mongo db
// type :'GET',
// dataType:'json',
//
// success : function(productCard){
//   console.log(productCard);
//
//   document.getElementById('cardContainer').innerHTML = "";
// 	  for(let i=0; i<productCard.length; i++){
// 	    document.getElementById('cardContainer').innerHTML +=
//
// 		`		<div class="card col-4">
// 				  <img src="${productCard[i].productImg1}" class="card-img-top" alt="Card Thumbnail">
// 				  <div class="card-body">
// 				    <h5 class="card-title">${productCard[i].productName}</h5>
// 				    <p class="card-text">${productCard[i].productPrice}</p>
// 				    <button type="button" class="btn cardBtn" data-toggle="modal" data-target=".product-modal">View More</button>
// 				  </div>
// 				</div>
// 	    `;
// 	  }
//   },//success
//
//   error:function(){
//     console.log('error: product cards cannot be called');
//   }//error
// });//ajax


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
