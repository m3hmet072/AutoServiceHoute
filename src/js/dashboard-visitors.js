import { fetchVisitorStats, fetchDailyVisitorStats, fetchDeviceStats, fetchActiveVisitors } from './api.js';

let visitorChart = null;
let deviceChart = null;

export async function updateVisitorStats() {
  try {
    const stats = await fetchVisitorStats();
    
    // Update real-time stats
    updateElement('active-visitors-count', stats.activeVisitors || 0);
    updateElement('today-visitors-count', stats.todayVisitors || 0);
    updateElement('yesterday-visitors-count', stats.yesterdayVisitors || 0);
    updateElement('total-visitors-count', stats.totalVisitors || 0);
    updateElement('total-sessions-count', stats.totalSessions || 0);
    updateElement('avg-session-duration', formatDuration(stats.avgSessionDuration || 0));

    // Update active visitors list
    await updateActiveVisitorsList();
  } catch (error) {
    console.error('Failed to fetch visitor stats:', error);
  }
}

async function updateActiveVisitorsList() {
  try {
    const activeVisitors = await fetchActiveVisitors();
    const container = document.getElementById('active-visitors-list');
    
    if (!container) return;

    if (activeVisitors.length === 0) {
      container.innerHTML = '<p class=\"empty-state\">Geen actieve bezoekers op dit moment</p>';
      return;
    }

    container.innerHTML = activeVisitors.map(visitor => `
      <div class=\"active-visitor-card\">
        <div class=\"device-icon\">
          ${getDeviceIcon(visitor.deviceType)}
        </div>
        <div class=\"visitor-info\">
          <div class=\"device-name\">${visitor.deviceName}</div>
          <div class=\"device-details\">
            ${visitor.browser} • ${visitor.os}
          </div>
          <div class=\"visitor-page\">${visitor.page}</div>
        </div>
        <div class=\"visitor-duration\">${formatDuration(visitor.duration)}</div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to fetch active visitors:', error);
  }
}

export async function loadDeviceChart() {
  try {
    const deviceStats = await fetchDeviceStats();
    
    const chartContainer = document.getElementById('device-chart');
    if (!chartContainer) return;

    // Group by device type
    const deviceTypes = {};
    deviceStats.forEach(stat => {
      if (!deviceTypes[stat.device_type]) {
        deviceTypes[stat.device_type] = 0;
      }
      deviceTypes[stat.device_type] += stat.count;
    });

    if (window.Chart) {
      if (deviceChart) {
        deviceChart.destroy();
      }

      const ctx = chartContainer.getContext('2d');
      deviceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(deviceTypes),
          datasets: [{
            data: Object.values(deviceTypes),
            backgroundColor: [
              'rgba(75, 192, 192, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 205, 86, 0.8)',
              'rgba(54, 162, 235, 0.8)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Bezoekers per Apparaat Type'
            }
          }
        }
      });
    }

    // Display device list
    const deviceListContainer = document.getElementById('device-list');
    if (deviceListContainer) {
      deviceListContainer.innerHTML = deviceStats.slice(0, 10).map(device => `
        <div class=\"device-stat-item\">
          <div class=\"device-icon\">${getDeviceIcon(device.device_type)}</div>
          <div class=\"device-info\">
            <div class=\"device-name\">${device.device_name}</div>
            <div class=\"device-count\">${device.count} bezoeken</div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Failed to load device chart:', error);
  }
}

function getDeviceIcon(deviceType) {
  switch (deviceType) {
    case 'Mobile': return '📱';
    case 'Tablet': return '📱';
    case 'Desktop': return '💻';
    default: return '🖥️';
  }
}

export async function loadVisitorChart(days = 30) {
  try {
    const dailyStats = await fetchDailyVisitorStats(days);
    
    const chartContainer = document.getElementById('visitor-chart');
    if (!chartContainer) return;

    // Prepare data for chart
    const dates = dailyStats.map(stat => {
      const date = new Date(stat.date);
      return date.toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' });
    });
    const visitors = dailyStats.map(stat => stat.uniqueVisitors);
    const sessions = dailyStats.map(stat => stat.totalSessions);

    // If you're using Chart.js, create the chart
    if (window.Chart) {
      if (visitorChart) {
        visitorChart.destroy();
      }

      const ctx = chartContainer.getContext('2d');
      visitorChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Unique Bezoekers',
              data: visitors,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1
            },
            {
              label: 'Totaal Sessies',
              data: sessions,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Bezoekersstatistieken (Laatste ${days} Dagen)`
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      });
    }
  } catch (error) {
    console.error('Failed to load visitor chart:', error);
  }
}

function updateElement(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
}

// Auto-update stats every 10 seconds
setInterval(updateVisitorStats, 10000);

// Initial load
updateVisitorStats();
loadVisitorChart(30);
loadDeviceChart();
