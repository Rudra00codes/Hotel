export interface BusinessFacility {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity?: string;
  operatingHours: string;
  contactInfo: string;
  features: string[];
  equipment: string[];
  pricing?: string;
  bookingRequirements: string[];
}

export const businessFacilities: BusinessFacility[] = [
  {
    id: 'conference-room',
    name: 'Main Conference Room',
    description: 'Our spacious conference room is perfect for business meetings, corporate presentations, and professional gatherings. Equipped with modern audio-visual technology and comfortable seating arrangements.',
    image: '/images/business/conference-room.jpg',
    capacity: 'Up to 20 people',
    operatingHours: '8:00 AM - 8:00 PM',
    contactInfo: '01762-506147',
    features: [
      'Air-conditioned environment',
      'Natural lighting with blackout options',
      'Comfortable executive seating',
      'Whiteboard and flip charts',
      'High-speed Wi-Fi',
      'Power outlets for all participants'
    ],
    equipment: [
      'HD Projector and screen',
      'Audio system with microphones',
      'Laptop connectivity (HDMI/VGA)',
      'Video conferencing setup',
      'Presentation remote',
      'Extension cords and adapters'
    ],
    pricing: 'Competitive hourly and daily rates available',
    bookingRequirements: [
      'Advance booking required (minimum 24 hours)',
      'Valid ID and contact information',
      'Deposit may be required for extended bookings',
      'Catering arrangements available on request'
    ]
  },
  {
    id: 'business-center',
    name: 'Business Center',
    description: 'A fully equipped business center providing essential office services for our guests. Available 24/7 for your convenience, whether you need to print documents, send emails, or work on presentations.',
    image: '/images/business/business-center.jpg',
    capacity: 'Individual workstations',
    operatingHours: '24 Hours',
    contactInfo: '01762-506146',
    features: [
      '24/7 access for hotel guests',
      'Quiet working environment',
      'Comfortable workstations',
      'High-speed internet access',
      'Printing and scanning services',
      'Stationery supplies available'
    ],
    equipment: [
      'Desktop computers with internet',
      'Laser printer (B&W and color)',
      'Scanner and photocopier',
      'Fax machine',
      'Lamination services',
      'Binding and stapling facilities'
    ],
    pricing: 'Complimentary for hotel guests, nominal charges for external services',
    bookingRequirements: [
      'Hotel guest key card for access',
      'External users require prior arrangement',
      'Payment for printing and special services',
      'Advance notice for large volume printing'
    ]
  },
  {
    id: 'meeting-rooms',
    name: 'Private Meeting Rooms',
    description: 'Intimate meeting spaces designed for small group discussions, client consultations, and private business conversations. Perfect for confidential meetings and focused work sessions.',
    image: '/images/business/meeting-room.jpg',
    capacity: '4-8 people per room',
    operatingHours: '8:00 AM - 8:00 PM',
    contactInfo: '01762-506147',
    features: [
      'Sound-proof environment',
      'Professional ambiance',
      'Comfortable seating arrangements',
      'Climate control',
      'Privacy and confidentiality',
      'Refreshment arrangements available'
    ],
    equipment: [
      'LED TV for presentations',
      'Conference phone system',
      'Wireless presentation system',
      'Flip chart and markers',
      'High-speed Wi-Fi',
      'Power outlets and USB charging'
    ],
    pricing: 'Hourly rates with package deals for extended use',
    bookingRequirements: [
      'Minimum 2-hour booking',
      'Advance reservation recommended',
      'Catering can be arranged separately',
      'Technical support available on request'
    ]
  },
  {
    id: 'event-space',
    name: 'Multi-Purpose Event Space',
    description: 'Versatile event space suitable for corporate events, training sessions, workshops, and social gatherings. The space can be configured according to your specific requirements.',
    image: '/images/business/event-space.jpg',
    capacity: 'Up to 50 people (flexible arrangements)',
    operatingHours: '8:00 AM - 10:00 PM',
    contactInfo: '01762-506147',
    features: [
      'Flexible seating arrangements',
      'Modular space configuration',
      'Professional lighting system',
      'Sound system with wireless mics',
      'Stage area for presentations',
      'Catering kitchen access'
    ],
    equipment: [
      'Professional sound system',
      'Wireless microphones',
      'Projector and large screen',
      'Podium and lectern',
      'Portable stages and platforms',
      'Audio-visual control panel'
    ],
    pricing: 'Full-day and half-day packages available',
    bookingRequirements: [
      'Advance booking required (minimum 1 week)',
      'Event planning consultation included',
      'Catering and decoration services available',
      'Security deposit required for events'
    ]
  }
];

export const getBusinessFacilityById = (id: string) => {
  return businessFacilities.find(facility => facility.id === id);
};