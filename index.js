let totalCartPrice = 0;

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const productCard = this.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.querySelector('h2').innerText;
    const productImage = productCard.querySelector('img').src;
    const price = parseFloat(productCard.querySelector('.price').innerText);
    const quantity = parseInt(productCard.querySelector('.quantity').value);

    if (quantity > 0) {
      const total = price * quantity;

      // Check if product already exists in cart
      const existingItem = document.querySelector(`#cart-items li[data-id="${productId}"]`);
      if (existingItem) {
        alert('Product is already in the cart.');
        return;
      }

      // Create cart item
      const cartItem = document.createElement('li');
      cartItem.dataset.id = productId;
      cartItem.innerHTML = `
        <img src="${productImage}" alt="${productName}">
        <span>${productName}</span>
        <span>Quantity: ${quantity}</span>
        <span>Total: $${total.toFixed(2)}</span>
        <span class="remove-btn">Remove</span>
      `;

      // Append to cart
      document.getElementById('cart-items').appendChild(cartItem);

      // Update total price
      totalCartPrice += total;
      document.getElementById('total-price').innerHTML = `<strong>Total Price: $${totalCartPrice.toFixed(2)}</strong>`;

      // Remove button functionality
      cartItem.querySelector('.remove-btn').addEventListener('click', function () {
        totalCartPrice -= total;
        document.getElementById('total-price').innerHTML = `<strong>Total Price: $${totalCartPrice.toFixed(2)}</strong>`;
        cartItem.remove();
      });

      alert('Item added to cart!');
    } else {
      alert('Please enter a valid quantity.');
    }
  });
});
