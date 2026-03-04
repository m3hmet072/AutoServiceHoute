// RDW API Integration and Contact Form Handler
// Using EmailJS for email sending
import { createEmail } from './api.js';

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

function formatRdwDate(dateValue) {
  if (!dateValue || dateValue.length !== 8) {
    return 'Onbekend';
  }

  return `${dateValue.substring(6, 8)}-${dateValue.substring(4, 6)}-${dateValue.substring(0, 4)}`;
}

function getBouwjaar(vehicle) {
  if (!vehicle || !vehicle.datum_eerste_toelating || vehicle.datum_eerste_toelating.length < 4) {
    return 'Onbekend';
  }

  return vehicle.datum_eerste_toelating.substring(0, 4);
}

function getSelectedOnderwerpen(formElement) {
  const multiSelect = formElement.querySelector('select[name="onderwerp"][multiple]');

  if (multiSelect) {
    return Array.from(multiSelect.selectedOptions)
      .map((option) => option.value.toString().trim())
      .filter(Boolean);
  }

  const formData = new FormData(formElement);
  return formData.getAll('onderwerp').map((value) => value.toString().trim()).filter(Boolean);
}

// Auto-format kenteken as user types (XX-123-XX format)
function autoFormatKenteken(input) {
  let value = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  
  if (value.length > 6) {
    // Format: XX-123-XX or similar patterns
    if (/^[A-Z]{2}[0-9]{2}/.test(value)) {
      value = value.substring(0, 2) + '-' + value.substring(2, 4) + '-' + value.substring(4, 6);
    } else if (/^[0-9]{2}[A-Z]{2}/.test(value)) {
      value = value.substring(0, 2) + '-' + value.substring(2, 4) + '-' + value.substring(4, 6);
    } else if (/^[A-Z]{2}[0-9]{3}/.test(value)) {
      value = value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5, 6);
    } else {
      // Generic format
      value = value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5, 7);
    }
  } else if (value.length > 2) {
    value = value.substring(0, 2) + '-' + value.substring(2);
  }
  
  input.value = value.substring(0, 9); // Max length with dashes
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
    statusEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 11-2 0V7zm1 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/></svg> Kenteken controleren...';
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
      statusEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Kenteken gevonden';
      statusEl.className = 'kenteken-status valid';
      
      const merk = vehicleData.merk || 'Onbekend merk';
      const model = vehicleData.handelsbenaming || 'Onbekend model';
      const voertuigNaam = `${merk} ${model}`.trim();
      const bouwjaar = getBouwjaar(vehicleData);
      const apkVervalt = formatRdwDate(vehicleData.vervaldatum_apk);
      const kleur = vehicleData.eerste_kleur || 'Onbekend';
      const brandstof = vehicleData.brandstof_omschrijving || 'Onbekend';

      document.getElementById('vehicle-title').textContent = voertuigNaam;
      document.getElementById('vehicle-bouwjaar').textContent = bouwjaar;
      document.getElementById('vehicle-apk').textContent = apkVervalt;
      document.getElementById('vehicle-kleur').textContent = kleur;
      document.getElementById('vehicle-brandstof').textContent = brandstof;
      
      vehicleInfo.style.display = 'block';
      return true;
    } else {
      statusEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg> Kenteken niet gevonden';
      statusEl.className = 'kenteken-status invalid';
      vehicleInfo.style.display = 'none';
      vehicleData = null;
      return false;
    }
  } catch (error) {
    console.error('Error validating kenteken:', error);
    statusEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg> Controleer uw kenteken';
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
    name: formData.naam || 'Niet opgegeven',
    subject: formData.onderwerp,
    email: formData.email || 'Niet opgegeven',
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
  const newEmail = {
    id: Date.now().toString(),
    name: formData.naam || 'Niet opgegeven',
    email: formData.email || 'Niet opgegeven',
    phone: formData.telefoon,
    kenteken: formData.kenteken,
    subject: formData.onderwerp,
    message: formData.bericht,
    vehicleInfo: vehicleData || null,
    source: 'website-form',
    read: false
  };

  const result = await createEmail(newEmail);
  console.log('Form data saved to database via API:', result);
}

// Initialize form
export function initContactForm() {
  const form = document.getElementById('contact-form');
  const kentekenInput = document.getElementById('kenteken');
  const submitBtn = document.getElementById('submit-btn');
  const onderwerpStatus = document.getElementById('onderwerp-status');
  const onderwerpPreview = document.getElementById('onderwerp-preview');
  const onderwerpToggle = document.getElementById('onderwerp-toggle');
  const onderwerpPanel = document.getElementById('onderwerp-panel');
  const onderwerpDropdown = document.getElementById('onderwerp-dropdown');
  
  if (!form || !kentekenInput) {
    return;
  }

  const onderwerpCheckboxes = form.querySelectorAll('input[name="onderwerp"]');

  const updateOnderwerpPreview = () => {
    if (!onderwerpPreview) {
      return;
    }

    const selected = getSelectedOnderwerpen(form);
    onderwerpPreview.textContent = selected.length > 0
      ? `Gekozen: ${selected.join(', ')}`
      : 'Nog geen onderwerp gekozen.';
  };
  
  // Debounced kenteken validation
  const debouncedValidate = debounce(async (kenteken) => {
    await validateKenteken(kenteken);
  }, 300);
  
  // Listen to kenteken input changes
  kentekenInput.addEventListener('input', (e) => {
    autoFormatKenteken(e.target);
    const formatted = formatKenteken(e.target.value);
    
    // Start searching immediately when we have any character
    if (formatted.length >= 1) {
      debouncedValidate(e.target.value);
    } else {
      // Clear status if empty
      const statusEl = document.getElementById('kenteken-status');
      const vehicleInfo = document.getElementById('vehicle-info');
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'kenteken-status';
      }
      if (vehicleInfo) {
        vehicleInfo.style.display = 'none';
      }
    }
  });

  onderwerpCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      if (!onderwerpStatus) {
        updateOnderwerpPreview();
        return;
      }

      const selected = getSelectedOnderwerpen(form);
      onderwerpStatus.textContent = selected.length > 0 ? '' : 'Selecteer minimaal één onderwerp.';
      updateOnderwerpPreview();
    });
  });

  if (onderwerpToggle && onderwerpPanel && onderwerpDropdown) {
    const openDropdown = () => {
      onderwerpPanel.hidden = false;
      onderwerpToggle.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
      onderwerpPanel.hidden = true;
      onderwerpToggle.setAttribute('aria-expanded', 'false');
    };

    onderwerpToggle.addEventListener('click', () => {
      const isExpanded = onderwerpToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    document.addEventListener('click', (event) => {
      if (!onderwerpDropdown.contains(event.target)) {
        closeDropdown();
      }
    });

    closeDropdown();
  }

  updateOnderwerpPreview();
  
  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const geselecteerdeOnderwerpen = getSelectedOnderwerpen(form);
    const data = {
      ...Object.fromEntries(formData.entries()),
      naam: 'Niet opgegeven',
      email: formData.get('email') || 'Niet opgegeven',
      onderwerp: geselecteerdeOnderwerpen.join(', ')
    };

    if (!data.kenteken || !data.kenteken.trim()) {
      showToast('Vul een kenteken in.', 'warning');
      return;
    }

    if (geselecteerdeOnderwerpen.length === 0) {
      if (onderwerpStatus) {
        onderwerpStatus.textContent = 'Selecteer minimaal één onderwerp.';
      }
      showToast('Kies minimaal één onderwerp.', 'warning');
      return;
    }
    
    if (onderwerpStatus) {
      onderwerpStatus.textContent = '';
    }
    
    // Validate kenteken before submitting
    const isValid = await validateKenteken(data.kenteken);
    
    if (!isValid) {
      showToast('Het ingevoerde kenteken is niet gevonden in de RDW database. Controleer het kenteken en probeer opnieuw.', 'error');
      return;
    }
    
    // Disable submit button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Verzenden...';
    }
    
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
        if (onderwerpStatus) {
          onderwerpStatus.textContent = '';
        }
        updateOnderwerpPreview();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showToast('Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het later opnieuw of neem telefonisch contact met ons op.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Bevestig afspraak';
      }
    }
  });
}
