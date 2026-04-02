# Supabase Migration Setup (Step by Step)

## 1) Create a Supabase project
1. Go to https://supabase.com and create a new project.
2. Wait until the database is ready.
3. Open **Project Settings → API** and copy:
   - `Project URL`
   - `anon public key`

## 2) Create the database tables
1. In Supabase dashboard, open **SQL Editor**.
2. Paste everything from [supabase/schema.sql](supabase/schema.sql).
3. Run the query.

## 3) Configure environment variables
Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_GARAGE_UUID=YOUR_GARAGE_UUID
```

For production (your host/build pipeline), set the same three variables there.

## 4) Install dependencies
Run:

```bash
npm install
```

## 5) Run locally
Run:

```bash
npm run dev
```

Open the site and test:
- Contact form submit
- Dashboard appointments load
- Dashboard emails load
- Visitor tracking counters

## 6) Deploy
1. Build:

```bash
npm run build
```

2. Deploy updated `docs/` as usual.

## 7) (Optional) Import old SQLite data
If you still have your old SQLite file, export data and import into Supabase tables:
- `appointments`
- `emails`
- `work_days`
- `visitor_sessions`

You can use CSV import from Supabase Table Editor.

## Notes
- The app now reads/writes directly to Supabase from the frontend via `src/js/api.js`.
- `server.js` / Railway is no longer required for website data APIs.
- Current RLS policies in [supabase/schema.sql](supabase/schema.sql) allow full anon access (same behavior as your old public API). Tighten policies later if you add admin auth.
