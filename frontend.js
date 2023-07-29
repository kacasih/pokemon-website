// Retrieve the cart total from localStorage and update the cart panel
var storedCartTotal = localStorage.getItem("cartTotal");
if (storedCartTotal) {
  var cartTotal = document.getElementById("cart-total");
  cartTotal.innerText = storedCartTotal;
}

const codePackContainer = document.getElementById("code-pack-container");
fetch("/codePacks")
  .then(response => response.json())
  .then(codePacks => {
    codePacks.forEach(codePack => {
      const codePackElement = document.createElement("div");
      codePackElement.classList.add("code-pack");

      const imgElement = document.createElement("img");
      imgElement.src = `./${codePack.imgSrc}`;
      codePackElement.appendChild(imgElement);

      const titleElement = document.createElement("h3");
      titleElement.innerText = codePack.title;
      codePackElement.appendChild(titleElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = codePack.description;
      codePackElement.appendChild(descriptionElement);

      const priceElement = document.createElement("p");
      priceElement.innerText = `Price: ${codePack.price}`;
      codePackElement.appendChild(priceElement);

      const quantityElement = document.createElement("p");
      quantityElement.innerText = `Quantity: ${codePack.quantity}`;
      codePackElement.appendChild(quantityElement);

      const addToCartButton = document.createElement("button");
      addToCartButton.innerText = "Add to cart";
      addToCartButton.dataset.productId = codePack.id;
      addToCartButton.dataset.productTitle = codePack.title;
      addToCartButton.dataset.productImg = codePack.imgSrc;
      addToCartButton.dataset.productPrice = codePack.price;
      addToCartButton.dataset.productQuantity = codePack.quantity;
      codePackElement.appendChild(addToCartButton);

      codePackContainer.appendChild(codePackElement);
    });
  })
  .catch(error => {
    console.error("Error fetching codepacks:", error);
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Show/hide the additional fields for email verification
    const forgotPassword = document.getElementById("forgotPassword");
    const forgotPasswordFields = document.getElementById("forgotPasswordFields");
    forgotPassword.addEventListener("change", function () {
      if (forgotPassword.checked) {
        forgotPasswordFields.style.display = "block";
      } else {
        forgotPasswordFields.style.display = "none";
      }
    });

    function changePassword(event) {
      event.preventDefault();
    
      const form = document.querySelector('.change-password-form');
      const formData = new FormData(form);
    
      // Check if the user forgot their old password and wants to reset it through email verification
      const forgotPassword = document.getElementById('forgotPassword').checked;
    
      // Get the oldPassword, newPassword, and confirmPassword values from the form fields
      const oldPassword = document.getElementById('oldPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
    
      // Check if the passwords match
      if (newPassword !== confirmPassword) {
        alert('New Password and Confirm Password do not match.');
        return;
      }
    
      // Append the newPassword and forgotPassword to the formData
      //formData.append('newPassword', newPassword);
      //formData.append('forgotPassword', forgotPassword);
      

      // If the user forgot their old password, also append the email to formData
      if (forgotPassword) {
        const email = document.getElementById('email').value;
        if (email) {
          //formData.append('email', email);
        }
    
        // You can also add the token here if needed and append it to the formData
        // const token = ... // Fetch the token from somewhere if needed
        // formData.append('token', token);
      } else {
          // If the user knows their old password, append it to formData
          //formData.append('oldPassword', oldPassword);
          // If the user knows their old password, append a dummy value for the token
          //formData.append('token', 'NO_TOKEN_NEEDED');
      }

      console.log("FormDataXX:");
        formData.forEach((value, key) => {
        console.log(key, value);
        }); 
      // Send a request to the server to handle password change or reset
      console.log(JSON.stringify(Object.fromEntries(formData)));
      fetch('/changepassword', {
        method: 'POST',
        /*headers: {
          // "Content-Type": "application/json"  
           "Content-Type": "application/x-www-form-urlencoded"
          // "Content-Type": "multipart/form-data"  
          // "Content-Type": "text/plain"    
         },*/
         body: formData,
        //body: JSON.stringify(Object.fromEntries(formData))
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Handle success, display a success message or take appropriate action
          alert(data.message);
          if (forgotPassword) {
            // Redirect to a different page or display a success message for password reset
            // For example: alert('Password reset successful. You can now log in with your new password.');
          } else {
            // Clear the form after successful password change
            form.reset();
          }
        } else {
          // Handle error, display an error message or take appropriate action
          alert(data.error);
        }
        })
      .catch((error) => {
        console.error('Error changing password:', error);
        alert('An error occurred. Please try again later.');
      });
    }
  
    // Add event listener to the "Change Password" form submit button
    const submitPasswordChange = document.getElementById("submit-password-change");
    submitPasswordChange.addEventListener("click", changePassword);
  }); 
  
  
  
