import { useState } from 'react';
import { sendBookingInquiry } from '../../utils/emailService';
import { businessFacilities } from '../../data/businessFacilities';

interface BusinessBookingFormProps {
  selectedFacility?: string;
}

export default function BusinessBookingForm({ selectedFacility }: BusinessBookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    facility: selectedFacility || '',
    date: '',
    startTime: '',
    endTime: '',
    attendees: '',
    eventType: '',
    cateringRequired: 'no',
    specialRequirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const bookingData = {
        checkIn: formData.date,
        checkOut: formData.date,
        guests: parseInt(formData.attendees) || 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomType: `Business Facility: ${formData.facility}`,
        specialRequests: `
Business Facility Booking Request

Company: ${formData.company}
Event Type: ${formData.eventType}
Time: ${formData.startTime} - ${formData.endTime}
Catering Required: ${formData.cateringRequired === 'yes' ? 'Yes' : 'No'}

Special Requirements:
${formData.specialRequirements || 'None'}
        `
      };

      const result = await sendBookingInquiry(bookingData);
      if (!result.success) {
        throw new Error(result.message);
      }
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        facility: selectedFacility || '',
        date: '',
        startTime: '',
        endTime: '',
        attendees: '',
        eventType: '',
        cateringRequired: 'no',
        specialRequirements: ''
      });
    } catch (error) {
      console.error('Error sending business booking request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-sinoreta text-gray-900 mb-6 uppercase tracking-wide">Book Business Facility</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <p className="font-grotesk font-medium">Booking request sent successfully!</p>
          <p className="text-sm mt-1">We'll contact you within 24 hours to confirm availability and pricing.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-grotesk font-medium">Failed to send booking request.</p>
          <p className="text-sm mt-1">Please call us directly at 01762-506147 or try again later.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="facility" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Facility Required *
            </label>
            <select
              id="facility"
              name="facility"
              value={formData.facility}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a facility</option>
              {businessFacilities.map(facility => (
                <option key={facility.id} value={facility.name}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="eventType" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Event Type *
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select event type</option>
              <option value="Business Meeting">Business Meeting</option>
              <option value="Conference">Conference</option>
              <option value="Training Session">Training Session</option>
              <option value="Workshop">Workshop</option>
              <option value="Presentation">Presentation</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Event Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="startTime" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Start Time *
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="endTime" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              End Time *
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="attendees" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Number of Attendees *
            </label>
            <input
              type="number"
              id="attendees"
              name="attendees"
              value={formData.attendees}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="cateringRequired" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
              Catering Required?
            </label>
            <select
              id="cateringRequired"
              name="cateringRequired"
              value={formData.cateringRequired}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="specialRequirements" className="block text-sm font-grotesk font-medium text-gray-700 mb-1">
            Special Requirements
          </label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={3}
            placeholder="Any special setup requirements, technical needs, or other requests..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          data-magnetic
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-grotesk font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors tracking-wide"
        >
          {isSubmitting ? 'Sending Request...' : 'Submit Booking Request'}
        </button>
      </form>
    </div>
  );
}
