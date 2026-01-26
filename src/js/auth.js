// Authentication System with SHA-256 Encryption
// Credentials are hashed and stored securely

// SHA-256 Hash function
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Stored hashed credentials (SHA-256)
// Username: muslum -> Hash
// Password: Muss -> Hash
const CREDENTIALS = {
  usernameHash: 'a9156affe895aeb451b9d5494c6041d6fa0d6967d4773d3b3445cdfa7e96f833', // SHA-256 of 'muslum'
  passwordHash: 'ca0a6f784cf5dc4c0921da125237eac74ae286a40a83cdc732b799855f63e336' // SHA-256 of 'Muss'
};

// Session management
const SESSION_KEY = 'ash_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Check if user is authenticated
export function isAuthenticated() {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;
  
  try {
    const sessionData = JSON.parse(session);
    const now = Date.now();
    
    // Check if session is expired
    if (now > sessionData.expiry) {
      logout();
      return false;
    }
    
    return sessionData.authenticated === true;
  } catch (error) {
    logout();
    return false;
  }
}

// Create session
function createSession() {
  const sessionData = {
    authenticated: true,
    expiry: Date.now() + SESSION_DURATION,
    timestamp: Date.now()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

// Logout
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = '/login.html';
}

// Verify credentials
async function verifyCredentials(username, password) {
  try {
    // Hash the input credentials
    const inputUsernameHash = await sha256(username.toLowerCase().trim());
    const inputPasswordHash = await sha256(password);
    
    // Compare with stored hashes
    return inputUsernameHash === CREDENTIALS.usernameHash && 
           inputPasswordHash === CREDENTIALS.passwordHash;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
}

// Show error message
function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    setTimeout(() => {
      errorElement.classList.remove('show');
    }, 5000);
  }
}

// Initialize login page
if (window.location.pathname.includes('login.html')) {
  // Redirect if already authenticated
  if (isAuthenticated()) {
    window.location.href = '/dashboard.html';
  }
  
  // Handle form submission
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        const eyeIcon = togglePassword.querySelector('.eye-icon');
        const eyeOffIcon = togglePassword.querySelector('.eye-off-icon');
        
        if (type === 'text') {
          eyeIcon.style.display = 'none';
          eyeOffIcon.style.display = 'block';
        } else {
          eyeIcon.style.display = 'block';
          eyeOffIcon.style.display = 'none';
        }
      });
    }
    
    // Handle login
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginBtn = form.querySelector('.login-btn');
        
        // Validate inputs
        if (!username || !password) {
          showError('Please enter both username and password');
          return;
        }
        
        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // Verify credentials with small delay for better UX
        setTimeout(async () => {
          const isValid = await verifyCredentials(username, password);
          
          if (isValid) {
            // Create session and redirect
            createSession();
            window.location.href = '/dashboard.html';
          } else {
            // Show error
            showError('Invalid username or password');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
            
            // Clear password field
            document.getElementById('password').value = '';
          }
        }, 800);
      });
    }
  });
}

// Protect dashboard page
if (window.location.pathname.includes('dashboard.html')) {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
  }
}
