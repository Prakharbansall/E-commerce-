// Login and Registration System
document.addEventListener('DOMContentLoaded', function() {
    // Toggle between sign in and sign up views
    const toggleSignup = document.getElementById('toggle-signup');
    const toggleLogin = document.getElementById('toggle-login');
    const signinCard = document.getElementById('signin-card');
    const signupCard = document.getElementById('signup-card');

    toggleSignup.addEventListener('click', (e) => {
      e.preventDefault();
      signinCard.style.display = 'none';
      signupCard.style.display = 'block';
    });

    toggleLogin.addEventListener('click', (e) => {
      e.preventDefault();
      signupCard.style.display = 'none';
      signinCard.style.display = 'block';
    });

    // Handle signup form
    document.getElementById('signup-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;

      if (password !== confirm) {
        alert("Passwords do not match!");
        return;
      }

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = existingUsers.find(user => user.email === email);
      
      if (userExists) {
        alert("User with this email already exists!");
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password, // In a real app, this should be hashed
        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3ce79a&color=fff&size=128`,
        createdAt: new Date().toISOString()
      };

      // Save user to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      alert("Registration successful! You can now log in.");
      toggleLogin.click(); // Show login form
      
      // Clear form
      document.getElementById('signup-form').reset();
    });

    // Handle login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Store logged in user data (without password)
        const loggedInUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage
        };
        
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password!");
      }
    });
});