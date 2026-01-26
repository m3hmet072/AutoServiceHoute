import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use persistent storage path if available (Railway volume), otherwise use local
const DB_PATH = process.env.DATABASE_PATH || join(__dirname, 'autoservice.db');

// Initialize database with error handling
let db;
try {
  db = new Database(DB_PATH);
  console.log('✓ SQLite database connected at:', DB_PATH);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
} catch (error) {
  console.error('Failed to initialize database:', error);
  throw error;
}

// Create tables
function initializeDatabase() {
  try {
    // Appointments table
    db.exec(`
      CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      kenteken TEXT NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Work days table (from ICS import)
  db.exec(`
    CREATE TABLE IF NOT EXISTS work_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      shift TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(date, shift)
    )
  `);

  // Emails table
  db.exec(`
    CREATE TABLE IF NOT EXISTS emails (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      kenteken TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      vehicle_info TEXT,
      read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Visitor sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS visitor_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      page TEXT NOT NULL,
      user_agent TEXT,
      referrer TEXT,
      ip_address TEXT,
      device_type TEXT,
      device_name TEXT,
      browser TEXT,
      os TEXT,
      screen_resolution TEXT,
      viewport TEXT,
      first_seen DATETIME NOT NULL,
      last_seen DATETIME NOT NULL,
      session_duration INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Daily visitor stats table (for faster queries)
  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_visitor_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE UNIQUE NOT NULL,
      unique_visitors INTEGER DEFAULT 0,
      total_sessions INTEGER DEFAULT 0,
      total_pageviews INTEGER DEFAULT 0,
      avg_session_duration REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for faster queries
  db.exec(`CREATE INDEX IF NOT EXISTS idx_visitor_sessions_date ON visitor_sessions(date(first_seen))`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_visitor_stats(date)`);

    console.log('✓ Database tables initialized');
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
    throw error;
  }
}

// Initialize on startup
try {
  initializeDatabase();
} catch (error) {
  console.error('Database initialization failed:', error.message);
  process.exit(1);
}

// ============= APPOINTMENTS CRUD =============

export function getAllAppointments() {
  const stmt = db.prepare('SELECT * FROM appointments ORDER BY date DESC, time DESC');
  return stmt.all();
}

export function getAppointmentById(id) {
  const stmt = db.prepare('SELECT * FROM appointments WHERE id = ?');
  return stmt.get(String(id));
}

export function createAppointment(appointment) {
  const stmt = db.prepare(`
    INSERT INTO appointments (id, name, email, phone, kenteken, service, date, time, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    String(appointment.id),
    appointment.name,
    appointment.email,
    appointment.phone,
    appointment.kenteken,
    appointment.service,
    appointment.date,
    appointment.time,
    appointment.status || 'pending',
    appointment.notes || ''
  );
  
  return result.changes > 0;
}

export function updateAppointment(id, updates) {
  const fields = [];
  const values = [];
  
  Object.keys(updates).forEach(key => {
    if (key !== 'id') {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    }
  });
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(String(id));
  
  const stmt = db.prepare(`
    UPDATE appointments 
    SET ${fields.join(', ')}
    WHERE id = ?
  `);
  
  const result = stmt.run(...values);
  return result.changes > 0;
}

export function deleteAppointment(id) {
  const stmt = db.prepare('DELETE FROM appointments WHERE id = ?');
  const result = stmt.run(String(id));
  return result.changes > 0;
}

// ============= WORK DAYS CRUD =============

export function getAllWorkDays() {
  const stmt = db.prepare('SELECT * FROM work_days ORDER BY date ASC');
  return stmt.all();
}

export function getWorkDaysByDateRange(startDate, endDate) {
  const stmt = db.prepare('SELECT * FROM work_days WHERE date BETWEEN ? AND ? ORDER BY date ASC');
  return stmt.all(startDate, endDate);
}

export function createWorkDay(workDay) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO work_days (date, shift, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    workDay.date,
    workDay.shift,
    workDay.startTime,
    workDay.endTime
  );
  
  return result.changes > 0;
}

export function createWorkDaysBulk(workDays) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO work_days (date, shift, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `);
  
  const insertMany = db.transaction((workDays) => {
    for (const wd of workDays) {
      stmt.run(wd.date, wd.shift, wd.startTime, wd.endTime);
    }
  });
  
  insertMany(workDays);
  return true;
}

export function deleteWorkDay(id) {
  const stmt = db.prepare('DELETE FROM work_days WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function clearAllWorkDays() {
  const stmt = db.prepare('DELETE FROM work_days');
  const result = stmt.run();
  return result.changes;
}

// ============= EMAILS CRUD =============

export function getAllEmails() {
  const stmt = db.prepare('SELECT * FROM emails ORDER BY created_at DESC');
  return stmt.all();
}

export function getEmailById(id) {
  const stmt = db.prepare('SELECT * FROM emails WHERE id = ?');
  return stmt.get(String(id));
}

export function createEmail(email) {
  const stmt = db.prepare(`
    INSERT INTO emails (id, name, email, phone, kenteken, subject, message, vehicle_info, read)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    String(email.id),
    email.name,
    email.email,
    email.phone,
    email.kenteken,
    email.subject,
    email.message,
    email.vehicleInfo ? JSON.stringify(email.vehicleInfo) : null,
    email.read ? 1 : 0
  );
  
  return result.changes > 0;
}

export function markEmailAsRead(id) {
  const stmt = db.prepare('UPDATE emails SET read = 1 WHERE id = ?');
  const result = stmt.run(String(id));
  return result.changes > 0;
}

export function deleteEmail(id) {
  const stmt = db.prepare('DELETE FROM emails WHERE id = ?');
  const result = stmt.run(String(id));
  return result.changes > 0;
}

// ============= STATS =============

export function getStats() {
  const totalAppointments = db.prepare('SELECT COUNT(*) as count FROM appointments').get().count;
  const completedAppointments = db.prepare('SELECT COUNT(*) as count FROM appointments WHERE status = ?').get('completed').count;
  const totalEmails = db.prepare('SELECT COUNT(*) as count FROM emails').get().count;
  const unreadEmails = db.prepare('SELECT COUNT(*) as count FROM emails WHERE read = 0').get().count;
  
  return {
    totalAppointments,
    completedAppointments,
    totalEmails,
    unreadEmails
  };
}

// ============= VISITOR TRACKING =============

export function createVisitorSession(session) {
  const stmt = db.prepare(`
    INSERT INTO visitor_sessions 
    (session_id, page, user_agent, referrer, ip_address, device_type, device_name, 
     browser, os, screen_resolution, viewport, first_seen, last_seen)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    session.sessionId,
    session.page,
    session.userAgent,
    session.referrer,
    session.ipAddress,
    session.deviceType,
    session.deviceName,
    session.browser,
    session.os,
    session.screenResolution,
    session.viewport,
    session.firstSeen,
    session.lastSeen
  );
  
  return result.changes > 0;
}

export function updateVisitorSession(sessionId, lastSeen, duration) {
  const stmt = db.prepare(`
    UPDATE visitor_sessions 
    SET last_seen = ?, session_duration = ? 
    WHERE session_id = ?
  `);
  
  const result = stmt.run(lastSeen, duration, sessionId);
  return result.changes > 0;
}

export function getVisitorStats(today, yesterday) {
  const todayVisitors = db.prepare(`
    SELECT COUNT(DISTINCT session_id) as count 
    FROM visitor_sessions 
    WHERE date(first_seen) = ?
  `).get(today).count;
  
  const yesterdayVisitors = db.prepare(`
    SELECT COUNT(DISTINCT session_id) as count 
    FROM visitor_sessions 
    WHERE date(first_seen) = ?
  `).get(yesterday).count;
  
  const totalVisitors = db.prepare(`
    SELECT COUNT(DISTINCT session_id) as count 
    FROM visitor_sessions
  `).get().count;
  
  const totalSessions = db.prepare(`
    SELECT COUNT(*) as count 
    FROM visitor_sessions
  `).get().count;
  
  const avgDuration = db.prepare(`
    SELECT AVG(session_duration) as avg 
    FROM visitor_sessions 
    WHERE session_duration > 0
  `).get().avg || 0;
  
  return {
    todayVisitors,
    yesterdayVisitors,
    totalVisitors,
    totalSessions,
    avgSessionDuration: avgDuration
  };
}

export function getDailyVisitorStats(days) {
  const stmt = db.prepare(`
    SELECT 
      date(first_seen) as date,
      COUNT(DISTINCT session_id) as uniqueVisitors,
      COUNT(*) as totalSessions,
      AVG(session_duration) as avgDuration
    FROM visitor_sessions
    WHERE date(first_seen) >= date('now', '-' || ? || ' days')
    GROUP BY date(first_seen)
    ORDER BY date(first_seen) ASC
  `);
  
  return stmt.all(days);
}

export function cleanOldSessions(daysAgo) {
  const stmt = db.prepare('DELETE FROM visitor_sessions WHERE first_seen < ?');
  const result = stmt.run(daysAgo);
  return result.changes;
}

export function getDeviceStats() {
  const stmt = db.prepare(`
    SELECT 
      device_type,
      device_name,
      COUNT(*) as count,
      MAX(last_seen) as last_seen
    FROM visitor_sessions
    WHERE date(first_seen) >= date('now', '-30 days')
    GROUP BY device_type, device_name
    ORDER BY count DESC
    LIMIT 20
  `);
  
  return stmt.all();
}

export function getActiveVisitors(sessionIds) {
  if (!sessionIds || sessionIds.length === 0) return [];
  
  const placeholders = sessionIds.map(() => '?').join(',');
  const stmt = db.prepare(`
    SELECT 
      session_id,
      device_name,
      device_type,
      browser,
      os,
      page,
      first_seen,
      last_seen
    FROM visitor_sessions
    WHERE session_id IN (${placeholders})
    ORDER BY last_seen DESC
  `);
  
  return stmt.all(...sessionIds);
}

export default db;
