export interface Amenity {
  id: string;
  name: string;
  category: 'dining' | 'business' | 'recreation';
  description: string;
  image: string;
  operatingHours?: string;
  contactInfo?: string;
  features: string[];
}

export const amenitiesData: Amenity[] = [
  // Dining Amenities
  {
    id: 'restaurant',
    name: 'Main Restaurant',
    category: 'dining',
    description: 'Experience fine dining with a variety of local and international cuisines in our elegant restaurant.',
    image: '/images/amenities/restaurant.jpg',
    operatingHours: '6:00 AM - 11:00 PM',
    contactInfo: '01762-506147',
    features: ['Multi-cuisine menu', 'Air-conditioned dining', 'Family seating', 'Room service available']
  },
  {
    id: 'room-service',
    name: '24/7 Room Service',
    category: 'dining',
    description: 'Enjoy delicious meals in the comfort of your room with our round-the-clock room service.',
    image: '/images/amenities/room-service.jpg',
    operatingHours: '24 hours',
    contactInfo: '01762-506146',
    features: ['24/7 availability', 'In-room dining', 'Special dietary options', 'Quick service']
  },
  {
    id: 'coffee-lounge',
    name: 'Coffee Lounge',
    category: 'dining',
    description: 'Relax and unwind in our cozy coffee lounge with premium beverages and light snacks.',
    image: '/images/amenities/coffee-lounge.jpg',
    operatingHours: '7:00 AM - 10:00 PM',
    contactInfo: '01762-506147',
    features: ['Premium coffee', 'Light snacks', 'Comfortable seating', 'Wi-Fi available']
  },

  // Business Amenities
  {
    id: 'conference-room',
    name: 'Conference Room',
    category: 'business',
    description: 'Fully equipped conference room perfect for business meetings and corporate events.',
    image: '/images/amenities/conference-room.jpg',
    operatingHours: '8:00 AM - 8:00 PM',
    contactInfo: '01762-506147',
    features: ['Projector & screen', 'High-speed Wi-Fi', 'Air conditioning', 'Seating for 20 people']
  },
  {
    id: 'business-center',
    name: 'Business Center',
    category: 'business',
    description: 'Complete business facilities including printing, scanning, and internet services.',
    image: '/images/amenities/business-center.jpg',
    operatingHours: '24 hours',
    contactInfo: '01762-506146',
    features: ['Printing services', 'Scanning & copying', 'High-speed internet', 'Computer workstations']
  },
  {
    id: 'meeting-rooms',
    name: 'Private Meeting Rooms',
    category: 'business',
    description: 'Intimate meeting spaces for small group discussions and private consultations.',
    image: '/images/amenities/meeting-room.jpg',
    operatingHours: '8:00 AM - 8:00 PM',
    contactInfo: '01762-506147',
    features: ['Private spaces', 'Audio-visual equipment', 'Comfortable seating', 'Catering available']
  },

  // Recreation Amenities
  {
    id: 'fitness-center',
    name: 'Fitness Center',
    category: 'recreation',
    description: 'Stay active during your stay with our well-equipped fitness center.',
    image: '/images/amenities/fitness-center.jpg',
    operatingHours: '5:00 AM - 11:00 PM',
    features: ['Modern equipment', 'Cardio machines', 'Free weights', 'Air-conditioned space']
  },
  {
    id: 'garden-area',
    name: 'Garden & Outdoor Space',
    category: 'recreation',
    description: 'Beautiful landscaped gardens providing a peaceful environment for relaxation.',
    image: '/images/amenities/garden.jpg',
    operatingHours: '24 hours',
    features: ['Landscaped gardens', 'Seating areas', 'Walking paths', 'Photography spots']
  },
  {
    id: 'parking',
    name: 'Free Parking',
    category: 'recreation',
    description: 'Complimentary parking facility for all guests with 24/7 security.',
    image: '/images/amenities/parking.jpg',
    operatingHours: '24 hours',
    features: ['Free parking', '24/7 security', 'Covered parking', 'Easy access']
  },
  {
    id: 'wifi',
    name: 'High-Speed Wi-Fi',
    category: 'recreation',
    description: 'Stay connected with complimentary high-speed internet throughout the property.',
    image: '/images/amenities/wifi.jpg',
    operatingHours: '24 hours',
    features: ['High-speed internet', 'Property-wide coverage', 'Secure connection', 'Multiple device support']
  }
];

export const getAmenitiesByCategory = (category: 'dining' | 'business' | 'recreation') => {
  return amenitiesData.filter(amenity => amenity.category === category);
};

export const getAllCategories = () => {
  return ['dining', 'business', 'recreation'] as const;
};