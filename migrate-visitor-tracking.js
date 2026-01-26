import Database from 'better-sqlite3';

const db = new Database('./autoservice.db');

console.log('Starting migration: Adding visitor_id to visitor_sessions table...');

try {
  // Check if visitor_id column exists
  const tableInfo = db.prepare("PRAGMA table_info(visitor_sessions)").all();
  const hasVisitorId = tableInfo.some(col => col.name === 'visitor_id');
  
  if (!hasVisitorId) {
    console.log('Adding visitor_id column...');
    db.exec(`ALTER TABLE visitor_sessions ADD COLUMN visitor_id TEXT`);
    
    // Generate visitor_id for existing sessions based on IP or session_id
    console.log('Generating visitor_id for existing sessions...');
    db.exec(`
      UPDATE visitor_sessions 
      SET visitor_id = 'legacy_' || session_id 
      WHERE visitor_id IS NULL
    `);
    
    console.log('✓ Migration completed successfully!');
  } else {
    console.log('✓ visitor_id column already exists, no migration needed.');
  }
  
  // Show stats
  const stats = db.prepare(`
    SELECT 
      COUNT(*) as total_sessions,
      COUNT(DISTINCT visitor_id) as unique_visitors
    FROM visitor_sessions
  `).get();
  
  console.log(`\nDatabase stats:`);
  console.log(`  Total sessions: ${stats.total_sessions}`);
  console.log(`  Unique visitors: ${stats.unique_visitors}`);
  
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}

db.close();
