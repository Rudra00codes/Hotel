/**
 * Gallery data for Deewan Residency
 * Organized by categories: rooms, dining, amenities, exterior
 */

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'rooms' | 'dining' | 'amenities' | 'exterior';
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  // Rooms Category
  {
    id: 'room-deluxe-1',
    src: '/images/rooms/deluxe-room-1.jpg',
    alt: 'Deluxe room interior featuring a king-size bed with white linens, modern furniture, and large windows providing natural light',
    category: 'rooms',
    caption: 'Spacious deluxe room with modern amenities and city view'
  },
  {
    id: 'room-deluxe-2',
    src: '/images/rooms/deluxe-room-2.jpg',
    alt: 'Modern deluxe room bathroom with marble countertops, premium fixtures, and contemporary design elements',
    category: 'rooms',
    caption: 'Modern bathroom with premium fixtures and marble finishes'
  },
  {
    id: 'room-standard-1',
    src: '/images/rooms/standard-room-1.jpg',
    alt: 'Standard Room with Twin Beds',
    category: 'rooms',
    caption: 'Comfortable standard room perfect for business travelers'
  },
  {
    id: 'room-standard-2',
    src: '/images/rooms/standard-room-2.jpg',
    alt: 'Standard Room Work Area',
    category: 'rooms',
    caption: 'Dedicated work space with high-speed internet'
  },
  {
    id: 'room-suite-1',
    src: '/images/rooms/suite-1.jpg',
    alt: 'Executive Suite Living Area',
    category: 'rooms',
    caption: 'Luxurious suite with separate living and sleeping areas'
  },
  {
    id: 'room-suite-2',
    src: '/images/rooms/suite-2.jpg',
    alt: 'Executive Suite Bedroom',
    category: 'rooms',
    caption: 'Master bedroom with premium bedding and panoramic views'
  },

  // Dining Category
  {
    id: 'dining-restaurant-1',
    src: '/images/dining/restaurant-main.jpg',
    alt: 'Elegant main restaurant dining hall with comfortable seating arrangements, warm lighting, and professional table settings',
    category: 'dining',
    caption: 'Elegant dining hall serving authentic Indian and continental cuisine'
  },
  {
    id: 'dining-restaurant-2',
    src: '/images/dining/restaurant-seating.jpg',
    alt: 'Restaurant Private Seating',
    category: 'dining',
    caption: 'Private dining areas for intimate meals and business meetings'
  },
  {
    id: 'dining-buffet-1',
    src: '/images/dining/buffet-setup.jpg',
    alt: 'Breakfast Buffet Setup',
    category: 'dining',
    caption: 'Daily breakfast buffet with fresh local and continental options'
  },
  {
    id: 'dining-kitchen-1',
    src: '/images/dining/kitchen-view.jpg',
    alt: 'Professional Kitchen',
    category: 'dining',
    caption: 'State-of-the-art kitchen ensuring fresh, hygienic food preparation'
  },

  // Amenities Category
  {
    id: 'amenity-lobby-1',
    src: '/images/amenities/lobby-main.jpg',
    alt: 'Hotel Lobby and Reception',
    category: 'amenities',
    caption: 'Welcoming lobby with 24/7 reception and concierge services'
  },
  {
    id: 'amenity-business-1',
    src: '/images/amenities/business-center.jpg',
    alt: 'Business Center',
    category: 'amenities',
    caption: 'Fully equipped business center with meeting facilities'
  },
  {
    id: 'amenity-conference-1',
    src: '/images/amenities/conference-room.jpg',
    alt: 'Conference Room',
    category: 'amenities',
    caption: 'Modern conference room for corporate meetings and events'
  },
  {
    id: 'amenity-parking-1',
    src: '/images/amenities/parking-area.jpg',
    alt: 'Parking Facility',
    category: 'amenities',
    caption: 'Secure parking facility for guest vehicles'
  },
  {
    id: 'amenity-wifi-1',
    src: '/images/amenities/wifi-lounge.jpg',
    alt: 'WiFi Lounge Area',
    category: 'amenities',
    caption: 'Comfortable lounge area with complimentary high-speed WiFi'
  },

  // Exterior Category
  {
    id: 'exterior-building-1',
    src: '/images/exterior/hotel-front.jpg',
    alt: 'Front exterior view of Deewan Residency hotel building with clear signage, landscaped entrance, and parking area',
    category: 'exterior',
    caption: 'Deewan Residency located on Amb-Chd Highway, Derabassi'
  },
  {
    id: 'exterior-building-2',
    src: '/images/exterior/hotel-entrance.jpg',
    alt: 'Hotel Main Entrance',
    category: 'exterior',
    caption: 'Grand entrance with professional signage and landscaping'
  },
  {
    id: 'exterior-location-1',
    src: '/images/exterior/location-view.jpg',
    alt: 'Hotel Location on Highway',
    category: 'exterior',
    caption: 'Strategic location on Amb-Chandigarh Highway near Sukhmani College'
  },
  {
    id: 'exterior-night-1',
    src: '/images/exterior/hotel-night.jpg',
    alt: 'Hotel at Night',
    category: 'exterior',
    caption: 'Beautiful illuminated facade during evening hours'
  },
  {
    id: 'exterior-surroundings-1',
    src: '/images/exterior/surroundings.jpg',
    alt: 'Hotel Surroundings',
    category: 'exterior',
    caption: 'Peaceful surroundings with easy access to Chandigarh and Mohali'
  }
];

// Helper function to get images by category
export function getImagesByCategory(category: GalleryImage['category']): GalleryImage[] {
  return galleryImages.filter(image => image.category === category);
}

// Helper function to get featured images (first image from each category)
export function getFeaturedImages(): GalleryImage[] {
  const categories: GalleryImage['category'][] = ['rooms', 'dining', 'amenities', 'exterior'];
  return categories.map(category => 
    galleryImages.find(image => image.category === category)
  ).filter(Boolean) as GalleryImage[];
}

// Category information for navigation
export const galleryCategories = [
  {
    id: 'all',
    label: 'All Photos',
    description: 'View all hotel photos'
  },
  {
    id: 'rooms',
    label: 'Rooms & Suites',
    description: 'Comfortable accommodations with modern amenities'
  },
  {
    id: 'dining',
    label: 'Dining',
    description: 'Restaurant and food service facilities'
  },
  {
    id: 'amenities',
    label: 'Amenities',
    description: 'Business center, lobby, and guest facilities'
  },
  {
    id: 'exterior',
    label: 'Hotel & Location',
    description: 'Building exterior and location on Amb-Chd Highway'
  }
];