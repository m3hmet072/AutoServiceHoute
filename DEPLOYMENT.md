# Railway Deployment Guide

## Quick Deploy to Railway

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"

### Step 2: Deploy from GitHub
1. Click "Deploy from GitHub repo"
2. Select **m3hmet072/AutoServiceHoute**
3. Click "Deploy Now"

### Step 3: Configure Environment Variables
In Railway dashboard:
1. Go to your project → Variables tab
2. Add these variables:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASS`: your-app-password
   - `PORT`: 3001 (Railway sets this automatically, but you can verify)

### Step 4: Configure Domain
1. Go to Settings tab
2. Click "Generate Domain" to get a free railway.app URL
3. Copy the URL (e.g., `autoservicehoute-production.up.railway.app`)

### Step 5: Update API Endpoint
1. Open `src/js/api.js`
2. Update the API_BASE_URL to use your Railway domain:
   ```javascript
   const API_BASE_URL = 'https://your-app-name.up.railway.app/api';
   ```
3. Commit and push changes

### Step 6: Build Frontend
```bash
npm run build
git add docs/
git commit -m "Update build with Railway API endpoint"
git push origin main
```

Your app will be live at:
- **Frontend**: https://m3hmet072.github.io/AutoServiceHoute/
- **Backend API**: https://your-app-name.up.railway.app
- **Dashboard**: https://m3hmet072.github.io/AutoServiceHoute/dashboard.html

## Alternative: Render.com Deployment

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign in with GitHub

### Step 2: New Web Service
1. Click "New +" → "Web Service"
2. Connect GitHub repository: **m3hmet072/AutoServiceHoute**
3. Configure:
   - **Name**: autoservicehoute
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

### Step 3: Environment Variables
Add in Render dashboard:
- `EMAIL_USER`
- `EMAIL_PASS`

### Step 4: Deploy
Render will automatically deploy. You'll get a URL like:
`https://autoservicehoute.onrender.com`

### Step 5: Update API Endpoint
Update `src/js/api.js` with your Render URL and rebuild.

## Testing Your Deployment

1. **Check API Health**:
   ```
   https://your-app.railway.app/api/health
   ```

2. **Test from Different Device**:
   - Open dashboard on your phone
   - Create an appointment
   - Check on computer - should see the same data!

3. **Verify Database Persistence**:
   - Create appointments
   - Wait 5 minutes
   - Refresh page - data should still be there

## Database Persistence on Railway

Railway provides persistent volumes automatically. Your SQLite database will persist across deployments.

## Cost

**Railway Free Tier**:
- $5 credit per month (usually enough for small apps)
- No credit card required initially

**Render Free Tier**:
- Completely free
- Spins down after 15 min of inactivity
- Wakes up on request (may take 30-60 seconds)

## Troubleshooting

### API Not Connecting
Check CORS settings in `server.js` - should allow your GitHub Pages domain:
```javascript
app.use(cors({
  origin: ['https://m3hmet072.github.io', 'http://localhost:5173']
}));
```

### Database Not Saving
Check Railway logs for errors:
```bash
railway logs
```

### Email Not Sending
Verify environment variables are set in Railway dashboard.

## Next Steps

Once deployed, your dashboard will work from:
- ✅ Any device
- ✅ Any location
- ✅ Any network
- ✅ Shared access for your dad's computer and yours
