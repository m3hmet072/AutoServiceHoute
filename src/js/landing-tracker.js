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
  else if (ua.includes('Mac OS X')) {
    const match = ua.match(/Mac OS X ([\d_]+)/);
    os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
  }
  else if (ua.includes('Android')) {
    const match = ua.match(/Android ([\d.]+)/);
    os = match ? `Android ${match[1]}` : 'Android';
  }
  else if (ua.includes('iPhone') || ua.includes('iPad')) {
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

  // Detect Device Type (simplified)
  if (ua.includes('Mobile')) {
    deviceType = 'Mobile';
    deviceName = 'Mobile Device';
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    deviceType = 'Tablet';
    deviceName = 'Tablet';
  } else {
    deviceType = 'Desktop';
    deviceName = 'Desktop';
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

// Initialize visitor tracking
async function initVisitorTracking() {
  try {
    const deviceInfo = getDeviceInfo();
    
    // Check if already tracked in this session
    let existingSessionId = sessionStorage.getItem('visitorSessionId');
    
    if (existingSessionId) {
      // Verify session still exists on server with heartbeat
      const heartbeatSuccess = await sendHeartbeat();
      
      // If heartbeat fails, session expired on server - create new one
      if (!heartbeatSuccess) {
        console.log('Session expired, creating new session');
        existingSessionId = null;
      }
    }
    
    // Create new session if no valid existing session
    if (!existingSessionId) {
      // Track new visitor with device info
      const response = await trackVisitor(deviceInfo);
      if (response.sessionId) {
        sessionStorage.setItem('visitorSessionId', response.sessionId);
      }
    }

    // Send heartbeat every 30 seconds to keep session alive
    const heartbeatInterval = setInterval(() => {
      sendHeartbeat().catch(console.error);
    }, 30000);

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
