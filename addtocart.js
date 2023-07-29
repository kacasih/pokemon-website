const cartIcon = document.querySelector('#cart-icon');
const cartPanel = document.querySelector('.side-cart');
cartIcon.addEventListener('click', () => {
  cartPanel.classList.toggle('open');
});

function addToCart(id, title, img, price, qty) {
  if (!window.cart) {
    window.cart = [];
  }

  if (qty) {
    if (parseInt(qty) > 0) {
      const index = window.cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        window.cart[index].qty += parseInt(qty);
      } else {
        window.cart.push({
          id: id,
          title: title,
          img: img,
          price: price,
          qty: parseInt(qty)
        });
      }
    }
  } else {
    const qtyInput = document.querySelector(`#qty-${id}`);
    const qty = parseInt(qtyInput.value);
    const index = window.cart.findIndex((item) => item.id === id);

    if (index !== -1) {
      window.cart[index].qty += qty;
    } else {
      window.cart.push({
        id: id,
        title: title,
        img: img,
        price: price,
        qty: qty
      });
    }
  }

  updateCartPanel(window.cart);
}
function updateQty(id, action) {
  const qtyInput = document.querySelector(`#qty-${id}`);
  let quantity = parseInt(qtyInput.value);

  if (action === 'increment') {
    quantity += 1;
  } else if (action === 'decrement') {
    quantity = Math.max(1, quantity - 1);
  }

  // Update the input field with the new quantity
  qtyInput.value = quantity;
}


// Retrieve the cart total and cart items from localStorage and update the cart panel
var storedCartTotal = localStorage.getItem("cartTotal");
if (storedCartTotal) {
  var cartTotal = document.getElementById("cart-total");
  cartTotal.innerText = storedCartTotal;
}
var storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
if (storedCartItems) {
  window.cart = storedCartItems;
  updateCartPanel(window.cart);
}

function createRemoveButton(id) {
  const button = document.createElement('button');
  button.classList.add('remove-button');
  button.setAttribute('data-id', id);

  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-trash-alt'); // Add the appropriate font-awesome classes for a trash bin icon

  button.appendChild(icon);
  return button;
}

function updateCartPanel(cart) {
  const cartItems = document.querySelector('#cart-items');
  let total = 0;
  cartItems.innerHTML = '';

  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    const price = parseFloat(cartItem.price);
    const itemTotal = price * cartItem.qty;
    total += itemTotal;

    const row = document.createElement('tr');
    const removeButtonCell = document.createElement('td'); // Create a new cell for the remove button
    const removeButton = createRemoveButton(cartItem.id); // Create the remove button
    removeButtonCell.appendChild(removeButton); // Add the remove button to the cell

    row.appendChild(removeButtonCell); // Add the remove button cell to the row
    row.innerHTML += `
      <td class="item-name">${cartItem.title}</td>
      <td>${cartItem.qty}</td>
      <td>$${itemTotal.toFixed(2)}</td>
    `;

    cartItems.appendChild(row);
  }

  const cartTotal = document.querySelector('#cart-total');
  cartTotal.innerText = total.toFixed(2);

  addRemoveButtonListeners(); // Attach event listeners to the remove buttons
}

function addRemoveButtonListeners() {
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      window.cart = window.cart.filter(item => item.id !== id);
      updateCartPanel(window.cart);
    });
  });
}
