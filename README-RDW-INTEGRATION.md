# AutoService Houte - RDW API & Email Integration

## Features

✅ **RDW API Integration**: Validates Dutch license plates (kenteken) in real-time using the official RDW Open Data API
✅ **Vehicle Information Display**: Shows vehicle details (brand, model, year) after validation
✅ **Email Notifications**: Sends form submissions to hihibibihahahaha@gmail.com
✅ **Form Validation**: Ensures kenteken is registered before allowing submission

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Gmail credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

**Important for Gmail users:**
- You need to use a Gmail App Password, not your regular password
- Enable 2-Factor Authentication on your Google account
- Generate an App Password: https://support.google.com/accounts/answer/185833
- Use the generated 16-character password in the .env file

### 3. Run the Application

Start both the Vite dev server and the email backend:

```bash
npm start
```

Or run them separately:

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend email server
npm run server
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## How It Works

### RDW API Integration

1. User enters a kenteken (license plate) in the contact form
2. The app validates it against the RDW Open Data API: https://opendata.rdw.nl
3. If valid, vehicle information is displayed (brand, model, registration date)
4. Form can only be submitted with a valid kenteken

### Email Flow

1. User fills in the contact form with all required fields
2. Kenteken is validated via RDW API
3. On submit, data is sent to the backend server (port 3001)
4. Backend uses Nodemailer to send email to hihibibihahahaha@gmail.com
5. User receives confirmation

## API Endpoints

### Backend API

- `POST /api/send-email` - Send contact form email
- `GET /api/health` - Health check endpoint

### RDW Open Data API

- Used: `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken={KENTEKEN}`
- Documentation: https://opendata.rdw.nl

## Files Changed/Added

### Modified Files
- `index.html` - Updated contact form with kenteken field
- `src/js/main.js` - Added contact form initialization
- `package.json` - Added dependencies

### New Files
- `src/js/contact-form.js` - RDW API integration and form handling
- `src/css/pages/contact.css` - Styling for kenteken validation
- `server.js` - Express backend for email sending
- `.env.example` - Environment variables template

## Testing

### Test with Real Kentekens

Try these valid Dutch license plates:
- `68-BB-ZB`
- `KG-684-D`
- `RT-365-R`

The RDW API will return real vehicle information for valid plates.

## Troubleshooting

### Email not sending
- Check your `.env` file has correct credentials
- Verify Gmail App Password is configured correctly
- Check backend server is running on port 3001
- Look at console logs for error messages

### RDW API not working
- Check internet connection
- Verify kenteken format (should be valid Dutch license plate)
- Check browser console for CORS or network errors

### CORS Issues
- Backend includes CORS middleware for localhost
- For production, update CORS settings in `server.js`

## Production Deployment

For production:
1. Update CORS settings in `server.js` to allow your production domain
2. Change API endpoint in `contact-form.js` from localhost to your production URL
3. Use environment variables for sensitive data
4. Consider using a dedicated email service (SendGrid, AWS SES, etc.) instead of Gmail

## Support

For issues or questions, contact AutoService Houte at:
- Email: Autoservicehoute@gmail.com
- Phone: +31 6 11023141
