# EmailJS Configuration Setup

To enable email functionality for the booking inquiry form, you need to set up EmailJS:

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended for thedeewanhotel@gmail.com)
4. Follow the setup instructions for your provider
5. Note down the Service ID

## 3. Create Email Templates

### Template 1: Booking Inquiry (for hotel management)
1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template:

```
Subject: New Booking Inquiry from {{from_name}}

Dear Deewan Residency Team,

You have received a new booking inquiry:

Guest Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

Booking Details:
- Check-in Date: {{check_in}}
- Check-out Date: {{check_out}}
- Number of Guests: {{guests}}
- Room Preference: {{room_type}}

Special Requests:
{{special_requests}}

Inquiry submitted on: {{inquiry_date}} at {{inquiry_time}}

Please respond to this inquiry promptly.

Best regards,
Website Booking System
```

### Template 2: Guest Confirmation (optional)
1. Create another template for guest confirmation
2. Use this template:

```
Subject: Booking Inquiry Confirmation - Deewan Residency

Dear {{to_name}},

Thank you for your interest in Deewan Residency!

We have received your booking inquiry with the following details:
- Check-in: {{check_in}}
- Check-out: {{check_out}}
- Guests: {{guests}}
- Room Type: {{room_type}}

Our team will contact you within 24 hours with availability and pricing.

For urgent inquiries, call us at:
- 01762-506147
- 01762-506146

Best regards,
Deewan Residency Team
```

## 4. Update Configuration
1. Get your Public Key from EmailJS dashboard (Account > API Keys)
2. Update the following values in `src/utils/emailService.ts`:
   - `EMAILJS_SERVICE_ID`: Your service ID
   - `EMAILJS_TEMPLATE_ID`: Your booking inquiry template ID
   - `EMAILJS_PUBLIC_KEY`: Your public key

## 5. Test the Setup
1. Run the development server
2. Fill out the booking form on the homepage
3. Check if emails are received at thedeewanhotel@gmail.com
4. Verify the email format and content

## Security Notes
- Never commit your actual API keys to version control
- Consider using environment variables for production
- The public key is safe to use in frontend code
- EmailJS has rate limiting to prevent abuse

## Troubleshooting
- Check EmailJS dashboard for delivery status
- Verify email service configuration
- Ensure template variables match the code
- Check browser console for error messages