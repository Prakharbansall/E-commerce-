// Main JavaScript for common functionality across pages

// Initialize tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(el => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = el.dataset.tooltip;
    document.body.appendChild(tooltip);
    
    el.addEventListener('mouseenter', (e) => {
      const rect = el.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
      tooltip.classList.add('visible');
    });
    
    el.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Show Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initTooltips();
  initMobileMenu();
  initBackToTop();
  updateCartCount(); // Update cart count on page load
  
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const name = productCard.querySelector('.product-name').textContent;
      const price = parseFloat(productCard.querySelector('.price').textContent.replace('₹', ''));
      const image = productCard.querySelector('img').src;
      
      addToCart(name, price, image);
    });
  });

  // Shop Now button functionality
  const shopNowBtn = document.querySelector('.hero-btn');
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', function() {
      const newArrivalsSection = document.getElementById('new-arrivals');
      if (newArrivalsSection) {
        newArrivalsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
});

// Add to Cart Function
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  // Removed toast notification - showToast(`${name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
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