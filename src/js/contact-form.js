// RDW API Integration and Contact Form Handler
import { createClient } from '@supabase/supabase-js';

let vehicleData = null;
let lastSubmitAt = 0;
let isSubmitting = false;
const MAX_CUSTOM_SERVICES = 10;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const GARAGE_UUID = import.meta.env.VITE_GARAGE_UUID;
const RATE_LIMIT_WINDOW_MS = 10_000;

let supabase = null;

function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !GARAGE_UUID) {
    throw new Error('Supabase config ontbreekt. Stel VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY en VITE_GARAGE_UUID in.');
  }

  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
  }

  return supabase;
}

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

function normalizeLicensePlate(value) {
  return (value || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

function getOrCreateFeedbackElement(form) {
  let feedback = form.querySelector('#contact-form-feedback');
  if (feedback) {
    return feedback;
  }

  feedback = document.createElement('small');
  feedback.id = 'contact-form-feedback';
  feedback.className = 'onderwerp-status';
  feedback.setAttribute('aria-live', 'polite');
  form.appendChild(feedback);
  return feedback;
}

function setFormFeedback(form, message, type = 'info') {
  const feedback = getOrCreateFeedbackElement(form);
  feedback.textContent = message || '';

  feedback.style.color = '';
  if (type === 'error') {
    feedback.style.color = '#dc2626';
  } else if (type === 'success') {
    feedback.style.color = '#059669';
  }
}

function resetVehicleUi() {
  const kentekenStatus = document.getElementById('kenteken-status');
  const vehicleInfo = document.getElementById('vehicle-info');

  if (kentekenStatus) {
    kentekenStatus.textContent = '';
    kentekenStatus.className = 'kenteken-status';
  }

  if (vehicleInfo) {
    vehicleInfo.style.display = 'none';
  }
}

async function insertBooking(bookingPayload) {
  const client = getSupabaseClient();

  // RLS assumptions:
  // - anon can insert into public.bookings
  // - anon cannot select/update/delete public.bookings
  // - insert is allowed only when garage_id exists in public.garages
  const { error } = await client
    .from('bookings')
    .insert(bookingPayload);

  if (error) {
    throw error;
  }
}

function validateSubmission(values) {
  if (!values.licensePlate) {
    return 'Vul een kenteken in.';
  }

  if (values.selectedServices.length === 0) {
    return 'Kies minimaal één onderwerp.';
  }

  if (values.hasOtherService && !values.customService) {
    return 'Licht bij Overige kort toe welke service u nodig heeft.';
  }

  if (values.hasPendingCustomService) {
    return 'Klik op Toevoegen om uw extra onderwerp op te slaan.';
  }

  if (!values.description || values.description.length < 10) {
    return 'Beschrijf uw vraag in minimaal 10 tekens.';
  }

  return null;
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

  const naamInput = form.querySelector('#naam, [name="naam"], [name="name"]');
  const telefoonInput = form.querySelector('#telefoon, [name="telefoon"], [name="phone"]');
  const berichtInput = form.querySelector('#bericht, [name="bericht"], [name="description"]');
  const honeypotInput = form.querySelector('[name="website"]');
  const customServiceInput = form.querySelector('#custom-service, [name="customService"], [name="onderwerp_custom"]');
  const customServiceGroup = form.querySelector('#custom-service-group');
  const customServiceAddButton = form.querySelector('#custom-service-add');
  const customServiceList = form.querySelector('#custom-service-list');

  const onderwerpCheckboxes = form.querySelectorAll('input[name="onderwerp"]');
  const customServices = [];

  const renderCustomServices = () => {
    if (!customServiceList) {
      return;
    }

    customServiceList.innerHTML = customServices.map((item, index) => `
      <span class="custom-service-item">
        ${item}
        <button type="button" class="custom-service-remove" data-custom-service-index="${index}" aria-label="Verwijder ${item}">&times;</button>
      </span>
    `).join('');

    customServiceList.querySelectorAll('[data-custom-service-index]').forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.getAttribute('data-custom-service-index'));
        customServices.splice(index, 1);
        renderCustomServices();
      });
    });

    updateOnderwerpPreview();
  };

  const clearCustomServices = () => {
    customServices.length = 0;
    renderCustomServices();
  };

  const addCustomService = () => {
    if (!customServiceInput) {
      return;
    }

    const value = customServiceInput.value.trim();
    if (!value) {
      showToast('Vul eerst een eigen onderwerp in.', 'warning');
      return;
    }

    if (customServices.length >= MAX_CUSTOM_SERVICES) {
      showToast('U kunt maximaal 10 extra onderwerpen toevoegen.', 'warning');
      return;
    }

    if (customServices.some((item) => item.toLowerCase() === value.toLowerCase())) {
      showToast('Dit extra onderwerp is al toegevoegd.', 'warning');
      return;
    }

    customServices.push(value);
    customServiceInput.value = '';
    renderCustomServices();
  };

  const updateOnderwerpPreview = () => {
    if (!onderwerpPreview) {
      return;
    }

    const selected = getSelectedOnderwerpen(form);
    const selectedWithCustom = selected.map((item) => {
      if (/^(other|overig|overige)$/i.test(item) && customServices.length > 0) {
        return `Overige (${customServices.join(', ')})`;
      }
      return item;
    });

    onderwerpPreview.textContent = selectedWithCustom.length > 0
      ? `Gekozen: ${selectedWithCustom.join(', ')}`
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
      const hasOther = selected.some((item) => /^(other|overig|overige)$/i.test(item));
      if (customServiceGroup) {
        customServiceGroup.hidden = !hasOther;
      }
      if (customServiceInput) {
        customServiceInput.required = false;
        customServiceInput.disabled = !hasOther;
        if (!hasOther) {
          customServiceInput.value = '';
          clearCustomServices();
        }
      }
      if (customServiceAddButton) {
        customServiceAddButton.disabled = !hasOther;
      }
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
  if (customServiceGroup) {
    customServiceGroup.hidden = true;
  }
  if (customServiceInput) {
    customServiceInput.required = false;
    customServiceInput.disabled = true;
  }
  if (customServiceAddButton) {
    customServiceAddButton.disabled = true;
    customServiceAddButton.addEventListener('click', addCustomService);
  }
  if (customServiceInput) {
    customServiceInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addCustomService();
      }
    });
  }
  
  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (honeypotInput && honeypotInput.value.trim()) {
      return;
    }

    if (isSubmitting) {
      setFormFeedback(form, 'Uw aanvraag wordt al verzonden. Even geduld alstublieft.', 'error');
      return;
    }

    if (Date.now() - lastSubmitAt < RATE_LIMIT_WINDOW_MS) {
      showToast('Wacht een paar seconden voordat u opnieuw verzendt.', 'warning');
      setFormFeedback(form, 'Wacht een paar seconden voordat u opnieuw verzendt.', 'error');
      return;
    }

    const formData = new FormData(form);
    const geselecteerdeOnderwerpen = getSelectedOnderwerpen(form);
    const hasOtherService = geselecteerdeOnderwerpen.some((item) => /^(other|overig|overige)$/i.test(item));
    const pendingCustomService = (customServiceInput ? customServiceInput.value : '').trim();
    const customServiceValues = [...customServices];
    const normalizedPlate = normalizeLicensePlate(kentekenInput.value);

    if (geselecteerdeOnderwerpen.length === 0) {
      if (onderwerpStatus) {
        onderwerpStatus.textContent = 'Selecteer minimaal één onderwerp.';
      }
      showToast('Kies minimaal één onderwerp.', 'warning');
      return;
    }

    const submissionValues = {
      name: (naamInput ? naamInput.value : formData.get('naam') || formData.get('name') || '').toString().trim(),
      licensePlate: normalizedPlate,
      selectedServices: geselecteerdeOnderwerpen,
      hasOtherService,
      customService: customServiceValues.join(', '),
      customServiceValues,
      hasPendingCustomService: Boolean(pendingCustomService),
      description: (berichtInput ? berichtInput.value : formData.get('bericht') || formData.get('description') || '').toString().trim(),
      phone: (telefoonInput ? telefoonInput.value : formData.get('telefoon') || formData.get('phone') || '').toString().trim()
    };

    const validationError = validateSubmission(submissionValues);
    if (validationError) {
      showToast(validationError, 'warning');
      setFormFeedback(form, validationError, 'error');
      return;
    }

    if (onderwerpStatus) {
      onderwerpStatus.textContent = '';
    }

    // Validate kenteken before submitting
    const isValid = await validateKenteken(submissionValues.licensePlate);

    if (!isValid) {
      showToast('Het ingevoerde kenteken is niet gevonden in de RDW database. Controleer het kenteken en probeer opnieuw.', 'error');
      setFormFeedback(form, 'Controleer het kenteken en probeer opnieuw.', 'error');
      return;
    }

    // Disable submit button
    isSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Verzenden...';
    }

    try {
      const serviceItems = submissionValues.selectedServices.filter((item) => !/^(other|overig|overige)$/i.test(item));
      if (submissionValues.hasOtherService && submissionValues.customServiceValues.length > 0) {
        serviceItems.push(...submissionValues.customServiceValues);
      }

      const serviceValue = serviceItems.join(', ');
      const bookingPayload = {
        garage_id: GARAGE_UUID,
        name: submissionValues.name,
        license_plate: submissionValues.licensePlate,
        service: serviceValue,
        phone: submissionValues.phone || '',
        message: submissionValues.description
      };

      await insertBooking(bookingPayload);
      lastSubmitAt = Date.now();

      showToast('Uw afspraakverzoek is ontvangen. We nemen zo snel mogelijk contact op.', 'success');
      setFormFeedback(form, 'Uw afspraakverzoek is verzonden.', 'success');

      form.reset();
      vehicleData = null;
      resetVehicleUi();
      if (onderwerpStatus) {
        onderwerpStatus.textContent = '';
      }
      if (customServiceInput) {
        customServiceInput.required = false;
        customServiceInput.disabled = true;
      }
      if (customServiceGroup) {
        customServiceGroup.hidden = true;
      }
      if (customServiceAddButton) {
        customServiceAddButton.disabled = true;
      }
      clearCustomServices();
      updateOnderwerpPreview();
    } catch (error) {
      console.error('Error creating booking:', error);
      showToast('Verzenden is niet gelukt. Probeer het opnieuw of neem telefonisch contact met ons op.', 'error');
      setFormFeedback(form, 'Verzenden is niet gelukt. Controleer uw invoer en probeer opnieuw.', 'error');
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Bevestig afspraak';
      }
    }
  });
}
