import { useState, useRef, type FormEvent } from 'react';
import { sendGeneralInquiry, type GeneralInquiry } from '../../utils/emailService';
import { getTouchFriendlyClasses, getTouchFriendlyInputClasses } from '../../utils/mobileOptimization';
import MobilePhone from '../MobilePhone';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps = {}) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const statusMessageRef = useRef<HTMLDivElement>(null);



  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
        if (!value) return 'Phone number is required';
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        break;
      case 'subject':
        if (!value) return 'Please select a subject';
        break;
      case 'message':
        if (!value || value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Prevent default form behavior and navigation
    if (e.target) {
      (e.target as HTMLFormElement).setAttribute('data-submitting', 'true');
    }
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Prepare general inquiry data
      const inquiryData: GeneralInquiry = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      };

      // Send general inquiry to hotel management
      const emailResult = await sendGeneralInquiry(inquiryData);
      
      if (emailResult.success) {
        setSubmitStatus({
          type: 'success',
          message: emailResult.message
        });
        
        // Reset form on successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setErrors({});
        
        // Scroll to success message after a brief delay
        setTimeout(() => {
          statusMessageRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
        
        // Call success callback if provided
        onSuccess?.();
      } else {
        setSubmitStatus({
          type: 'error',
          message: emailResult.message
        });
        
        // Scroll to error message
        setTimeout(() => {
          statusMessageRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again or contact us directly.'
      });
      
      // Scroll to error message
      setTimeout(() => {
        statusMessageRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 md:p-8 border border-gray-700">
      <h3 className="text-2xl font-grotesk text-white mb-6 text-center uppercase tracking-wide">
        Send us a Message
      </h3>
      
      {/* Status Messages */}
      {submitStatus.type && (
        <div 
          ref={statusMessageRef}
          className={`p-4 rounded-md mb-4 ${
          submitStatus.type === 'success' 
            ? 'bg-green-900 border border-green-700 text-green-200' 
            : 'bg-red-900 border border-red-700 text-red-200'
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
                  <MobilePhone
                    phoneNumber="01762-506147"
                    displayText="01762-506147"
                    variant="primary"
                    size="small"
                    showIcon={false}
                    className="underline font-grotesk font-medium text-red-300 inline"
                  /> or{' '}
                  <a href="mailto:thedeewanhotel@gmail.com" className="underline font-grotesk font-medium text-red-300">thedeewanhotel@gmail.com</a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" onReset={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-grotesk font-medium text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={`w-full ${getTouchFriendlyInputClasses()} bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            }`}
            required
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-grotesk font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={`w-full ${getTouchFriendlyInputClasses()} bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            }`}
            required
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-grotesk font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            className={`w-full ${getTouchFriendlyInputClasses()} bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-grotesk font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us how we can help you..."
            rows={5}
            className={`w-full ${getTouchFriendlyInputClasses()} bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            }`}
            required
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
            <p className="text-xs text-gray-400 ml-auto">
              {formData.message.length}/1000 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${getTouchFriendlyClasses('large')} rounded-lg font-grotesk font-semibold transition-colors duration-200 flex items-center justify-center tracking-wide ${
            isSubmitting
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>


    </div>
  );
}
