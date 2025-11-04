import { useState, type FormEvent } from 'react';
import { sendBookingInquiry, sendGuestConfirmation, type BookingInquiry } from '../../utils/emailService';

interface FormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  roomType: string;
  specialRequests: string;
}

interface FormErrors {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface InquiryFormProps {
  prefilledRoomType?: string;
  onSuccess?: () => void;
}

export default function InquiryForm({ prefilledRoomType, onSuccess }: InquiryFormProps = {}) {
  const [formData, setFormData] = useState<FormData>({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    roomType: prefilledRoomType || '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];

  // Real-time validation
  const validateField = (name: string, value: string | number): string | undefined => {
    switch (name) {
      case 'checkIn':
        if (!value) return 'Check-in date is required';
        if (new Date(value as string) < new Date(today)) return 'Check-in date cannot be in the past';
        break;
      case 'checkOut':
        if (!value) return 'Check-out date is required';
        if (formData.checkIn && new Date(value as string) <= new Date(formData.checkIn)) {
          return 'Check-out date must be after check-in date';
        }
        break;
      case 'guests':
        const guestCount = typeof value === 'number' ? value : parseInt(value as string) || 0;
        if (!value || guestCount < 1) return 'At least 1 guest is required';
        if (guestCount > 10) return 'Maximum 10 guests allowed';
        break;
      case 'name':
        if (!value || (value as string).trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Email is required';
        if (!emailRegex.test(value as string)) return 'Please enter a valid email address';
        break;
      case 'phone':
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
        if (!value) return 'Phone number is required';
        if (!phoneRegex.test(value as string)) return 'Please enter a valid phone number';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'guests' ? parseInt(value) || 1 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Real-time validation
    const error = validateField(name, processedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Special case: validate check-out when check-in changes
    if (name === 'checkIn' && formData.checkOut) {
      const checkOutError = validateField('checkOut', formData.checkOut);
      setErrors(prev => ({
        ...prev,
        checkOut: checkOutError
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'roomType' && key !== 'specialRequests') {
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Prepare booking inquiry data
      const inquiryData: BookingInquiry = {
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomType: formData.roomType,
        specialRequests: formData.specialRequests
      };

      // Send booking inquiry to hotel management
      const emailResult = await sendBookingInquiry(inquiryData);
      
      if (emailResult.success) {
        // Send confirmation email to guest (optional, don't fail if this fails)
        try {
          await sendGuestConfirmation(inquiryData);
        } catch (confirmationError) {
          console.warn('Failed to send guest confirmation:', confirmationError);
        }

        setSubmitStatus({
          type: 'success',
          message: emailResult.message
        });

        // Reset form on successful submission
        setFormData({
          checkIn: '',
          checkOut: '',
          guests: 1,
          name: '',
          email: '',
          phone: '',
          roomType: prefilledRoomType || '',
          specialRequests: ''
        });
        setErrors({});
        
        // Call success callback if provided
        onSuccess?.();
      } else {
        setSubmitStatus({
          type: 'error',
          message: emailResult.message
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again or call us directly at 01762-506147.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h3 className="text-2xl font-grotesk text-gray-800 mb-6 text-center uppercase tracking-wide">
        Check Availability
      </h3>
      
      {/* Status Messages */}
      {submitStatus.type && (
        <div className={`p-4 rounded-md mb-4 ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {submitStatus.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-grotesk font-medium">{submitStatus.message}</p>
              {submitStatus.type === 'error' && (
                <p className="text-xs mt-1">
                  You can also reach us directly at{' '}
                  <a href="tel:01762506147" className="underline font-grotesk font-medium">01762-506147</a> or{' '}
                  <a href="tel:01762506146" className="underline font-grotesk font-medium">01762-506146</a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Selection Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Check-in Date *
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              min={today}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.checkIn ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
          </div>

          <div>
            <label htmlFor="checkOut" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Check-out Date *
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              min={formData.checkIn || today}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.checkOut ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
          </div>
        </div>

        {/* Guests and Room Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="guests" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Number of Guests *
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.guests ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
          </div>

          <div>
            <label htmlFor="roomType" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Room Preference
            </label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Room Type</option>
              <option value="standard">Standard Room</option>
              <option value="deluxe">Deluxe Room</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Special Requests */}
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Any special requirements or requests..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-magnetic
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-md font-grotesk font-semibold text-white transition-colors tracking-wide ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Check Availability'}
        </button>
      </form>

      {/* Contact Information */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        <p className="font-grotesk">Or call us directly:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="tel:01762506147" className="text-blue-600 hover:text-blue-800 font-grotesk font-medium">
            01762-506147
          </a>
          <a href="tel:01762506146" className="text-blue-600 hover:text-blue-800 font-grotesk font-medium">
            01762-506146
          </a>
        </div>
      </div>
    </div>
  );
}
