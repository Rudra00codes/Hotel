import emailjs from '@emailjs/browser';

// EmailJS configuration - Use environment variables for security
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const HOTEL_EMAIL = import.meta.env.VITE_HOTEL_EMAIL || 'thedeewanhotel@gmail.com';

// Validate environment variables
if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
  console.error('EmailJS configuration is missing. Please check your environment variables.');
  console.error('Required variables: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY');
}

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

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
 * Validate EmailJS configuration
 */
export const validateEmailConfig = (): boolean => {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
};

/**
 * Send booking inquiry email to hotel management
 */
export const sendBookingInquiry = async (inquiryData: BookingInquiry): Promise<EmailResponse> => {
  try {
    if (!validateEmailConfig()) {
      throw new Error('EmailJS is not properly configured. Please check environment variables.');
    }

    const templateParams = {
      to_email: HOTEL_EMAIL,
      from_name: inquiryData.name,
      from_email: inquiryData.email,
      phone: inquiryData.phone,
      check_in: inquiryData.checkIn,
      check_out: inquiryData.checkOut,
      guests: inquiryData.guests.toString(),
      room_type: inquiryData.roomType,
      special_requests: inquiryData.specialRequests || 'None',
      inquiry_date: new Date().toLocaleDateString(),
      inquiry_time: new Date().toLocaleTimeString(),
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Booking inquiry sent successfully! We will contact you soon.',
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Failed to send booking inquiry. Please try again or contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Send confirmation email to the guest
 */
export const sendGuestConfirmation = async (inquiryData: BookingInquiry): Promise<EmailResponse> => {
  try {
    if (!validateEmailConfig()) {
      throw new Error('EmailJS is not properly configured. Please check environment variables.');
    }

    const templateParams = {
      to_email: inquiryData.email,
      guest_name: inquiryData.name,
      check_in: inquiryData.checkIn,
      check_out: inquiryData.checkOut,
      guests: inquiryData.guests.toString(),
      room_type: inquiryData.roomType,
      hotel_name: 'Deewan Residency',
      hotel_email: HOTEL_EMAIL,
      hotel_phone: '+91-XXXXXXXXXX', // Add your hotel phone
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_confirmation', // You'll need to create this template
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Confirmation email sent to guest.',
    };
  } catch (error) {
    console.error('EmailJS Confirmation Error:', error);
    return {
      success: false,
      message: 'Failed to send confirmation email.',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Send general inquiry email to hotel management
 */
export const sendGeneralInquiry = async (inquiryData: GeneralInquiry): Promise<EmailResponse> => {
  try {
    if (!validateEmailConfig()) {
      throw new Error('EmailJS is not properly configured. Please check environment variables.');
    }

    const templateParams = {
      to_email: HOTEL_EMAIL,
      from_name: inquiryData.name,
      from_email: inquiryData.email,
      phone: inquiryData.phone,
      subject: inquiryData.subject,
      message: inquiryData.message,
      inquiry_date: new Date().toLocaleDateString(),
      inquiry_time: new Date().toLocaleTimeString(),
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Your inquiry has been sent successfully! We will get back to you soon.',
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Failed to send inquiry. Please try again or contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};