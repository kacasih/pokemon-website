document.addEventListener('DOMContentLoaded', function() {
var stripe = Stripe('pk_test_51MmkISFmCOUy2rVk6fnEkxjlRaZXMqxoJI6P7Dh9cMTiIy3AlTBqBdwibQ8aMSisiBr9E7f3GghXzVSBcmWWOIfb00en1zzEkH');

function redirectToCheckout() {
  console.log('Redirecting to checkout...');
  const cartItems = window.cart; // Retrieve cart items from the global cart array
  const cartTotal = parseFloat(document.querySelector('#cart-total').innerText);
  if (cartTotal < 4) {
    // Display a warning message on the website
    const warningMessage = document.querySelector('#warning-message');
    warningMessage.style.display = 'block';
    return; // Stop further execution of the function
  }
  
  fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cartItems, cartTotal})
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(session) {
    return stripe.redirectToCheckout({ sessionId: session.id });
  })
  .then(function(result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, you should display the localized error message to your
    // customer using `error.message`.
    if (result.error) {
      alert(result.error.message);
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
}

document.querySelector("#checkout-button").addEventListener("click", function() {
  if (window.cart.length > 0) {
    redirectToCheckout();
  }
});
}
);
