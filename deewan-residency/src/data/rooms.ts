import type { Room } from '../components/RoomCard/RoomCard';

export const roomsData: Room[] = [
  {
    id: 'standard-single',
    name: 'Deluxe Single Room',
    category: 'deluxe',
    description: 'Comfortable and well-appointed single room perfect for solo travelers. Features modern amenities and a cozy atmosphere with all essential facilities for a pleasant stay.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'LED TV',
      'Private Bathroom',
      'Room Service',
      'Daily Housekeeping'
    ],
    images: [
      '/images/rooms/standard-single-1.jpg',
      '/images/rooms/standard-single-2.jpg',
      '/images/rooms/standard-single-3.jpg'
    ],
    maxOccupancy: 1,
    size: '200 sq ft',
    features: ['Single Bed', 'Work Desk', 'Wardrobe', 'Mini Fridge'],
    priceRange: '₹2,500 - ₹3,000'
  },
  {
    id: 'standard-double',
    name: 'Deluxe Double Room',
    category: 'deluxe',
    description: 'Spacious double room ideal for couples or business travelers. Equipped with modern amenities and comfortable furnishings to ensure a relaxing stay.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'LED TV',
      'Private Bathroom',
      'Room Service',
      'Daily Housekeeping',
      'Tea/Coffee Maker'
    ],
    images: [
      '/images/rooms/standard-double-1.jpg',
      '/images/rooms/standard-double-2.jpg',
      '/images/rooms/standard-double-3.jpg'
    ],
    maxOccupancy: 2,
    size: '250 sq ft',
    features: ['Double Bed', 'Seating Area', 'Work Desk', 'Wardrobe', 'Mini Fridge'],
    priceRange: '₹3,500 - ₹4,000'
  },
  {
    id: 'deluxe-room',
    name: 'Super Deluxe Room',
    category: 'super deluxe',
    description: 'Enhanced comfort with premium amenities and elegant décor. Perfect for guests seeking a more luxurious experience with additional space and upgraded facilities.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'LED TV',
      'Private Bathroom',
      'Room Service',
      'Daily Housekeeping',
      'Tea/Coffee Maker',
      'Mini Bar',
      'Balcony'
    ],
    images: [
      '/images/rooms/deluxe-1.jpg',
      '/images/rooms/deluxe-2.jpg',
      '/images/rooms/deluxe-3.jpg',
      '/images/rooms/deluxe-4.jpg'
    ],
    maxOccupancy: 3,
    size: '350 sq ft',
    features: ['King Size Bed', 'Sitting Area', 'Premium Bathroom', 'Balcony', 'Work Station'],
    priceRange: '₹4,500 - ₹5,500'
  },
  {
    id: 'deluxe-family',
    name: 'Super Deluxe Family Room',
    category: 'super deluxe',
    description: 'Spacious family room designed for comfort and convenience. Features separate sleeping areas and ample space for families traveling together.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'LED TV',
      'Private Bathroom',
      'Room Service',
      'Daily Housekeeping',
      'Tea/Coffee Maker',
      'Mini Bar',
      'Extra Bedding'
    ],
    images: [
      '/images/rooms/deluxe-family-1.jpg',
      '/images/rooms/deluxe-family-2.jpg',
      '/images/rooms/deluxe-family-3.jpg'
    ],
    maxOccupancy: 4,
    size: '450 sq ft',
    features: ['King Bed + Sofa Bed', 'Family Seating', 'Large Bathroom', 'Extra Storage'],
    priceRange: '₹6,000 - ₹7,000'
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    category: 'super deluxe',
    description: 'Luxurious suite offering the finest accommodations with separate living and sleeping areas. Perfect for business executives and discerning travelers.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'LED TV',
      'Private Bathroom',
      'Room Service',
      'Daily Housekeeping',
      'Tea/Coffee Maker',
      'Mini Bar',
      'Balcony',
      'Complimentary Breakfast',
      'Executive Lounge Access'
    ],
    images: [
      '/images/rooms/executive-suite-1.jpg',
      '/images/rooms/executive-suite-2.jpg',
      '/images/rooms/executive-suite-3.jpg',
      '/images/rooms/executive-suite-4.jpg'
    ],
    maxOccupancy: 2,
    size: '600 sq ft',
    features: ['Separate Living Room', 'King Size Bed', 'Premium Bathroom', 'Work Area', 'Balcony'],
    priceRange: '₹8,000 - ₹10,000'
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    category: 'super deluxe',
    description: 'The ultimate luxury experience with premium amenities and exceptional service. Features the finest furnishings and exclusive access to hotel facilities.',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'LED TV',
      'Private Bathroom',
      'Room Service',
      'Daily Housekeeping',
      'Tea/Coffee Maker',
      'Mini Bar',
      'Balcony',
      'Complimentary Breakfast',
      'Executive Lounge Access',
      'Butler Service',
      'Jacuzzi'
    ],
    images: [
      '/images/rooms/presidential-suite-1.jpg',
      '/images/rooms/presidential-suite-2.jpg',
      '/images/rooms/presidential-suite-3.jpg',
      '/images/rooms/presidential-suite-4.jpg'
    ],
    maxOccupancy: 4,
    size: '800 sq ft',
    features: ['Master Bedroom', 'Living Room', 'Dining Area', 'Jacuzzi', 'Premium Balcony'],
    priceRange: '₹12,000 - ₹15,000'
  }
];

export const roomCategories = [
  { id: 'all', name: 'All Rooms', count: roomsData.length },
  { id: 'deluxe', name: 'Deluxe', count: roomsData.filter(room => room.category === 'deluxe').length },
  { id: 'super deluxe', name: 'Super Deluxe', count: roomsData.filter(room => room.category === 'super deluxe').length }
];