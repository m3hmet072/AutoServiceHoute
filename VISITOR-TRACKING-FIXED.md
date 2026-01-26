# Visitor Tracking System - Fixed ✅

## Problem
The visitor tracking system was counting each tab/refresh as a separate visitor because it was using `sessionStorage` which is per-tab, not per-browser.

## Solution Implemented

### 1. **Persistent Visitor ID** (localStorage)
- Each browser gets a unique `visitorId` stored in `localStorage`
- Format: `visitor_{timestamp}_{random}`
- Persists across tabs, refreshes, and browser restarts
- Only resets if user clears localStorage

### 2. **Session Management**
- **Session Timeout:** 30 minutes of inactivity
- **Session ID:** Generated when:
  - First visit
  - 30+ minutes since last activity
- **Activity Tracking:** Updates on:
  - Mouse clicks (`mousedown`)
  - Keyboard input (`keydown`)
  - Scrolling (`scroll`)
  - Touch events (`touchstart`)

### 3. **Database Schema**
```sql
visitor_sessions
  - id (auto-increment)
  - session_id (unique)
  - visitor_id (new!) - identifies unique visitors
  - page, user_agent, referrer, ip_address
  - device_type, device_name, browser, os
  - screen_resolution, viewport
  - first_seen, last_seen
  - session_duration (seconds)
```

### 4. **Statistics Calculations**

#### Live Visitors
- Counts unique `visitorId` in memory (activeSessions Map)
- Only one entry per visitor, regardless of tabs open
- Active = last heartbeat within 60 seconds

#### Today's Visitors
- `COUNT(DISTINCT visitor_id)` where `date(first_seen) = today`
- Same visitor opening multiple tabs = 1 visitor

#### Total Visitors (All Time)
- `COUNT(DISTINCT visitor_id)` from all sessions
- Unique count across entire database history

#### Total Sessions
- `COUNT(*)` of all sessions
- One visitor can have multiple sessions over time

#### Average Session Duration
- `AVG(session_duration)` from all completed sessions
- Calculated from first_seen to last_seen

### 5. **Heartbeat System**
- Sends heartbeat every 30 seconds
- Updates `last_seen` timestamp
- Calculates session duration
- Checks for session timeout (creates new session if needed)

## Files Changed

### Frontend
1. **landing-tracker.js**
   - Added `getVisitorId()` - localStorage management
   - Added `needsNewSession()` - checks 30min timeout
   - Added `getSessionId()` - session lifecycle
   - Added `updateLastActivity()` - tracks user interactions
   - Modified `initVisitorTracking()` - sends visitorId & sessionId

2. **api.js**
   - Updated `trackVisitor()` - includes visitorId, sessionId, isNewSession
   - Updated `sendHeartbeat()` - sends visitorId & sessionId

### Backend
3. **server.js**
   - Changed activeSessions Map key from `sessionId` to `visitorId`
   - Modified `/api/visitors/track` - handles visitorId & isNewSession
   - Modified `/api/visitors/heartbeat` - uses visitorId as key
   - Prevents duplicate active visitor counts

4. **database.js**
   - Added `visitor_id` column to schema
   - Updated `createVisitorSession()` - includes visitorId
   - Updated `getVisitorStats()` - counts DISTINCT visitor_id
   - Updated `getDailyVisitorStats()` - counts DISTINCT visitor_id

## How It Works Now

### First Visit
1. User opens website
2. `getVisitorId()` generates & stores visitorId in localStorage
3. `getSessionId()` creates new sessionId (30min timeout not reached)
4. Frontend sends: `{ visitorId, sessionId, isNewSession: true, deviceInfo }`
5. Backend saves to database & adds to activeSessions Map (key = visitorId)
6. ✅ Dashboard shows: **1 live visitor**

### Opening Multiple Tabs
1. User opens second tab
2. `getVisitorId()` retrieves **same** visitorId from localStorage
3. `getSessionId()` retrieves **same** sessionId (still active)
4. Frontend sends: `{ visitorId, sessionId, isNewSession: false }`
5. Backend updates existing entry in activeSessions Map (same key)
6. ✅ Dashboard still shows: **1 live visitor** (not 2!)

### After 30 Minutes Inactivity
1. User returns to website after 35 minutes
2. `needsNewSession()` returns true (last activity > 30min ago)
3. `getSessionId()` generates **new** sessionId
4. Frontend sends: `{ visitorId, sessionId: NEW, isNewSession: true }`
5. Backend creates new session in database (same visitor, new session)
6. ✅ Statistics: Same visitor, but now has 2 sessions total

### Daily Statistics
- **Unique Visitors Today:** Counts distinct visitor_id for today
- **Same visitor, multiple sessions:** Still counts as 1 unique visitor
- **Different days:** Same visitor on Monday & Tuesday = counted both days

## Migration Notes

For existing Railway database:
1. Run migration script: `node migrate-visitor-tracking.js`
2. Adds `visitor_id` column
3. Populates legacy sessions with `legacy_{session_id}` as visitor_id
4. Future visits will use proper localStorage-based visitor_id

## Testing

### Test 1: Multiple Tabs
1. Open website in Tab A → See "1 live visitor"
2. Open website in Tab B → Still "1 live visitor" ✅
3. Close both tabs → After 60 seconds, "0 live visitors" ✅

### Test 2: Refresh
1. Open website → "1 live visitor"
2. Refresh page → Still "1 live visitor" ✅
3. Not counted as new visitor ✅

### Test 3: Session Timeout
1. Open website → "1 live visitor", "1 session"
2. Wait 31 minutes (or close & reopen after 31 min)
3. Still "1 live visitor" today
4. Now "2 sessions" total ✅

### Test 4: Different Days
1. Visit on Monday → "1 unique visitor Monday"
2. Visit on Tuesday → "1 unique visitor Tuesday", "1 visitor all-time" ✅

## Benefits

✅ **Accurate Live Count:** One visitor = one count, regardless of tabs  
✅ **Persistent Tracking:** Survives page refreshes & browser restarts  
✅ **Session Analytics:** Tracks multiple sessions per visitor over time  
✅ **Privacy-Friendly:** No cookies, just localStorage (client-side only)  
✅ **Activity-Based:** Counts real engagement (mouse, keyboard, scroll)  
✅ **Automatic Cleanup:** Sessions older than 30 days are removed  

## Future Enhancements (Optional)

- **Returning Visitors:** Identify visitors who come back after days/weeks
- **Visitor Journey:** Track which pages each visitor views in sequence
- **Bounce Rate:** Calculate % of single-page sessions
- **Geographic Data:** Add country/city tracking (if needed)
- **Referrer Analytics:** Track where visitors come from (Google, direct, etc.)
