// Real-time Live Visitor Counter (Shopify-style)

let eventSource = null;
let currentCount = 0;
let targetCount = 0;
let animationFrame = null;

export function initLiveVisitorCounter(containerId = 'live-visitor-counter') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('Live visitor counter container not found');
    return;
  }

  // Create counter HTML
  container.innerHTML = `
    <div class="live-counter">
      <div class="live-indicator">
        <span class="pulse-dot"></span>
        <span class="live-text">Live</span>
      </div>
      <div class="visitor-count">
        <span class="count-number" id="visitor-count">0</span>
        <span class="count-label">mensen bekijken nu</span>
      </div>
    </div>
  `;

  // Connect to SSE stream
  connectToStream();

  // Reconnect on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && (!eventSource || eventSource.readyState === EventSource.CLOSED)) {
      connectToStream();
    }
  });
}

function connectToStream() {
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : 'https://autoservicehoute-production.up.railway.app/api';

  try {
    eventSource = new EventSource(`${API_URL}/visitors/stream`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateCount(data.activeVisitors);
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      eventSource.close();
      
      // Retry connection after 5 seconds
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          connectToStream();
        }
      }, 5000);
    };

    eventSource.onopen = () => {
      console.log('✓ Real-time visitor counter connected');
    };
  } catch (error) {
    console.error('Failed to connect to visitor stream:', error);
  }
}

function updateCount(newCount) {
  targetCount = newCount;
  
  // Cancel any ongoing animation
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  
  // Animate to new count
  animateCount();
}

function animateCount() {
  const countElement = document.getElementById('visitor-count');
  if (!countElement) return;

  const diff = targetCount - currentCount;
  
  if (Math.abs(diff) < 0.1) {
    currentCount = targetCount;
    countElement.textContent = Math.round(currentCount);
    return;
  }

  // Smooth easing
  currentCount += diff * 0.15;
  countElement.textContent = Math.round(currentCount);
  
  animationFrame = requestAnimationFrame(animateCount);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (eventSource) {
    eventSource.close();
  }
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
