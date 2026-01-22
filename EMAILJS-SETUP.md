# EmailJS Setup Guide

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" (it's free - 200 emails/month)
3. Sign up with your email or Google account

## Step 2: Add Email Service

1. Go to https://dashboard.emailjs.com/admin
2. Click "Add New Service"
3. Choose "Gmail" as the service
4. Click "Connect Account" and sign in with **hihibibihahahaha@gmail.com**
5. Click "Create Service"
6. **Copy the Service ID** (looks like: service_xxxxxxx)

## Step 3: Create Email Template

1. Go to https://dashboard.emailjs.com/admin/templates
2. Click "Create New Template"
3. Set Template Name: "AutoService Contact Form"
4. Replace the content with this template:

```
Subject: Nieuwe aanvraag: {{subject}} - {{kenteken}}

Van: {{from_name}}
Email: {{from_email}}
Telefoon: {{phone}}
Kenteken: {{kenteken}}
Onderwerp: {{subject}}

Voertuig Informatie:
- Merk: {{vehicle_merk}}
- Model: {{vehicle_model}}
- Bouwjaar: {{vehicle_year}}

Bericht:
{{message}}

---
Dit bericht is verzonden via het contactformulier op de AutoService Houte website.
```

5. In "To Email" field, enter: `{{to_email}}`
6. Click "Save"
7. **Copy the Template ID** (looks like: template_xxxxxxx)

## Step 4: Get Your Public Key

1. Go to https://dashboard.emailjs.com/admin/account
2. Find "Public Key" section
3. **Copy your Public Key** (looks like: xxxxxxxxxxxxxxxxxx)

## Step 5: Update contact-form.js

Open `/workspaces/AutoServiceHoute/src/js/contact-form.js` and update these lines:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'service_xxxxxxx';
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';
```

Replace with your actual values from steps 2-4.

## Step 6: Test It!

1. Restart the dev server: `npm start`
2. Open http://localhost:5174/AutoServiceHoute/
3. Fill the contact form with a valid kenteken (e.g., 68-BB-ZB)
4. Submit the form
5. Check **hihibibihahahaha@gmail.com** inbox!

## Troubleshooting

### "EmailJS library not loaded"
- Make sure the EmailJS script is in your HTML `<head>` section
- Clear browser cache and reload

### Email not received
- Check EmailJS dashboard for usage limits
- Verify the Service ID, Template ID, and Public Key
- Check spam/junk folder
- Look at browser console for errors

### Template variables not working
- Make sure variable names match exactly: `{{from_name}}`, `{{kenteken}}`, etc.
- Variables are case-sensitive

## Benefits of EmailJS

✅ No backend server needed
✅ No Gmail App Password required
✅ Works directly from browser
✅ Free tier: 200 emails/month
✅ Easy to set up (5 minutes)
✅ Professional email templates
✅ Delivery tracking in dashboard

## Security Note

The Public Key is safe to expose in client-side code. EmailJS uses domain whitelisting and rate limiting to prevent abuse.
