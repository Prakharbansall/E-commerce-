// Fetch product data from static JSON file
async function fetchProducts() {
  const res = await fetch('/data/products.json');
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}
function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Dynamically calculate discount percentage
    const discountPercent = (product.original && product.price)
      ? `${Math.round(((product.original - product.price) / product.price) * 100)}% OFF`
      : '';

    card.innerHTML = `
      <div class="product-image-container">
        ${discountPercent ? `<div class="discount-tag">${discountPercent}</div>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="price-container">
          <span class="price">₹${product.price.toLocaleString()}</span>
          ${product.original ? `<span class="original-price">₹${product.original.toLocaleString()}</span>` : ''}
        </div>
        <button class="add-to-cart-btn"
                data-name="${product.name}"
                data-price="${product.price}"
                data-image="${product.image}">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  setupAddToCartButtons(); // Re-setup buttons
}


// Filter by category
async function filterCategory(category) {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  const container = document.getElementById("category-products");
  container.innerHTML = "<div class='loading'>Loading...</div>";

  try {
    const data = await fetch('/data/products.json').then(r => r.json());
    const filtered = category === "all"
      ? data.allProducts
      : data.allProducts.filter(p => p.category === category);
    renderProducts(filtered, "category-products");
  } catch (e) {
    container.innerHTML = "<div class='loading'>Failed to load products</div>";
  }
}

// Add to cart button setup — protected from duplicate bindings
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach(button => {
    if (!button.dataset.bound) {
      button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const image = button.getAttribute("data-image");
        addToCart(name, price, image);
      });
      button.dataset.bound = "true"; // Mark as bound
    }
  });
}

// Add item to cart in localStorage
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart!`);
}

// Update cart item count on navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-badge").forEach(badge => {
    badge.setAttribute("data-count", count);
    badge.style.display = count > 0 ? "inline-block" : "none";

    // Bounce effect on update
    badge.classList.add("bounce");
    setTimeout(() => badge.classList.remove("bounce"), 600);
  });
}

// Show floating toast notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize everything on DOM ready
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchProducts();
    renderProducts(data.newArrivals || [], "new-arrivals");
    renderProducts(data.summerCollection || [], "summer-collection");
    filterCategory("all");
  } catch (e) {
    console.error("Failed to load products:", e);
    // Show error message to user
    document.querySelectorAll('.products-container').forEach(container => {
      container.innerHTML = '<div class="error">Failed to load products. Please refresh the page.</div>';
    });
  }
  updateCartCount();
});
