import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize database with error handling
let db;
try {
  db = new Database(join(__dirname, 'autoservice.db'));
  console.log('✓ SQLite database connected');
  
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
  return stmt.get(id);
}

export function createAppointment(appointment) {
  const stmt = db.prepare(`
    INSERT INTO appointments (id, name, email, phone, kenteken, service, date, time, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    appointment.id,
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
  values.push(id);
  
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
  const result = stmt.run(id);
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
  return stmt.get(id);
}

export function createEmail(email) {
  const stmt = db.prepare(`
    INSERT INTO emails (id, name, email, phone, kenteken, subject, message, vehicle_info, read)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    email.id,
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
  const result = stmt.run(id);
  return result.changes > 0;
}

export function deleteEmail(id) {
  const stmt = db.prepare('DELETE FROM emails WHERE id = ?');
  const result = stmt.run(id);
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

export default db;
