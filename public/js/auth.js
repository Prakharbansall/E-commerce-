// Authentication Utility Functions

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Get current user data
function getCurrentUser() {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'index.html';
}

// Create sample users for testing (remove in production)
function createSampleUsers() {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  
  if (existingUsers.length === 0) {
    const sampleUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        profileImage: 'https://ui-avatars.com/api/?name=John+Doe&background=3ce79a&color=fff&size=128',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        profileImage: 'https://ui-avatars.com/api/?name=Jane+Smith&background=3ce79a&color=fff&size=128',
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }
}

// Update header based on authentication status
function updateHeader() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const currentUser = getCurrentUser();
  
  if (isLoggedIn() && currentUser) {
    // User is logged in - show profile and logout
    const existingLoginLink = nav.querySelector('a[href="login.html"]');
    if (existingLoginLink) {
      existingLoginLink.remove();
    }

    // Create profile dropdown
    const profileContainer = document.createElement('div');
    profileContainer.className = 'profile-container';
    profileContainer.innerHTML = `
      <div class="profile-trigger">
        <img src="${currentUser.profileImage}" alt="${currentUser.name}" class="profile-image">
        <span class="profile-name">${currentUser.name}</span>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="profile-dropdown">
        <div class="profile-header">
          <img src="${currentUser.profileImage}" alt="${currentUser.name}" class="profile-image-large">
          <div class="profile-info">
            <h4>${currentUser.name}</h4>
            <p>${currentUser.email}</p>
          </div>
        </div>
        <div class="profile-menu">
          <a href="#" class="profile-menu-item" onclick="showProfileModal()">
            <i class="fas fa-user"></i>
            My Profile
          </a>
          <div class="profile-divider"></div>
          <a href="#" class="profile-menu-item logout-btn" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i>
            Logout
          </a>
        </div>
      </div>
    `;

    // Add click event to toggle dropdown
    const profileTrigger = profileContainer.querySelector('.profile-trigger');
    const profileDropdown = profileContainer.querySelector('.profile-dropdown');
    
    profileTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!profileContainer.contains(e.target)) {
        profileDropdown.classList.remove('active');
      }
    });

    nav.appendChild(profileContainer);
  } else {
    // User is not logged in - remove profile container if exists
    const existingProfile = nav.querySelector('.profile-container');
    if (existingProfile) {
      existingProfile.remove();
    }
    
    // Don't add login link if it already exists in HTML
    const existingLoginLink = nav.querySelector('a[href="login.html"]');
    if (!existingLoginLink) {
      const loginLink = document.createElement('a');
      loginLink.href = 'login.html';
      loginLink.textContent = 'Login';
      nav.appendChild(loginLink);
    }
  }
}

// Profile modal functions
function showProfileModal() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content profile-modal">
      <div class="modal-header">
        <h3>My Profile</h3>
        <button class="modal-close" onclick="closeModal(this)">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="profile-edit">
          <div class="profile-image-section">
            <img src="${currentUser.profileImage}" alt="${currentUser.name}" class="profile-image-edit">
            <button class="change-photo-btn">
              <i class="fas fa-camera"></i>
              Change Photo
            </button>
          </div>
          <form class="profile-form">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" value="${currentUser.name}" id="profile-name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" value="${currentUser.email}" id="profile-email" readonly>
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" id="profile-phone">
            </div>
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" id="profile-dob">
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea placeholder="Enter your address" id="profile-address" rows="3"></textarea>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" onclick="closeModal(this)">Cancel</button>
              <button type="submit" class="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Handle form submission
  const form = modal.querySelector('.profile-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically save the profile changes
    alert('Profile updated successfully!');
    closeModal(modal.querySelector('.modal-close'));
  });
}



function closeModal(closeBtn) {
  const modal = closeBtn.closest('.modal-overlay');
  if (modal) {
    modal.remove();
  }
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  createSampleUsers(); // Create sample users for testing
  updateHeader();
});
