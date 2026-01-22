# Gmail Setup Guide for Email Functionality

## How to Configure Gmail to Send Emails

To send emails to hihibibihahahaha@gmail.com, you need to set up a Gmail account with an App Password.

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left menu
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the steps to enable 2-Step Verification

### Step 2: Generate an App Password

1. Go back to Security settings
2. Under "Signing in to Google", click "App passwords"
   - If you don't see this option, make sure 2-Step Verification is enabled
3. In the "Select app" dropdown, choose "Mail"
4. In the "Select device" dropdown, choose "Other (Custom name)"
5. Type "AutoService Houte Website" as the name
6. Click "Generate"
7. Google will display a 16-character password
8. **Copy this password** - you won't be able to see it again!

### Step 3: Configure Your Application

1. Open the `.env` file in the project root
2. Update the credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

**Important:**
- Use your full Gmail address for EMAIL_USER
- Use the 16-character App Password (with or without spaces) for EMAIL_PASS
- Never share these credentials or commit them to Git

### Step 4: Restart the Server

```bash
npm start
```

You should now see:
```
✓ Email transporter configured
🚀 Email server running on http://localhost:3001
```

### Step 5: Test the Email

1. Go to http://localhost:5174/AutoServiceHoute/
2. Fill in the contact form with a valid kenteken (e.g., `68-BB-ZB`)
3. Submit the form
4. Check the email inbox of hihibibihahahaha@gmail.com

## Alternative: Using a Different Email Service

If you don't want to use Gmail, you can modify `server.js` to use other services:

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### Custom SMTP Server
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled
- Check that the email address is correct

### Emails not arriving
- Check spam/junk folder
- Verify the recipient email (hihibibihahahaha@gmail.com) exists
- Check server logs for errors

### "Less secure app access" error
- This happens with old configurations
- Use App Passwords instead (as described above)
- Google discontinued "Less secure app access" in May 2022

## Security Notes

- Never commit `.env` file to Git (it's in `.gitignore`)
- Use different credentials for development and production
- Regularly rotate your App Passwords
- Consider using a dedicated email service (SendGrid, AWS SES) for production

## For Production

For a production environment, consider:
1. Using a professional email service (SendGrid, Mailgun, AWS SES)
2. Implementing rate limiting
3. Adding email queuing
4. Setting up email templates
5. Adding email logging and monitoring
