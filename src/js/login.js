// Secure Login System for AutoServiceHoute Dashboard
// Uses SHA-256 hashing for password security

class LoginManager {
  constructor() {
    // Hashed credentials (SHA-256)
    // Username: Muslum, Password: Muss
    this.validCredentials = {
      username: 'Muslum',
      // SHA-256 hash of "Muss"
      passwordHash: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5'
    };
    
    this.init();
  }

  init() {
    // Check if already logged in
    if (this.isLoggedIn()) {
      window.location.href = './dashboard.html';
      return;
    }

    this.setupForm();
    this.setupPasswordToggle();
  }

  setupForm() {
    const form = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      // Clear previous errors
      errorMsg.classList.remove('show');
      errorMsg.textContent = '';

      // Disable button during processing
      loginBtn.disabled = true;
      const btnText = loginBtn.querySelector('span');
      const originalText = btnText.textContent;
      btnText.textContent = 'Bezig met inloggen...';

      try {
        // Hash the password
        const hashedPassword = await this.hashPassword(password);

        // Verify credentials
        if (this.verifyCredentials(username, hashedPassword)) {
          // Set session
          this.setSession();
          
          // Show success and redirect
          btnText.textContent = 'Succesvol!';
          setTimeout(() => {
            window.location.href = './dashboard.html';
          }, 500);
        } else {
          // Show error
          errorMsg.textContent = 'Ongeldige gebruikersnaam of wachtwoord.';
          errorMsg.classList.add('show');
          
          // Reset button
          loginBtn.disabled = false;
          btnText.textContent = originalText;
          
          // Clear password field
          document.getElementById('password').value = '';
        }
      } catch (error) {
        console.error('Login error:', error);
        errorMsg.textContent = 'Er is een fout opgetreden. Probeer het opnieuw.';
        errorMsg.classList.add('show');
        
        loginBtn.disabled = false;
        btnText.textContent = originalText;
      }
    });
  }

  setupPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    toggleBtn.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      
      // Toggle icon
      const icon = toggleBtn.querySelector('.eye-icon');
      if (type === 'text') {
        icon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        `;
      } else {
        icon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        `;
      }
    });
  }

  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  verifyCredentials(username, hashedPassword) {
    return username === this.validCredentials.username && 
           hashedPassword === this.validCredentials.passwordHash;
  }

  setSession() {
    const sessionData = {
      username: this.validCredentials.username,
      loginTime: new Date().toISOString(),
      sessionToken: this.generateSessionToken()
    };
    
    sessionStorage.setItem('ash_session', JSON.stringify(sessionData));
    
    // Also set a timestamp in localStorage for session validation
    localStorage.setItem('ash_session_check', Date.now().toString());
  }

  generateSessionToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  isLoggedIn() {
    const session = sessionStorage.getItem('ash_session');
    if (!session) return false;

    try {
      const sessionData = JSON.parse(session);
      // Verify session has required fields
      return sessionData.username && sessionData.sessionToken;
    } catch {
      return false;
    }
  }
}

// Initialize login manager
const loginManager = new LoginManager();
