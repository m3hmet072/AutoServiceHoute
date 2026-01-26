import { trackVisitor, sendHeartbeat } from './api.js';

// Parse user agent to get device info
function getDeviceInfo() {
  const ua = navigator.userAgent;
  let deviceType = 'Desktop';
  let deviceName = 'Unknown';
  let browser = 'Unknown';
  let os = 'Unknown';

  // Detect OS
  if (ua.includes('Windows NT 10.0')) os = 'Windows 10';
  else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
  else if (ua.includes('Windows NT 6.2')) os = 'Windows 8';
  else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
  else if (ua.includes('Mac OS X')) {
    const match = ua.match(/Mac OS X ([\d_]+)/);
    os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
  }
  else if (ua.includes('Android')) {
    const match = ua.match(/Android ([\d.]+)/);
    os = match ? `Android ${match[1]}` : 'Android';
  }
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    const match = ua.match(/OS ([\d_]+)/);
    os = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS';
  }
  else if (ua.includes('Linux')) os = 'Linux';

  // Detect Browser
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

  // Detect Device Type and Model
  if (ua.includes('iPhone')) {
    deviceType = 'Mobile';
    if (ua.includes('iPhone15')) deviceName = 'iPhone 15';
    else if (ua.includes('iPhone14')) deviceName = 'iPhone 14';
    else if (ua.includes('iPhone13')) deviceName = 'iPhone 13';
    else if (ua.includes('iPhone12')) deviceName = 'iPhone 12';
    else if (ua.includes('iPhone11')) deviceName = 'iPhone 11';
    else if (ua.includes('iPhone X')) deviceName = 'iPhone X';
    else deviceName = 'iPhone';
  } else if (ua.includes('iPad')) {
    deviceType = 'Tablet';
    deviceName = 'iPad';
    if (ua.includes('iPad Pro')) deviceName = 'iPad Pro';
    else if (ua.includes('iPad Air')) deviceName = 'iPad Air';
    else if (ua.includes('iPad Mini')) deviceName = 'iPad Mini';
  } else if (ua.includes('Android')) {
    deviceType = ua.includes('Mobile') ? 'Mobile' : 'Tablet';
    if (ua.includes('SM-S926')) deviceName = 'Samsung Galaxy S24+';
    else if (ua.includes('SM-S921')) deviceName = 'Samsung Galaxy S24';
    else if (ua.includes('SM-S928')) deviceName = 'Samsung Galaxy S24 Ultra';
    else if (ua.includes('SM-S911')) deviceName = 'Samsung Galaxy S23';
    else if (ua.includes('SM-S918')) deviceName = 'Samsung Galaxy S23 Ultra';
    else if (ua.includes('SM-S901')) deviceName = 'Samsung Galaxy S22';
    else if (ua.includes('SM-S908')) deviceName = 'Samsung Galaxy S22 Ultra';
    else if (ua.includes('SM-G991')) deviceName = 'Samsung Galaxy S21';
    else if (ua.includes('SM-G998')) deviceName = 'Samsung Galaxy S21 Ultra';
    else if (ua.includes('SM-A')) deviceName = 'Samsung Galaxy A Series';
    else if (ua.includes('Pixel 8')) deviceName = 'Google Pixel 8';
    else if (ua.includes('Pixel 7')) deviceName = 'Google Pixel 7';
    else if (ua.includes('Pixel 6')) deviceName = 'Google Pixel 6';
    else if (ua.includes('Pixel')) deviceName = 'Google Pixel';
    else if (ua.includes('OnePlus')) deviceName = 'OnePlus';
    else if (ua.includes('Xiaomi')) deviceName = 'Xiaomi';
    else if (ua.includes('Huawei')) deviceName = 'Huawei';
    else deviceName = 'Android Device';
  } else {
    deviceType = 'Desktop';
    if (ua.includes('Windows')) deviceName = 'Windows PC';
    else if (ua.includes('Mac')) deviceName = 'Mac';
    else if (ua.includes('Linux')) deviceName = 'Linux PC';
    else deviceName = 'Desktop Computer';
  }

  return {
    deviceType,
    deviceName,
    browser,
    os,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`
  };
}

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const HEARTBEAT_INTERVAL = 30000; // 30 seconds

// Get or create persistent visitor ID
function getVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}

// Check if we need a new session
function needsNewSession() {
  const lastActivity = localStorage.getItem('lastActivity');
  if (!lastActivity) return true;
  
  const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
  return timeSinceLastActivity > SESSION_TIMEOUT;
}

// Update last activity timestamp
function updateLastActivity() {
  localStorage.setItem('lastActivity', Date.now().toString());
}

// Get current session ID or create new one
function getSessionId() {
  if (needsNewSession()) {
    // Create new session
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('currentSessionId', sessionId);
    localStorage.setItem('sessionStartTime', Date.now().toString());
    updateLastActivity();
    return sessionId;
  }
  
  // Return existing session
  let sessionId = localStorage.getItem('currentSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('currentSessionId', sessionId);
    localStorage.setItem('sessionStartTime', Date.now().toString());
  }
  updateLastActivity();
  return sessionId;
}

// Initialize visitor tracking
async function initVisitorTracking() {
  try {
    const deviceInfo = getDeviceInfo();
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const isNewSession = needsNewSession();
    
    // Track visitor with session info
    const response = await trackVisitor({
      ...deviceInfo,
      visitorId,
      sessionId,
      isNewSession
    });
    
    if (response.success) {
      console.log('Visitor tracking initialized:', { visitorId, sessionId });
    }

    // Send heartbeat every 30 seconds to keep session alive
    const heartbeatInterval = setInterval(() => {
      const currentSessionId = getSessionId(); // This will check for timeout
      sendHeartbeat(visitorId, currentSessionId).catch(console.error);
    }, HEARTBEAT_INTERVAL);

    // Update activity on user interactions
    const updateActivity = () => updateLastActivity();
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(heartbeatInterval);
    });
  } catch (error) {
    console.error('Failed to initialize visitor tracking:', error);
  }
}

// Start tracking when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVisitorTracking);
} else {
  initVisitorTracking();
}
