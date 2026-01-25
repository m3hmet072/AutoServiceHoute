# Database Setup - AutoService Houte

## Overview
The application uses **SQLite** (via better-sqlite3) for data persistence, storing:
- **Appointments**: Customer appointments with status tracking
- **Work Days**: Imported ICS calendar data for work schedules
- **Emails**: Contact form submissions

## Database File
- Location: `/autoservice.db`
- Automatically created on first server start
- Backed up by `.gitignore` (not committed to version control)

## Schema

### Appointments Table
```sql
CREATE TABLE appointments (
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
```

### Work Days Table
```sql
CREATE TABLE work_days (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  shift TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, shift)
)
```

### Emails Table
```sql
CREATE TABLE emails (
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
```

## API Endpoints

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Work Days
- `GET /api/workdays?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` - Get work days (optional date range)
- `POST /api/workdays` - Create single work day
- `POST /api/workdays/bulk` - Import multiple work days from ICS
- `DELETE /api/workdays/:id` - Delete work day
- `DELETE /api/workdays` - Clear all work days

### Emails
- `GET /api/emails` - Get all emails
- `GET /api/emails/:id` - Get single email
- `POST /api/emails` - Save email
- `PUT /api/emails/:id/read` - Mark email as read
- `DELETE /api/emails/:id` - Delete email

### Stats
- `GET /api/stats` - Get dashboard statistics

## Usage

### Starting the Server
```bash
npm install
node server.js
```

Server runs on `http://localhost:3001`

### Frontend Integration
The dashboard automatically connects to the API via `/src/js/api.js`. It includes fallback to localStorage if the API is unavailable.

### Importing ICS Calendar
1. Navigate to Dashboard → Settings
2. Click "Kalender Importeren"
3. Select your `.ics` file
4. Work days are stored in the database and displayed on calendar

## Data Migration

### From localStorage to Database
On first load, the application will:
1. Try to fetch from API
2. Fall back to localStorage if API fails
3. Suggest migrating localStorage data to database

### Backup
```bash
# Backup database
cp autoservice.db autoservice_backup_$(date +%Y%m%d).db

# Restore database
cp autoservice_backup_YYYYMMDD.db autoservice.db
```

## Development

### Database Functions
All database operations are in `database.js`:
- Transaction support for bulk operations
- Automatic timestamp management
- Foreign key constraints enabled

### Adding New Tables
1. Add schema to `database.js` `initializeDatabase()`
2. Create CRUD functions
3. Add API endpoints to `server.js`
4. Create frontend functions in `src/js/api.js`
5. Update dashboard logic in `src/js/dashboard.js`

## Troubleshooting

### Database Locked
If you see "database is locked" errors:
```bash
# Kill any running processes
pkill -f "node.*server.js"

# Restart server
node server.js
```

### Reset Database
```bash
# Delete database file
rm autoservice.db

# Restart server (will recreate)
node server.js
```

### View Database Contents
```bash
sqlite3 autoservice.db
.tables
SELECT * FROM appointments;
.quit
```
