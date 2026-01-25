// RDW API Integration and Contact Form Handler
// Using EmailJS for email sending

let vehicleData = null;

// Toast Notification System
function showToast(message, type = 'success') {
  // Remove any existing toasts
  const existingToast = document.querySelector('.custom-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `custom-toast toast-${type}`;
  
  // Icon based on type
  const icons = {
    success: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>`,
    error: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>`,
    warning: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
    </svg>`
  };
  
  const titles = {
    success: 'Saved Successfully',
    error: 'Error Occurred',
    warning: 'Action Required'
  };
  
  toast.innerHTML = `
    ${icons[type]}
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Close">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Close button handler
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'xKnL-OvHIJbJ6pn8s'; // Get from https://dashboard.emailjs.com/admin/account
const EMAILJS_SERVICE_ID = 'service_38razxb';  // Get from https://dashboard.emailjs.com/admin
const EMAILJS_TEMPLATE_ID = 'template_aplhulr'; // Get from https://dashboard.emailjs.com/admin

// Format kenteken to match RDW format (remove dashes and convert to uppercase)
function formatKenteken(kenteken) {
  return kenteken.replace(/[-\s]/g, '').toUpperCase();
}

// Validate kenteken with RDW API
async function validateKenteken(kenteken) {
  const formatted = formatKenteken(kenteken);
  const statusEl = document.getElementById('kenteken-status');
  const vehicleInfo = document.getElementById('vehicle-info');
  
  if (formatted.length < 4) {
    statusEl.textContent = '';
    statusEl.className = 'kenteken-status';
    vehicleInfo.style.display = 'none';
    return false;
  }
  
  try {
    statusEl.textContent = '⏳ Kenteken controleren...';
    statusEl.className = 'kenteken-status checking';
    
    // RDW Open Data API
    const response = await fetch(
      `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${formatted}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      vehicleData = data[0];
      statusEl.textContent = '✓ Kenteken gevonden in RDW';
      statusEl.className = 'kenteken-status valid';
      
      // Display vehicle information
      document.getElementById('merk').textContent = vehicleData.merk || 'Onbekend';
      document.getElementById('handelsbenaming').textContent = vehicleData.handelsbenaming || 'Onbekend';
      
      // Format date if available
      if (vehicleData.datum_eerste_toelating) {
        const date = vehicleData.datum_eerste_toelating;
        const formatted_date = `${date.substring(6, 8)}-${date.substring(4, 6)}-${date.substring(0, 4)}`;
        document.getElementById('datum_eerste_toelating').textContent = formatted_date;
      } else {
        document.getElementById('datum_eerste_toelating').textContent = 'Onbekend';
      }
      
      vehicleInfo.style.display = 'block';
      return true;
    } else {
      statusEl.textContent = '✗ Kenteken niet gevonden in RDW database';
      statusEl.className = 'kenteken-status invalid';
      vehicleInfo.style.display = 'none';
      vehicleData = null;
      return false;
    }
  } catch (error) {
    console.error('Error validating kenteken:', error);
    statusEl.textContent = '⚠ Fout bij het controleren van kenteken';
    statusEl.className = 'kenteken-status error';
    vehicleInfo.style.display = 'none';
    return false;
  }
}

// Debounce function to avoid too many API calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Send email via EmailJS
async function sendEmail(formData) {
  // Initialize EmailJS if not already done
  if (typeof emailjs === 'undefined') {
    throw new Error('EmailJS library not loaded');
  }
  
  // Prepare email template parameters matching the EmailJS template variables
  const templateParams = {
    name: formData.naam,
    subject: formData.onderwerp,
    email: formData.email,
    phone: formData.telefoon,
    license: formData.kenteken,
    message: formData.bericht
  };
  
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
}

// Save form data to admin dashboard via API
async function saveToAdminDashboard(formData) {
  try {
    // Create new email object matching database format
    const newEmail = {
      id: Date.now().toString(),
      name: formData.naam,
      email: formData.email,
      phone: formData.telefoon,
      kenteken: formData.kenteken,
      subject: formData.onderwerp,
      message: formData.bericht,
      vehicleInfo: vehicleData ? JSON.stringify(vehicleData) : null,
      read: false
    };
    
    // Try to save to database via API
    try {
      const API_URL = window.location.hostname === 'm3hmet072.github.io' 
        ? 'https://autoservicehoute-production.up.railway.app/api'
        : 'http://localhost:3001/api';
      
      const response = await fetch(`${API_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmail)
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      console.log('Form data saved to database via API');
    } catch (apiError) {
      console.warn('API save failed, falling back to localStorage:', apiError);
      
      // Fallback to localStorage if API fails
      const existingEmails = localStorage.getItem('ash_emails');
      const emails = existingEmails ? JSON.parse(existingEmails) : [];
      emails.unshift(newEmail);
      localStorage.setItem('ash_emails', JSON.stringify(emails));
      console.log('Form data saved to localStorage (fallback)');
    }
  } catch (error) {
    console.error('Error saving to dashboard:', error);
  }
}

// Initialize form
export function initContactForm() {
  const form = document.getElementById('contact-form');
  const kentekenInput = document.getElementById('kenteken');
  const submitBtn = document.getElementById('submit-btn');
  
  if (!form || !kentekenInput) {
    return;
  }
  
  // Debounced kenteken validation
  const debouncedValidate = debounce(async (kenteken) => {
    await validateKenteken(kenteken);
  }, 500);
  
  // Listen to kenteken input changes
  kentekenInput.addEventListener('input', (e) => {
    debouncedValidate(e.target.value);
  });
  
  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate kenteken before submitting
    const isValid = await validateKenteken(data.kenteken);
    
    if (!isValid) {
      showToast('Het ingevoerde kenteken is niet gevonden in de RDW database. Controleer het kenteken en probeer opnieuw.', 'error');
      return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verzenden...';
    
    try {
      const result = await sendEmail(data);
      
      if (result.success) {
        // Save to dashboard (async, but don't wait)
        await saveToAdminDashboard(data);
        
        showToast('Uw bericht is succesvol verzonden! We nemen zo spoedig mogelijk contact met u op.', 'success');
        form.reset();
        vehicleData = null;
        document.getElementById('kenteken-status').textContent = '';
        document.getElementById('vehicle-info').style.display = 'none';
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showToast('Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw of neem telefonisch contact met ons op.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Versturen';
    }
  });
}
