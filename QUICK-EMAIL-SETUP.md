# Quick Setup: Get Your Gmail App Password

## Steps to Enable Email Sending:

### 1. Go to Google Account Settings
Visit: https://myaccount.google.com/security

### 2. Enable 2-Step Verification (if not already enabled)
- Click on "2-Step Verification"
- Follow the setup process

### 3. Create App Password
- Go back to Security settings
- Click "App passwords" (under "2-Step Verification")
- Select "Mail" for app type
- Select "Other" for device and type: "AutoService Website"
- Click "Generate"
- **Copy the 16-character password** (looks like: abcd efgh ijkl mnop)

### 4. Update .env File
Open the `.env` file and replace `your-gmail-app-password-here` with the password you just copied:

```
EMAIL_USER=hihibibihahahaha@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

(Note: You can include or remove the spaces in the password)

### 5. Restart the Server
Stop the current server (Ctrl+C in terminal) and run:
```bash
npm start
```

### 6. Test It!
- Go to http://localhost:5174/AutoServiceHoute/
- Fill in the contact form with a valid kenteken (e.g., 68-BB-ZB)
- Submit the form
- Check hihibibihahahaha@gmail.com inbox!

---

**Important:** 
- Keep your App Password secret
- Never share your .env file
- The password is only for this specific app
