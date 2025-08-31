// Checkout Page Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let savedAddress = JSON.parse(localStorage.getItem("savedAddress")) || null;

// DOM Elements
const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const addressForm = document.getElementById("address-form");

// Render Order Summary
function renderOrderSummary() {
  if (!checkoutItems || !checkoutTotal) return;

  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <div class="empty-order">
        <i class="fas fa-shopping-cart fa-3x"></i>
        <h3>No items in your order</h3>
        <a href="index.html" class="btn">Continue Shopping</a>
      </div>
    `;
    return;
  }

  let subtotal = 0;
  let shipping = 99;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const orderItem = document.createElement("div");
    orderItem.className = "order-item";
    orderItem.innerHTML = `
      <div class="order-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="order-item-details">
        <h4 class="order-item-name">${item.name}</h4>
        <p class="order-item-price">₹${item.price.toLocaleString()}</p>
        <p class="order-item-quantity">Quantity: ${item.quantity}</p>
      </div>
      <p class="order-item-total">₹${itemTotal.toLocaleString()}</p>
    `;

    checkoutItems.appendChild(orderItem);
  });

  if (subtotal >= 2000) {
    shipping = 0;
  }

  const total = subtotal + shipping;

  checkoutTotal.innerHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>₹${subtotal.toLocaleString()}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? "FREE" : "₹99"}</span>
    </div>
    <div class="summary-total">
      <span>Total</span>
      <span>₹${total.toLocaleString()}</span>
    </div>
  `;

  // Show success message
  const successMessage = document.createElement("div");
  successMessage.className = "order-success";
  successMessage.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <h3>Order Successful!</h3>
    <p>Thank you for your purchase. Your order has been placed successfully.</p>
    <p>A confirmation email has been sent to your registered email address.</p>
  `;

  checkoutItems.insertBefore(successMessage, checkoutItems.firstChild);
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

// Print Receipt Function
function printReceipt() {
  if (!savedAddress) {
    alert('Please save your delivery address first!');
    return;
  }

  // Create receipt content
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  
  let subtotal = 0;
  let shipping = 99;
  
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  if (subtotal >= 2000) {
    shipping = 0;
  }
  
  const total = subtotal + shipping;
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Create receipt HTML content
  const receiptContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>GAURI - Order Receipt</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 20px;
          background: white;
          color: #333;
          font-size: 12px;
        }
        .receipt {
          max-width: 600px;
          margin: 0 auto;
          border: 2px solid #3ce79a;
          border-radius: 10px;
          padding: 30px;
          background: white;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #3ce79a;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 2.5rem;
          font-weight: bold;
          color: #3ce79a;
          margin-bottom: 10px;
        }
        .receipt-title {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 5px;
        }
        .receipt-info {
          font-size: 0.9rem;
          color: #666;
        }
        .customer-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .customer-info h3 {
          color: #3ce79a;
          margin-bottom: 15px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        .customer-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          font-size: 0.9rem;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .items-table th {
          background: #3ce79a;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: bold;
        }
        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }
        .items-table tr:nth-child(even) {
          background: #f8f9fa;
        }
        .summary {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 1rem;
        }
        .total-row {
          font-size: 1.2rem;
          font-weight: bold;
          border-top: 2px solid #3ce79a;
          padding-top: 10px;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 0.9rem;
        }
        @media print {
          body { margin: 0; }
          .receipt { border: none; }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <div class="logo">GAURI</div>
          <div class="receipt-title">Order Receipt</div>
          <div class="receipt-info">
            Date: ${currentDate} | Time: ${currentTime}<br>
            Order ID: #${orderId}
          </div>
        </div>
        
        <div class="customer-info">
          <h3>Delivery Information</h3>
          <div class="customer-details">
            <div><strong>Name:</strong> ${savedAddress.name}</div>
            <div><strong>Phone:</strong> ${savedAddress.phone}</div>
            <div><strong>Email:</strong> ${savedAddress.email}</div>
            <div><strong>Landmark:</strong> ${savedAddress.landmark || 'N/A'}</div>
          </div>
          <div style="margin-top: 15px;">
            <strong>Address:</strong><br>
            ${savedAddress.address}
          </div>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toLocaleString()}</td>
                <td>${item.quantity}</td>
                <td>₹${(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹${subtotal.toLocaleString()}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>${shipping === 0 ? 'FREE' : '₹99'}</span>
          </div>
          <div class="summary-row total-row">
            <span>Total:</span>
            <span>₹${total.toLocaleString()}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Thank you for your purchase!</p>
          <p>Your order will be delivered within 3-5 business days.</p>
          <p>For any queries, contact us at support@gouri.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Create a blob from the HTML content
  const blob = new Blob([receiptContent], { type: 'text/html' });
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `GAURI_Receipt_${orderId}_${currentDate.replace(/\//g, '-')}.html`;
  
  // Append link to body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(link.href);
  
  // Show success message
  alert(`Receipt saved as: GAURI_Receipt_${orderId}_${currentDate.replace(/\//g, '-')}.html\n\nYou can open this file in your browser and use the browser's print function to save as PDF.`);
}

// Initialize Checkout Page
document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();

  // Address form handling
  if (addressForm) {
    addressForm.addEventListener('submit', handleAddressForm);
    
    // Load saved address if exists
    if (savedAddress) {
      updateAddressFormDisplay();
    }
  }

  // Print receipt functionality
  const printBtn = document.querySelector('.print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', printReceipt);
  }

  // Clear cart after rendering
  localStorage.removeItem("cart");
});
