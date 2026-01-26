import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import database with error handling
let db;
try {
  const dbModule = await import('./database.js');
  db = dbModule;
  console.log('✓ Database module loaded');
} catch (error) {
  console.error('❌ Failed to load database:', error.message);
  console.error(error.stack);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://m3hmet072.github.io',
  'https://autoservicehoute.nl',
  'http://autoservicehoute.nl'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // For now, allow all origins (can restrict later)
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
  optionsSuccessStatus: 200
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Email configuration
let transporter;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (emailUser && emailPass && emailUser !== 'your-email@gmail.com') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
  console.log('✓ Email transporter configured');
} else {
  console.log('⚠ Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
  console.log('  For now, emails will be logged to console only.');
}

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, kenteken, subject, message, vehicle } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !kenteken || !subject || !message) {
      return res.status(400).json({ error: 'Alle velden zijn verplicht' });
    }
    
    // Create email HTML content
    let vehicleInfo = '';
    if (vehicle) {
      vehicleInfo = `
        <h3>Voertuig Informatie:</h3>
        <ul>
          <li><strong>Merk:</strong> ${vehicle.merk || 'Onbekend'}</li>
          <li><strong>Model:</strong> ${vehicle.model || 'Onbekend'}</li>
          <li><strong>Datum eerste toelating:</strong> ${vehicle.datum_eerste_toelating || 'Onbekend'}</li>
        </ul>
      `;
    }
    
    const htmlContent = `
      <h2>Nieuwe contactaanvraag van AutoService Houte website</h2>
      
      <h3>Klant Gegevens:</h3>
      <ul>
        <li><strong>Naam:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Telefoon:</strong> ${phone}</li>
        <li><strong>Kenteken:</strong> ${kenteken}</li>
        <li><strong>Onderwerp:</strong> ${subject}</li>
      </ul>
      
      ${vehicleInfo}
      
      <h3>Bericht:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><small>Dit bericht is verzonden via het contactformulier op de AutoService Houte website.</small></p>
    `;
    
    // Email options
    const mailOptions = {
      from: emailUser || 'noreply@autoservicehoute.nl',
      to: 'hihibibihahahaha@gmail.com',
      subject: `Nieuwe aanvraag: ${subject} - ${kenteken}`,
      html: htmlContent,
      replyTo: email
    };
    
    // Send email or log if not configured
    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log('✓ Email sent successfully');
    } else {
      // If email not configured, just log the content
      console.log('\n=== EMAIL WOULD BE SENT ===');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Content:', htmlContent);
      console.log('===========================\n');
    }
    
    res.json({ 
      success: true, 
      message: 'Email succesvol verzonden' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Er is een fout opgetreden bij het verzenden van de email',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Email server is running',
    emailConfigured: !!transporter,
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'AutoService Houte API',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      '/api/health',
      '/api/appointments',
      '/api/workdays',
      '/api/emails',
      '/api/stats'
    ]
  });
});

// ============= APPOINTMENTS API =============

app.get('/api/appointments', (req, res) => {
  try {
    const appointments = db.getAllAppointments();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.get('/api/appointments/:id', (req, res) => {
  try {
    const appointment = db.getAppointmentById(req.params.id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

app.post('/api/appointments', (req, res) => {
  try {
    const success = db.createAppointment(req.body);
    if (success) {
      res.json({ success: true, message: 'Appointment created' });
    } else {
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

app.put('/api/appointments/:id', (req, res) => {
  try {
    const success = db.updateAppointment(req.params.id, req.body);
    if (success) {
      res.json({ success: true, message: 'Appointment updated' });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

app.delete('/api/appointments/:id', (req, res) => {
  try {
    const success = db.deleteAppointment(req.params.id);
    if (success) {
      res.json({ success: true, message: 'Appointment deleted' });
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// ============= WORK DAYS API =============

app.get('/api/workdays', (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const workDays = startDate && endDate 
      ? db.getWorkDaysByDateRange(startDate, endDate)
      : db.getAllWorkDays();
    res.json(workDays);
  } catch (error) {
    console.error('Error fetching work days:', error);
    res.status(500).json({ error: 'Failed to fetch work days' });
  }
});

app.post('/api/workdays', (req, res) => {
  try {
    const success = db.createWorkDay(req.body);
    if (success) {
      res.json({ success: true, message: 'Work day created' });
    } else {
      res.status(500).json({ error: 'Failed to create work day' });
    }
  } catch (error) {
    console.error('Error creating work day:', error);
    res.status(500).json({ error: 'Failed to create work day' });
  }
});

app.post('/api/workdays/bulk', (req, res) => {
  try {
    const success = db.createWorkDaysBulk(req.body.workDays);
    if (success) {
      res.json({ success: true, message: `${req.body.workDays.length} work days imported` });
    } else {
      res.status(500).json({ error: 'Failed to import work days' });
    }
  } catch (error) {
    console.error('Error importing work days:', error);
    res.status(500).json({ error: 'Failed to import work days' });
  }
});

app.delete('/api/workdays/:id', (req, res) => {
  try {
    const success = db.deleteWorkDay(req.params.id);
    if (success) {
      res.json({ success: true, message: 'Work day deleted' });
    } else {
      res.status(404).json({ error: 'Work day not found' });
    }
  } catch (error) {
    console.error('Error deleting work day:', error);
    res.status(500).json({ error: 'Failed to delete work day' });
  }
});

app.delete('/api/workdays', (req, res) => {
  try {
    const count = db.clearAllWorkDays();
    res.json({ success: true, message: `${count} work days cleared` });
  } catch (error) {
    console.error('Error clearing work days:', error);
    res.status(500).json({ error: 'Failed to clear work days' });
  }
});

// ============= EMAILS API =============

app.get('/api/emails', (req, res) => {
  try {
    const emails = db.getAllEmails();
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

app.get('/api/emails/:id', (req, res) => {
  try {
    const email = db.getEmailById(req.params.id);
    if (email) {
      res.json(email);
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ error: 'Failed to fetch email' });
  }
});

app.post('/api/emails', (req, res) => {
  try {
    const success = db.createEmail(req.body);
    if (success) {
      res.json({ success: true, message: 'Email saved' });
    } else {
      res.status(500).json({ error: 'Failed to save email' });
    }
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Failed to save email' });
  }
});

app.put('/api/emails/:id/read', (req, res) => {
  try {
    const success = db.markEmailAsRead(req.params.id);
    if (success) {
      res.json({ success: true, message: 'Email marked as read' });
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    console.error('Error marking email as read:', error);
    res.status(500).json({ error: 'Failed to mark email as read' });
  }
});

app.delete('/api/emails/:id', (req, res) => {
  try {
    const success = db.deleteEmail(req.params.id);
    if (success) {
      res.json({ success: true, message: 'Email deleted' });
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    console.error('Error deleting email:', error);
    res.status(500).json({ error: 'Failed to delete email' });
  }
});

// ============= STATS API =============

app.get('/api/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ============= VISITOR TRACKING API =============

// Active sessions in memory (for real-time tracking)
// Key: visitorId, Value: { sessionId, lastSeen, page, firstSeen, deviceInfo }
const activeSessions = new Map();

// Track new visitor
app.post('/api/visitors/track', (req, res) => {
  try {
    const { 
      page, 
      timestamp, 
      userAgent, 
      referrer,
      visitorId,
      sessionId,
      isNewSession,
      deviceType,
      deviceName,
      browser,
      os,
      screenResolution,
      viewport
    } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const now = new Date().toISOString();

    // If this is a new session, save to database
    if (isNewSession) {
      const success = db.createVisitorSession({
        sessionId,
        visitorId,
        page,
        userAgent,
        referrer,
        ipAddress,
        deviceType,
        deviceName,
        browser,
        os,
        screenResolution,
        viewport,
        firstSeen: now,
        lastSeen: now
      });

      if (!success) {
        return res.status(500).json({ error: 'Failed to track visitor' });
      }
    }

    // Update active sessions (use visitorId as key to prevent duplicates)
    activeSessions.set(visitorId, {
      sessionId,
      visitorId,
      lastSeen: new Date(),
      page,
      firstSeen: new Date(),
      deviceName: deviceName || 'Unknown',
      deviceType: deviceType || 'Unknown',
      browser: browser || 'Unknown',
      os: os || 'Unknown'
    });

    res.json({ success: true, visitorId, sessionId });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ error: 'Failed to track visitor' });
  }
});

// Heartbeat to keep session alive
app.post('/api/visitors/heartbeat', (req, res) => {
  try {
    const { visitorId, sessionId } = req.body;
    const now = new Date();

    // Update in-memory active sessions
    if (activeSessions.has(visitorId)) {
      const session = activeSessions.get(visitorId);
      const duration = Math.floor((now - session.firstSeen) / 1000);
      
      session.lastSeen = now;
      session.sessionId = sessionId; // Update in case session changed
      activeSessions.set(visitorId, session);

      // Update database
      db.updateVisitorSession(sessionId, now.toISOString(), duration);
    } else {
      // Session not in memory, but update database anyway
      db.updateVisitorSession(sessionId, now.toISOString(), 0);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating heartbeat:', error);
    res.status(500).json({ error: 'Failed to update heartbeat' });
  }
});

// Get visitor statistics
app.get('/api/visitors/stats', (req, res) => {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now - 86400000).toISOString().split('T')[0];

    // Clean up stale active sessions (older than 2 minutes)
    for (const [sessionId, session] of activeSessions.entries()) {
      if (now - session.lastSeen > 120000) {
        activeSessions.delete(sessionId);
      }
    }

    // Get stats from database
    const stats = db.getVisitorStats(today, yesterday);
    stats.activeVisitors = activeSessions.size;

    res.json(stats);
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    res.status(500).json({ error: 'Failed to fetch visitor stats' });
  }
});

// Get daily visitor statistics
app.get('/api/visitors/daily', (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const dailyStats = db.getDailyVisitorStats(days);
    res.json(dailyStats);
  } catch (error) {
    console.error('Error fetching daily stats:', error);
    res.status(500).json({ error: 'Failed to fetch daily stats' });
  }
});

// Cleanup old sessions (run periodically)
setInterval(() => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
    const deleted = db.cleanOldSessions(thirtyDaysAgo);
    if (deleted > 0) {
      console.log(`✓ Cleaned up ${deleted} old visitor sessions`);
    }
  } catch (error) {
    console.error('Error cleaning up old sessions:', error);
  }
}, 86400000); // Run once per day

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Server started successfully!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Listening on: 0.0.0.0:${PORT}`);
  console.log(`📧 Health check: /api/health`);
  console.log(`💾 Database: ${db.default ? 'Connected' : 'Not Connected'}\n`);
  
  if (!transporter) {
    console.log('⚠️  Email credentials not configured');
  } else {
    console.log('✅ Email transporter configured');
  }
});

