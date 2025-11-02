import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_deewan_hotel'; // Replace with actual service ID
const EMAILJS_TEMPLATE_ID = 'template_booking_inquiry'; // Replace with actual template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with actual public key

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface BookingInquiry {
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  roomType: string;
  specialRequests: string;
}

export interface GeneralInquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Send booking inquiry email to hotel management
 */
export const sendBookingInquiry = async (inquiryData: BookingInquiry): Promise<EmailResponse> => {
  try {
    // Format the inquiry data for email template
    const templateParams = {
      to_email: 'thedeewanhotel@gmail.com',
      from_name: inquiryData.name,
      from_email: inquiryData.email,
      phone: inquiryData.phone,
      check_in: inquiryData.checkIn,
      check_out: inquiryData.checkOut,
      guests: inquiryData.guests.toString(),
      room_type: inquiryData.roomType || 'Any Room Type',
      special_requests: inquiryData.specialRequests || 'None',
      inquiry_date: new Date().toLocaleDateString(),
      inquiry_time: new Date().toLocaleTimeString(),
      subject: `New Booking Inquiry from ${inquiryData.name}`,
      message: `
        New booking inquiry received:
        
        Guest Information:
        - Name: ${inquiryData.name}
        - Email: ${inquiryData.email}
        - Phone: ${inquiryData.phone}
        
        Booking Details:
        - Check-in: ${inquiryData.checkIn}
        - Check-out: ${inquiryData.checkOut}
        - Number of Guests: ${inquiryData.guests}
        - Room Preference: ${inquiryData.roomType || 'Any Room Type'}
        
        Special Requests:
        ${inquiryData.specialRequests || 'None'}
        
        Please respond to this inquiry promptly.
      `
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Your inquiry has been sent successfully! We will contact you within 24 hours.'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your inquiry. Please try calling us directly.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Send confirmation email to the guest
 */
export const sendGuestConfirmation = async (inquiryData: BookingInquiry): Promise<EmailResponse> => {
  try {
    const templateParams = {
      to_email: inquiryData.email,
      to_name: inquiryData.name,
      hotel_name: 'Deewan Residency',
      hotel_phone: '01762-506147',
      hotel_email: 'thedeewanhotel@gmail.com',
      check_in: inquiryData.checkIn,
      check_out: inquiryData.checkOut,
      guests: inquiryData.guests.toString(),
      room_type: inquiryData.roomType || 'Any Room Type',
      inquiry_date: new Date().toLocaleDateString(),
      subject: 'Booking Inquiry Confirmation - Deewan Residency',
      message: `
        Dear ${inquiryData.name},
        
        Thank you for your interest in Deewan Residency! We have received your booking inquiry with the following details:
        
        Booking Details:
        - Check-in: ${inquiryData.checkIn}
        - Check-out: ${inquiryData.checkOut}
        - Number of Guests: ${inquiryData.guests}
        - Room Preference: ${inquiryData.roomType || 'Any Room Type'}
        
        Our team will review your request and contact you within 24 hours with availability and pricing information.
        
        If you have any urgent questions, please feel free to call us at:
        - 01762-506147
        - 01762-506146
        
        We look forward to hosting you at Deewan Residency!
        
        Best regards,
        Deewan Residency Team
        Amb-Chd Highway, Derabassi, Mohali
      `
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_guest_confirmation', // Different template for guest confirmation
      templateParams
    );

    return {
      success: response.status === 200,
      message: response.status === 200 ? 'Confirmation sent' : 'Failed to send confirmation'
    };
  } catch (error) {
    console.error('Guest confirmation error:', error);
    return {
      success: false,
      message: 'Failed to send confirmation email',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Send general inquiry email to hotel management
 */
export const sendGeneralInquiry = async (inquiryData: GeneralInquiry): Promise<EmailResponse> => {
  try {
    // Format the inquiry data for email template
    const templateParams = {
      to_email: 'thedeewanhotel@gmail.com',
      from_name: inquiryData.name,
      from_email: inquiryData.email,
      phone: inquiryData.phone,
      subject: `General Inquiry: ${inquiryData.subject} - ${inquiryData.name}`,
      inquiry_subject: inquiryData.subject,
      inquiry_date: new Date().toLocaleDateString(),
      inquiry_time: new Date().toLocaleTimeString(),
      message: `
        New general inquiry received:
        
        Guest Information:
        - Name: ${inquiryData.name}
        - Email: ${inquiryData.email}
        - Phone: ${inquiryData.phone}
        
        Subject: ${inquiryData.subject}
        
        Message:
        ${inquiryData.message}
        
        Please respond to this inquiry promptly.
      `
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_general_inquiry', // Different template for general inquiries
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Your message has been sent successfully! We will get back to you within 24 hours.'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try calling us directly or sending an email.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validate EmailJS configuration
 */
export const validateEmailConfig = (): boolean => {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
};