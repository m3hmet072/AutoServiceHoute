// API configuration with environment detection
const getApiBaseUrl = () => {
  // Check if we're on GitHub Pages
  if (window.location.hostname === 'm3hmet072.github.io') {
    return 'https://autoservicehoute-production.up.railway.app/api';
  }
  
  // Check if we're on custom domain
  if (window.location.hostname === 'autoservicehoute.nl') {
    return 'https://autoservicehoute-production.up.railway.app/api';
  }
  
  // Check if we're on localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001/api';
  }
  
  // Default to Railway
  return 'https://autoservicehoute-production.up.railway.app/api';
};

const API_BASE_URL = getApiBaseUrl();

// ============= APPOINTMENTS API =============

export async function fetchAppointments() {
  const response = await fetch(`${API_BASE_URL}/appointments`);
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return await response.json();
}

export async function fetchAppointmentById(id) {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`);
  if (!response.ok) throw new Error('Failed to fetch appointment');
  return await response.json();
}

export async function createAppointment(appointment) {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment)
  });
  if (!response.ok) throw new Error('Failed to create appointment');
  return await response.json();
}

export async function updateAppointment(id, updates) {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update appointment');
  return await response.json();
}

export async function deleteAppointment(id) {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete appointment');
  return await response.json();
}

// ============= WORK DAYS API =============

export async function fetchWorkDays(startDate = null, endDate = null) {
  let url = `${API_BASE_URL}/workdays`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch work days');
  return await response.json();
}

export async function createWorkDay(workDay) {
  const response = await fetch(`${API_BASE_URL}/workdays`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workDay)
  });
  if (!response.ok) throw new Error('Failed to create work day');
  return await response.json();
}

export async function importWorkDaysBulk(workDays) {
  const response = await fetch(`${API_BASE_URL}/workdays/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workDays })
  });
  if (!response.ok) throw new Error('Failed to import work days');
  return await response.json();
}

export async function deleteWorkDay(id) {
  const response = await fetch(`${API_BASE_URL}/workdays/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete work day');
  return await response.json();
}

export async function clearAllWorkDays() {
  const response = await fetch(`${API_BASE_URL}/workdays`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to clear work days');
  return await response.json();
}

// ============= EMAILS API =============

export async function fetchEmails() {
  const response = await fetch(`${API_BASE_URL}/emails`);
  if (!response.ok) throw new Error('Failed to fetch emails');
  return await response.json();
}

export async function fetchEmailById(id) {
  const response = await fetch(`${API_BASE_URL}/emails/${id}`);
  if (!response.ok) throw new Error('Failed to fetch email');
  return await response.json();
}

export async function createEmail(email) {
  const response = await fetch(`${API_BASE_URL}/emails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email)
  });
  if (!response.ok) throw new Error('Failed to save email');
  return await response.json();
}

export async function markEmailAsRead(id) {
  const response = await fetch(`${API_BASE_URL}/emails/${id}/read`, {
    method: 'PUT'
  });
  if (!response.ok) throw new Error('Failed to mark email as read');
  return await response.json();
}

export async function deleteEmail(id) {
  const response = await fetch(`${API_BASE_URL}/emails/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete email');
  return await response.json();
}

// ============= STATS API =============

export async function fetchStats() {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return await response.json();
}

// ============= VISITOR TRACKING API =============

export async function trackVisitor(deviceInfo) {
  const response = await fetch(`${API_BASE_URL}/visitors/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      visitorId: deviceInfo?.visitorId,
      sessionId: deviceInfo?.sessionId,
      isNewSession: deviceInfo?.isNewSession,
      deviceType: deviceInfo?.deviceType,
      deviceName: deviceInfo?.deviceName,
      browser: deviceInfo?.browser,
      os: deviceInfo?.os,
      screenResolution: deviceInfo?.screenResolution,
      viewport: deviceInfo?.viewport
    })
  });
  if (!response.ok) throw new Error('Failed to track visitor');
  return await response.json();
}

export async function sendHeartbeat(visitorId, sessionId) {
  const response = await fetch(`${API_BASE_URL}/visitors/heartbeat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitorId, sessionId })
  });
  if (!response.ok) throw new Error('Failed to send heartbeat');
  return await response.json();
}

export async function fetchVisitorStats(startDate = null, endDate = null) {
  let url = `${API_BASE_URL}/visitors/stats`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch visitor stats');
  return await response.json();
}

export async function fetchDailyVisitorStats(days = 30) {
  const response = await fetch(`${API_BASE_URL}/visitors/daily?days=${days}`);
  if (!response.ok) throw new Error('Failed to fetch daily visitor stats');
  return await response.json();
}
