export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'appetizers' | 'main-course' | 'desserts' | 'beverages';
  price?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export interface DiningOption {
  id: string;
  name: string;
  description: string;
  image: string;
  operatingHours: string;
  contactInfo: string;
  cuisineType: string[];
  features: string[];
  menuHighlights: MenuItem[];
}

export const diningOptions: DiningOption[] = [
  {
    id: 'main-restaurant',
    name: 'Deewan Restaurant',
    description: 'Our signature restaurant offers an exquisite dining experience with a perfect blend of traditional Indian cuisine and international favorites. Enjoy your meal in our elegant, air-conditioned dining hall with comfortable seating for families and business guests.',
    image: '/images/dining/main-restaurant.jpg',
    operatingHours: '6:00 AM - 11:00 PM',
    contactInfo: '01762-506147',
    cuisineType: ['North Indian', 'South Indian', 'Chinese', 'Continental'],
    features: [
      'Air-conditioned dining hall',
      'Family-friendly seating',
      'Live cooking stations',
      'Buffet and à la carte options',
      'Special dietary accommodations',
      'Private dining areas'
    ],
    menuHighlights: [
      {
        id: 'butter-chicken',
        name: 'Butter Chicken',
        description: 'Tender chicken in rich, creamy tomato-based sauce',
        category: 'main-course',
        isSpicy: true
      },
      {
        id: 'dal-makhani',
        name: 'Dal Makhani',
        description: 'Slow-cooked black lentils in butter and cream',
        category: 'main-course',
        isVegetarian: true
      },
      {
        id: 'biryani',
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice with spiced chicken',
        category: 'main-course',
        isSpicy: true
      },
      {
        id: 'paneer-tikka',
        name: 'Paneer Tikka',
        description: 'Grilled cottage cheese with Indian spices',
        category: 'appetizers',
        isVegetarian: true
      }
    ]
  },
  {
    id: 'room-service',
    name: '24/7 Room Service',
    description: 'Enjoy delicious meals in the comfort and privacy of your room with our comprehensive room service menu. Available round the clock, our room service ensures you never go hungry, no matter what time it is.',
    image: '/images/dining/room-service.jpg',
    operatingHours: '24 Hours',
    contactInfo: '01762-506146',
    cuisineType: ['Indian', 'Continental', 'Chinese', 'Snacks'],
    features: [
      '24/7 availability',
      'In-room dining setup',
      'Quick delivery service',
      'Special occasion arrangements',
      'Dietary restriction accommodations',
      'Hot and fresh delivery'
    ],
    menuHighlights: [
      {
        id: 'club-sandwich',
        name: 'Club Sandwich',
        description: 'Triple-layered sandwich with chicken, vegetables, and mayo',
        category: 'main-course'
      },
      {
        id: 'pasta',
        name: 'Pasta Arrabiata',
        description: 'Penne pasta in spicy tomato sauce',
        category: 'main-course',
        isVegetarian: true,
        isSpicy: true
      },
      {
        id: 'fresh-juice',
        name: 'Fresh Fruit Juices',
        description: 'Seasonal fresh fruit juices and smoothies',
        category: 'beverages',
        isVegetarian: true
      },
      {
        id: 'ice-cream',
        name: 'Ice Cream Selection',
        description: 'Variety of premium ice cream flavors',
        category: 'desserts',
        isVegetarian: true
      }
    ]
  },
  {
    id: 'coffee-lounge',
    name: 'Coffee Lounge',
    description: 'Relax and unwind in our cozy coffee lounge, perfect for casual meetings, reading, or simply enjoying a premium cup of coffee. Our barista-crafted beverages and light snacks make it an ideal spot for any time of the day.',
    image: '/images/dining/coffee-lounge.jpg',
    operatingHours: '7:00 AM - 10:00 PM',
    contactInfo: '01762-506147',
    cuisineType: ['Beverages', 'Light Snacks', 'Desserts'],
    features: [
      'Premium coffee selection',
      'Comfortable seating',
      'Free Wi-Fi',
      'Quiet atmosphere',
      'Light snacks available',
      'Perfect for meetings'
    ],
    menuHighlights: [
      {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Rich espresso with steamed milk and foam',
        category: 'beverages',
        isVegetarian: true
      },
      {
        id: 'masala-chai',
        name: 'Masala Chai',
        description: 'Traditional Indian spiced tea',
        category: 'beverages',
        isVegetarian: true
      },
      {
        id: 'croissant',
        name: 'Fresh Croissants',
        description: 'Buttery, flaky pastries with various fillings',
        category: 'appetizers',
        isVegetarian: true
      },
      {
        id: 'cake-slice',
        name: 'Cake Selection',
        description: 'Daily selection of fresh cakes and pastries',
        category: 'desserts',
        isVegetarian: true
      }
    ]
  }
];

export const getAllCuisineTypes = () => {
  const cuisines = new Set<string>();
  diningOptions.forEach(option => {
    option.cuisineType.forEach(cuisine => cuisines.add(cuisine));
  });
  return Array.from(cuisines);
};