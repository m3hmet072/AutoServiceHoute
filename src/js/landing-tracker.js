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
    // Samsung Galaxy detection (more comprehensive)
    if (ua.includes('SM-S928')) deviceName = 'Samsung Galaxy S24 Ultra';
    else if (ua.includes('SM-S926')) deviceName = 'Samsung Galaxy S24+';
    else if (ua.includes('SM-S921')) deviceName = 'Samsung Galaxy S24';
    else if (ua.includes('SM-S918')) deviceName = 'Samsung Galaxy S23 Ultra';
    else if (ua.includes('SM-S916')) deviceName = 'Samsung Galaxy S23+';
    else if (ua.includes('SM-S911')) deviceName = 'Samsung Galaxy S23';
    else if (ua.includes('SM-S908')) deviceName = 'Samsung Galaxy S22 Ultra';
    else if (ua.includes('SM-S906')) deviceName = 'Samsung Galaxy S22+';
    else if (ua.includes('SM-S901')) deviceName = 'Samsung Galaxy S22';
    else if (ua.includes('SM-G988')) deviceName = 'Samsung Galaxy S20 Ultra';
    else if (ua.includes('SM-G986')) deviceName = 'Samsung Galaxy S20+';
    else if (ua.includes('SM-G985')) deviceName = 'Samsung Galaxy S20+ 5G';
    else if (ua.includes('SM-G981')) deviceName = 'Samsung Galaxy S20 5G';
    else if (ua.includes('SM-G980')) deviceName = 'Samsung Galaxy S20';
    else if (ua.includes('SM-G998')) deviceName = 'Samsung Galaxy S21 Ultra';
    else if (ua.includes('SM-G996')) deviceName = 'Samsung Galaxy S21+';
    else if (ua.includes('SM-G991')) deviceName = 'Samsung Galaxy S21';
    else if (ua.includes('SM-N986')) deviceName = 'Samsung Galaxy Note 20 Ultra';
    else if (ua.includes('SM-N981')) deviceName = 'Samsung Galaxy Note 20';
    else if (ua.includes('SM-A')) deviceName = 'Samsung Galaxy A-serie';
    else if (ua.includes('SM-')) deviceName = 'Samsung Galaxy';
    else if (ua.includes('Pixel 8 Pro')) deviceName = 'Google Pixel 8 Pro';
    else if (ua.includes('Pixel 8')) deviceName = 'Google Pixel 8';
    else if (ua.includes('Pixel 7 Pro')) deviceName = 'Google Pixel 7 Pro';
    else if (ua.includes('Pixel 7')) deviceName = 'Google Pixel 7';
    else if (ua.includes('Pixel 6 Pro')) deviceName = 'Google Pixel 6 Pro';
    else if (ua.includes('Pixel 6')) deviceName = 'Google Pixel 6';
    else if (ua.includes('Pixel')) deviceName = 'Google Pixel';
    else if (ua.includes('OnePlus')) deviceName = 'OnePlus';
    else if (ua.includes('Xiaomi')) deviceName = 'Xiaomi';
    else if (ua.includes('Huawei')) deviceName = 'Huawei';
    else if (ua.includes('OPPO')) deviceName = 'OPPO';
    else if (ua.includes('Realme')) deviceName = 'Realme';
    else deviceName = 'Android Toestel';
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

// Initialize visitor tracking
async function initVisitorTracking() {
  try {
    const deviceInfo = getDeviceInfo();
    
    // Check if already tracked in this session
    if (sessionStorage.getItem('visitorSessionId')) {
      // Just send heartbeat for existing session
      await sendHeartbeat();
    } else {
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
