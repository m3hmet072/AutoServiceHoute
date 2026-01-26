import { trackVisitor, sendHeartbeat } from './api.js';

// Initialize visitor tracking
async function initVisitorTracking() {
  try {
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
      // Track new visitor (no device info)
      const response = await trackVisitor();
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
