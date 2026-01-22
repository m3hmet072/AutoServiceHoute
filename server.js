import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
let transporter;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (emailUser && emailPass && emailUser !== 'your-email@gmail.com') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
  console.log('✓ Email transporter configured');
} else {
  console.log('⚠ Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
  console.log('  For now, emails will be logged to console only.');
}

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, kenteken, subject, message, vehicle } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !kenteken || !subject || !message) {
      return res.status(400).json({ error: 'Alle velden zijn verplicht' });
    }
    
    // Create email HTML content
    let vehicleInfo = '';
    if (vehicle) {
      vehicleInfo = `
        <h3>Voertuig Informatie:</h3>
        <ul>
          <li><strong>Merk:</strong> ${vehicle.merk || 'Onbekend'}</li>
          <li><strong>Model:</strong> ${vehicle.model || 'Onbekend'}</li>
          <li><strong>Datum eerste toelating:</strong> ${vehicle.datum_eerste_toelating || 'Onbekend'}</li>
        </ul>
      `;
    }
    
    const htmlContent = `
      <h2>Nieuwe contactaanvraag van AutoService Houte website</h2>
      
      <h3>Klant Gegevens:</h3>
      <ul>
        <li><strong>Naam:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Telefoon:</strong> ${phone}</li>
        <li><strong>Kenteken:</strong> ${kenteken}</li>
        <li><strong>Onderwerp:</strong> ${subject}</li>
      </ul>
      
      ${vehicleInfo}
      
      <h3>Bericht:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p><small>Dit bericht is verzonden via het contactformulier op de AutoService Houte website.</small></p>
    `;
    
    // Email options
    const mailOptions = {
      from: emailUser || 'noreply@autoservicehoute.nl',
      to: 'hihibibihahahaha@gmail.com',
      subject: `Nieuwe aanvraag: ${subject} - ${kenteken}`,
      html: htmlContent,
      replyTo: email
    };
    
    // Send email or log if not configured
    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log('✓ Email sent successfully');
    } else {
      // If email not configured, just log the content
      console.log('\n=== EMAIL WOULD BE SENT ===');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Content:', htmlContent);
      console.log('===========================\n');
    }
    
    res.json({ 
      success: true, 
      message: 'Email succesvol verzonden' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Er is een fout opgetreden bij het verzenden van de email',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Email server is running',
    emailConfigured: !!transporter
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Email server running on http://localhost:${PORT}`);
  console.log('📧 Health check: http://localhost:${PORT}/api/health\n');
  
  if (!transporter) {
    console.log('💡 To enable email sending:');
    console.log('   1. Create a .env file (copy from .env.example)');
    console.log('   2. Add your Gmail credentials');
    console.log('   3. Restart the server\n');
  }
});

