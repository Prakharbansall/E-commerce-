// Enhanced Cart Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let savedAddress = JSON.parse(localStorage.getItem("savedAddress")) || null;

// DOM Elements
const cartContainer = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");
const checkoutBtn = document.getElementById("checkout-btn");
const addressForm = document.getElementById("address-form");

// Render Cart with Animations
function renderCart() {
  if (!cartContainer) return;
  
  cartContainer.innerHTML = "";
  cartSummary.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart fa-3x"></i>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything to your cart yet</p>
        <a href="index.html" class="btn">Continue Shopping</a>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.style.display = 'none';
    return;
  }

  let subtotal = 0;
  let shipping = 0;

  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>

      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">₹${item.price.toLocaleString()}</p>
        
        <div class="quantity-control">
          <button class="qty-btn minus" onclick="updateQuantity(${index}, ${item.quantity - 1})">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity">${item.quantity}</span>
          <button class="qty-btn plus" onclick="updateQuantity(${index}, ${item.quantity + 1})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        
        <p class="cart-item-subtotal">Subtotal: ₹<span>${itemSubtotal.toLocaleString()}</span></p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    
    cartContainer.appendChild(cartItem);
  });

  // Calculate shipping (free over 2000)
  shipping = subtotal >= 2000 ? 0 : 99;
  const total = subtotal + shipping;

  if (cartSummary) {
    cartSummary.innerHTML = `
      <div class="summary-card">
        <h3>Order Summary</h3>
        
        <div class="summary-row">
          <span>Subtotal</span>
          <span>₹${subtotal.toLocaleString()}</span>
        </div>
        
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'FREE' : '₹99'}</span>
        </div>
        
        <div class="summary-total">
          <span>Total</span>
          <span>₹${total.toLocaleString()}</span>
        </div>
        
        ${shipping > 0 ? `
          <p class="free-shipping">
            <i class="fas fa-truck"></i> Add ₹${(2000 - subtotal).toLocaleString()} more for free shipping!
          </p>
        ` : `
          <p class="free-shipping">
            <i class="fas fa-check-circle"></i> You've got free shipping!
          </p>
        `}
      </div>
    `;
  }
  
  if (checkoutBtn) {
    checkoutBtn.style.display = 'block';
    checkoutBtn.addEventListener('click', proceedToCheckout);
  }
}

// Update Quantity with Animation
function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) {
    removeItem(index);
    return;
  }
  
  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Add animation class
  const quantityElement = document.querySelectorAll('.quantity')[index];
  if (quantityElement) {
    quantityElement.classList.add('pulse');
    setTimeout(() => quantityElement.classList.remove('pulse'), 300);
  }
  
  renderCart();
  updateCartCount();
}

// Remove Item with Animation
function removeItem(index) {
  const cartItem = document.querySelectorAll('.cart-item')[index];
  if (cartItem) {
    cartItem.classList.add('removing');
    setTimeout(() => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    }, 300);
  }
}

// Proceed to Checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    return;
  }
  
  // Check if address is saved
  if (!savedAddress) {
    alert("Please save your delivery address first!");
    return;
  }
  
  // In a real app, you would process payment here
  // For demo, we'll just redirect to checkout page
  window.location.href = "checkout.html";
}

// Handle Address Form Submission
function handleAddressForm(e) {
  e.preventDefault();
  
  const name = document.getElementById('address-name').value.trim();
  const phone = document.getElementById('address-phone').value.trim();
  const email = document.getElementById('address-email').value.trim();
  const address = document.getElementById('address-details').value.trim();
  const landmark = document.getElementById('address-landmark').value.trim();
  
  // Basic validation
  if (!name || !phone || !email || !address) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Phone validation
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }
  
  // Save address
  savedAddress = {
    name,
    phone,
    email,
    address,
    landmark
  };
  
  localStorage.setItem("savedAddress", JSON.stringify(savedAddress));
  
  // Update form to show saved state
  updateAddressFormDisplay();
  
  alert('Address saved successfully!');
}

// Update Address Form Display
function updateAddressFormDisplay() {
  if (!savedAddress || !addressForm) return;
  
  // Fill form with saved data
  document.getElementById('address-name').value = savedAddress.name;
  document.getElementById('address-phone').value = savedAddress.phone;
  document.getElementById('address-email').value = savedAddress.email;
  document.getElementById('address-details').value = savedAddress.address;
  document.getElementById('address-landmark').value = savedAddress.landmark || '';
  
  // Change button text
  const submitBtn = addressForm.querySelector('.address-btn');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fas fa-edit"></i> Update Address';
  }
  
  // Add saved indicator
  const savedIndicator = document.createElement('div');
  savedIndicator.className = 'saved-indicator';
  savedIndicator.innerHTML = '<i class="fas fa-check-circle"></i> Address saved';
  savedIndicator.style.cssText = `
    color: #27ae60;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;
  
  // Remove existing indicator if any
  const existingIndicator = addressForm.querySelector('.saved-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }
  
  addressForm.appendChild(savedIndicator);
}

// Update Cart Count in Navbar
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.setAttribute('data-count', count);
    badge.style.display = count > 0 ? 'inline-block' : 'none';
    
    // Add bounce animation when count changes
    if (count > 0 && !badge.classList.contains('bounce')) {
      badge.classList.add('bounce');
      setTimeout(() => badge.classList.remove('bounce'), 1000);
    }
  });
}

// Initialize Cart
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCount();

  // Address form handling
  if (addressForm) {
    addressForm.addEventListener('submit', handleAddressForm);
    
    // Load saved address if exists
    if (savedAddress) {
      updateAddressFormDisplay();
    }
  }

  // Add confetti to checkout page
  if (window.location.pathname.includes('checkout.html') && cart.length > 0) {
    createConfetti();
    // Clear cart after checkout (for demo purposes)
    localStorage.removeItem("cart");
  }
});

// Confetti Effect for Checkout
function createConfetti() {
  const colors = ['#8e44ad', '#3498db', '#e74c3c', '#f1c40f', '#2ecc71'];
  const container = document.getElementById('confetti-container');
  
  if (!container) return;
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    confetti.style.animationDuration = `${3 + Math.random() * 3}s`;
    container.appendChild(confetti);
  }
}