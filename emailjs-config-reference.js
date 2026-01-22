// Quick EmailJS Configuration Reference

/*
STEP 1: Go to https://www.emailjs.com/ and sign up (FREE)

STEP 2: Add Gmail Service
- Dashboard → Add New Service → Gmail
- Connect with: hihibibihahahaha@gmail.com
- Copy your SERVICE_ID (e.g., service_abc123)

STEP 3: Create Email Template
- Dashboard → Templates → Create New Template
- Name: "AutoService Contact"
- To Email: {{to_email}}
- Subject: Nieuwe aanvraag: {{subject}} - {{kenteken}}
- Content (use this template):

---START TEMPLATE---
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
---END TEMPLATE---

- Copy your TEMPLATE_ID (e.g., template_xyz789)

STEP 4: Get Public Key
- Dashboard → Account → Copy PUBLIC_KEY

STEP 5: Update contact-form.js with your keys:
*/

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';  // From Account page
const EMAILJS_SERVICE_ID = 'service_xxxxxxx';       // From Services page
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';     // From Templates page

/*
STEP 6: Save and test!
- The form will now send emails to hihibibihahahaha@gmail.com
- Free tier: 200 emails/month
- No backend server needed!

Full guide: See EMAILJS-SETUP.md
*/
