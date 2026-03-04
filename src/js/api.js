import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
let hasWarnedAboutMissingSupabase = false;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

function getSupabaseClientOptional() {
  if (!supabase) {
    if (!hasWarnedAboutMissingSupabase) {
      console.warn('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable persistence.');
      hasWarnedAboutMissingSupabase = true;
    }
    return null;
  }
  return supabase;
}

function toUtcIso(value = new Date()) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function toDateKey(value) {
  return new Date(value).toISOString().split('T')[0];
}

// ============= APPOINTMENTS API =============

export async function fetchAppointments() {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('appointments')
    .select('*')
    .order('date', { ascending: false })
    .order('time', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchAppointmentById(id) {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('appointments')
    .select('*')
    .eq('id', String(id))
    .single();

  if (error) throw error;
  return data;
}

export async function createAppointment(appointment) {
  const client = getSupabaseClient();
  const payload = {
    id: String(appointment.id),
    name: appointment.name || 'Niet opgegeven',
    email: appointment.email || 'Niet opgegeven',
    phone: appointment.phone || '',
    kenteken: appointment.kenteken || '',
    service: appointment.service || '',
    date: appointment.date,
    time: appointment.time,
    status: appointment.status || 'pending',
    notes: appointment.notes || '',
    created_from: appointment.createdFrom || null,
    email_id: appointment.emailId || null
  };

  const { data, error } = await client
    .from('appointments')
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updateAppointment(id, updates) {
  const client = getSupabaseClient();
  const payload = { ...updates };

  if (payload.createdFrom !== undefined) {
    payload.created_from = payload.createdFrom;
    delete payload.createdFrom;
  }

  if (payload.emailId !== undefined) {
    payload.email_id = payload.emailId;
    delete payload.emailId;
  }

  const { data, error } = await client
    .from('appointments')
    .update(payload)
    .eq('id', String(id))
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAppointment(id) {
  const client = getSupabaseClient();
  const { error } = await client
    .from('appointments')
    .delete()
    .eq('id', String(id));

  if (error) throw error;
  return { success: true };
}

// ============= WORK DAYS API =============

export async function fetchWorkDays(startDate = null, endDate = null) {
  const client = getSupabaseClient();
  let query = client
    .from('work_days')
    .select('*')
    .order('date', { ascending: true });

  if (startDate && endDate) {
    query = query.gte('date', startDate).lte('date', endDate);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createWorkDay(workDay) {
  const client = getSupabaseClient();
  const payload = {
    date: workDay.date,
    shift: workDay.shift,
    start_time: workDay.startTime || workDay.start_time || '',
    end_time: workDay.endTime || workDay.end_time || ''
  };

  const { data, error } = await client
    .from('work_days')
    .upsert(payload, { onConflict: 'date,shift' })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function importWorkDaysBulk(workDays) {
  const client = getSupabaseClient();
  const payload = (workDays || []).map((workDay) => ({
    date: workDay.date,
    shift: workDay.shift,
    start_time: workDay.startTime || workDay.start_time || '',
    end_time: workDay.endTime || workDay.end_time || ''
  }));

  if (payload.length === 0) {
    return { success: true, imported: 0 };
  }

  const { error } = await client
    .from('work_days')
    .upsert(payload, { onConflict: 'date,shift' });

  if (error) throw error;
  return { success: true, imported: payload.length };
}

export async function deleteWorkDay(id) {
  const client = getSupabaseClient();
  const { error } = await client
    .from('work_days')
    .delete()
    .eq('id', Number(id));

  if (error) throw error;
  return { success: true };
}

export async function clearAllWorkDays() {
  const client = getSupabaseClient();
  const { error } = await client
    .from('work_days')
    .delete()
    .not('id', 'is', null);

  if (error) throw error;
  return { success: true };
}

// ============= EMAILS API =============

export async function fetchEmails() {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('emails')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchEmailById(id) {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('emails')
    .select('*')
    .eq('id', String(id))
    .single();

  if (error) throw error;
  return data;
}

export async function createEmail(email) {
  const client = getSupabaseClient();
  let vehicleInfoValue = null;

  if (typeof email.vehicleInfo === 'string') {
    vehicleInfoValue = email.vehicleInfo;
  } else if (email.vehicleInfo && typeof email.vehicleInfo === 'object') {
    vehicleInfoValue = JSON.stringify(email.vehicleInfo);
  }

  const payload = {
    id: String(email.id),
    name: email.name || 'Niet opgegeven',
    email: email.email || 'Niet opgegeven',
    phone: email.phone || '',
    kenteken: email.kenteken || '',
    subject: email.subject || '',
    message: email.message || '',
    vehicle_info: vehicleInfoValue,
    read: !!email.read
  };

  const { data, error } = await client
    .from('emails')
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function markEmailAsRead(id) {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('emails')
    .update({ read: true })
    .eq('id', String(id))
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEmail(id) {
  const client = getSupabaseClient();
  const { error } = await client
    .from('emails')
    .delete()
    .eq('id', String(id));

  if (error) throw error;
  return { success: true };
}

// ============= STATS API =============

export async function fetchStats() {
  const client = getSupabaseClient();

  const [{ count: totalAppointments, error: appointmentsError },
    { count: completedAppointments, error: completedError },
    { count: totalEmails, error: totalEmailsError },
    { count: unreadEmails, error: unreadEmailsError }] = await Promise.all([
    client.from('appointments').select('*', { count: 'exact', head: true }),
    client.from('appointments').select('*', { count: 'exact', head: true }).in('status', ['afgerond', 'completed']),
    client.from('emails').select('*', { count: 'exact', head: true }),
    client.from('emails').select('*', { count: 'exact', head: true }).eq('read', false)
  ]);

  if (appointmentsError || completedError || totalEmailsError || unreadEmailsError) {
    throw appointmentsError || completedError || totalEmailsError || unreadEmailsError;
  }

  return {
    totalAppointments: totalAppointments || 0,
    completedAppointments: completedAppointments || 0,
    totalEmails: totalEmails || 0,
    unreadEmails: unreadEmails || 0
  };
}

// ============= VISITOR TRACKING API =============

export async function trackVisitor(deviceInfo) {
  const client = getSupabaseClientOptional();
  if (!client) {
    return {
      success: false,
      skipped: true,
      reason: 'supabase_not_configured',
      visitorId: deviceInfo?.visitorId,
      sessionId: deviceInfo?.sessionId
    };
  }

  const now = toUtcIso();

  const sessionId = deviceInfo?.sessionId;
  const visitorId = deviceInfo?.visitorId || `legacy_${sessionId}`;

  if (!sessionId) {
    return {
      success: false,
      skipped: true,
      reason: 'missing_session_id',
      visitorId,
      sessionId: null
    };
  }

  const { data: existingSession, error: existingSessionError } = await client
    .from('visitor_sessions')
    .select('session_id, first_seen')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (existingSessionError) {
    throw existingSessionError;
  }

  if (!existingSession) {
    const payload = {
      session_id: sessionId,
      visitor_id: visitorId,
      page: window.location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      ip_address: null,
      device_type: deviceInfo?.deviceType || null,
      device_name: deviceInfo?.deviceName || null,
      browser: deviceInfo?.browser || null,
      os: deviceInfo?.os || null,
      screen_resolution: deviceInfo?.screenResolution || null,
      viewport: deviceInfo?.viewport || null,
      first_seen: now,
      last_seen: now,
      session_duration: 0
    };

    const { error: insertError } = await client.from('visitor_sessions').insert(payload);
    if (insertError && insertError.code !== '23505') {
      throw insertError;
    }
  } else {
    const { error: updateError } = await client
      .from('visitor_sessions')
      .update({
        visitor_id: visitorId,
        page: window.location.pathname,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        device_type: deviceInfo?.deviceType || null,
        device_name: deviceInfo?.deviceName || null,
        browser: deviceInfo?.browser || null,
        os: deviceInfo?.os || null,
        screen_resolution: deviceInfo?.screenResolution || null,
        viewport: deviceInfo?.viewport || null,
        last_seen: now
      })
      .eq('session_id', sessionId);

    if (updateError) {
      throw updateError;
    }
  }

  return {
    success: true,
    visitorId,
    sessionId
  };
}

export async function sendHeartbeat(visitorId, sessionId) {
  const client = getSupabaseClientOptional();
  if (!client) {
    return { success: false, skipped: true, reason: 'supabase_not_configured' };
  }

  const now = new Date();
  const nowIso = now.toISOString();

  if (!sessionId) {
    return { success: false, skipped: true, reason: 'missing_session_id' };
  }

  const { data: existing, error: fetchError } = await client
    .from('visitor_sessions')
    .select('first_seen')
    .eq('session_id', sessionId)
    .single();

  if (fetchError) throw fetchError;

  if (!existing) {
    const { error: insertError } = await client
      .from('visitor_sessions')
      .insert({
        session_id: sessionId,
        visitor_id: visitorId || `legacy_${sessionId}`,
        page: window.location.pathname,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        first_seen: nowIso,
        last_seen: nowIso,
        session_duration: 0
      });

    if (insertError && insertError.code !== '23505') {
      throw insertError;
    }

    return { success: true };
  }

  const startedAt = new Date(existing.first_seen);
  const duration = Math.max(0, Math.floor((now.getTime() - startedAt.getTime()) / 1000));

  const { error } = await client
    .from('visitor_sessions')
    .update({
      last_seen: nowIso,
      session_duration: duration,
      visitor_id: visitorId
    })
    .eq('session_id', sessionId);

  if (error) throw error;
  return { success: true };
}

export async function fetchVisitorStats(startDate = null, endDate = null) {
  const client = getSupabaseClientOptional();
  if (!client) {
    return {
      todayVisitors: 0,
      yesterdayVisitors: 0,
      totalVisitors: 0,
      totalSessions: 0,
      avgSessionDuration: 0,
      activeVisitors: 0
    };
  }

  const now = new Date();
  const todayDate = toDateKey(now);
  const yesterdayDateObj = new Date(now);
  yesterdayDateObj.setDate(yesterdayDateObj.getDate() - 1);
  const yesterdayDate = toDateKey(yesterdayDateObj);
  const rangeStart = startDate || yesterdayDate;
  const rangeEnd = endDate || todayDate;

  const [{ data: periodRows, error: periodError },
    { data: totalRows, error: totalError },
    { data: activeRows, error: activeError }] = await Promise.all([
    client
      .from('visitor_sessions')
      .select('visitor_id,session_id,session_duration,first_seen')
      .gte('first_seen', `${rangeStart}T00:00:00.000Z`)
      .lte('first_seen', `${rangeEnd}T23:59:59.999Z`),
    client
      .from('visitor_sessions')
      .select('visitor_id,session_id'),
    client
      .from('visitor_sessions')
      .select('visitor_id,last_seen')
      .gte('last_seen', new Date(Date.now() - 120000).toISOString())
  ]);

  if (periodError || totalError || activeError) {
    throw periodError || totalError || activeError;
  }

  const todaySet = new Set();
  const yesterdaySet = new Set();
  const durations = [];

  (periodRows || []).forEach((row) => {
    const key = row.visitor_id || row.session_id;
    const dateKey = toDateKey(row.first_seen);
    if (dateKey === todayDate && key) todaySet.add(key);
    if (dateKey === yesterdayDate && key) yesterdaySet.add(key);
    if (row.session_duration && row.session_duration > 0) {
      durations.push(Number(row.session_duration));
    }
  });

  const totalVisitorSet = new Set(
    (totalRows || [])
      .map((row) => row.visitor_id || row.session_id)
      .filter(Boolean)
  );

  const avgSessionDuration = durations.length
    ? durations.reduce((sum, value) => sum + value, 0) / durations.length
    : 0;

  return {
    todayVisitors: todaySet.size,
    yesterdayVisitors: yesterdaySet.size,
    totalVisitors: totalVisitorSet.size,
    totalSessions: (totalRows || []).length,
    avgSessionDuration,
    activeVisitors: new Set((activeRows || []).map((row) => row.visitor_id || row.session_id).filter(Boolean)).size
  };
}

export async function fetchDailyVisitorStats(days = 30) {
  const client = getSupabaseClientOptional();
  if (!client) {
    return [];
  }

  const since = new Date();
  since.setDate(since.getDate() - Number(days || 30));

  const { data, error } = await client
    .from('visitor_sessions')
    .select('first_seen,visitor_id,session_id,session_duration')
    .gte('first_seen', since.toISOString())
    .order('first_seen', { ascending: true });

  if (error) throw error;

  const byDate = new Map();

  (data || []).forEach((row) => {
    const date = toDateKey(row.first_seen);
    if (!byDate.has(date)) {
      byDate.set(date, {
        date,
        visitorIds: new Set(),
        totalSessions: 0,
        totalDuration: 0,
        durationCount: 0
      });
    }

    const day = byDate.get(date);
    day.totalSessions += 1;
    day.visitorIds.add(row.visitor_id || row.session_id);

    if (row.session_duration && row.session_duration > 0) {
      day.totalDuration += Number(row.session_duration);
      day.durationCount += 1;
    }
  });

  return Array.from(byDate.values()).map((day) => ({
    date: day.date,
    uniqueVisitors: day.visitorIds.size,
    totalSessions: day.totalSessions,
    avgDuration: day.durationCount ? day.totalDuration / day.durationCount : 0
  }));
}
