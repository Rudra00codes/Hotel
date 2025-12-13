// SEO utilities for Deewan Residency website
import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

// Hotel information for structured data
export const HOTEL_INFO = {
  name: 'Deewan Residency',
  description: 'Premier hotel on Amb-Chandigarh Highway, Derabassi with 25+ rooms, 24/7 service, free WiFi & parking. Just 20km from Chandigarh Airport.',
  address: {
    streetAddress: 'Amb-Chandigarh Highway, Near Sukhmani College',
    addressLocality: 'Derabassi',
    addressRegion: 'Mohali, Punjab',
    addressCountry: 'IN',
    postalCode: '140507'
  },
  telephone: ['+91-1762-506147', '+91-1762-506146'],
  email: 'thedeewanhotel@gmail.com',
  url: 'https://deewan-residency.com',
  image: '/images/exterior/hotel-facade.jpg',
  priceRange: '₹₹-₹₹₹',
  starRating: 4.5,
  reviewCount: 150,
  checkinTime: '14:00',
  checkoutTime: '12:00',
  numberOfRooms: 25
};

// Generate Hotel structured data (Schema.org)
export const generateHotelStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: HOTEL_INFO.name,
    description: HOTEL_INFO.description,
    image: HOTEL_INFO.image,
    url: HOTEL_INFO.url,
    telephone: HOTEL_INFO.telephone,
    email: HOTEL_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...HOTEL_INFO.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.6942,
      longitude: 76.8191
    },
    priceRange: HOTEL_INFO.priceRange,
    starRating: {
      '@type': 'Rating',
      ratingValue: HOTEL_INFO.starRating,
      bestRating: 5
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: HOTEL_INFO.starRating,
      reviewCount: HOTEL_INFO.reviewCount,
      bestRating: 5
    },
    numberOfRooms: HOTEL_INFO.numberOfRooms,
    checkinTime: HOTEL_INFO.checkinTime,
    checkoutTime: HOTEL_INFO.checkoutTime,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free WiFi',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Restaurant',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Business Center',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Room Service',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Parking',
        value: true
      }
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${HOTEL_INFO.url}/contact`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'LodgingReservation',
        name: 'Hotel Reservation'
      }
    }
  };
};

// Generate LocalBusiness structured data
export const generateLocalBusinessStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: HOTEL_INFO.name,
    description: HOTEL_INFO.description,
    image: HOTEL_INFO.image,
    url: HOTEL_INFO.url,
    telephone: HOTEL_INFO.telephone,
    email: HOTEL_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...HOTEL_INFO.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.6942,
      longitude: 76.8191
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    sameAs: [
      'https://www.facebook.com/deewanresidency',
      'https://www.instagram.com/deewanresidency'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: HOTEL_INFO.starRating,
      reviewCount: HOTEL_INFO.reviewCount,
      bestRating: 5
    }
  };
};

// Generate Breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Generate Review structured data
export const generateReviewStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: HOTEL_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: HOTEL_INFO.starRating,
      reviewCount: HOTEL_INFO.reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Rajesh Kumar'
        },
        datePublished: '2024-11-01',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5
        },
        reviewBody: 'Excellent hotel with great service and comfortable rooms. Perfect location on Amb-Chandigarh Highway.'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Priya Sharma'
        },
        datePublished: '2024-10-25',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5
        },
        reviewBody: 'Very clean and well-maintained. Staff is courteous and helpful. Great value for money.'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Amit Singh'
        },
        datePublished: '2024-10-15',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 4,
          bestRating: 5
        },
        reviewBody: 'Good hotel near Sukhmani College. WiFi is fast and rooms are spacious. Recommended for business travelers.'
      }
    ]
  };
};

// Common FAQs for the hotel
export const HOTEL_FAQS = {
  general: [
    {
      question: 'Where is Deewan Residency located?',
      answer: 'Deewan Residency is located on Amb-Chandigarh Highway in Derabassi, Mohali, Punjab. We are situated near Sukhmani College and easily accessible from Chandigarh Airport (20km away).'
    },
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in time is 2:00 PM (14:00) and check-out time is 12:00 PM (noon). Early check-in and late check-out may be available upon request, subject to availability.'
    },
    {
      question: 'Is parking available at the hotel?',
      answer: 'Yes, we provide free parking for all our guests. We have ample parking space for cars and two-wheelers.'
    },
    {
      question: 'Do you have WiFi?',
      answer: 'Yes, complimentary high-speed WiFi is available throughout the hotel premises for all guests.'
    },
    {
      question: 'How far is the hotel from Chandigarh Airport?',
      answer: 'Deewan Residency is approximately 20 kilometers from Chandigarh International Airport, which is about 25-30 minutes drive.'
    },
    {
      question: 'What amenities are included in the rooms?',
      answer: 'All rooms include free WiFi, air conditioning, LED TV, hot water, clean linens, and 24/7 room service. Some rooms also feature additional amenities like mini-fridge and work desk.'
    },
    {
      question: 'Is there a restaurant in the hotel?',
      answer: 'Yes, we have an in-house restaurant serving delicious North Indian, South Indian, and Continental cuisine. Room service is available 24/7.'
    },
    {
      question: 'Do you accept online payments?',
      answer: 'Yes, we accept all major payment methods including credit cards, debit cards, UPI, and online bank transfers.'
    }
  ],
  booking: [
    {
      question: 'How can I book a room?',
      answer: 'You can book a room by calling us at +91-1762-506147, sending an email to thedeewanhotel@gmail.com, or using our online booking form on the website.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 24 hours before check-in date are eligible for a full refund. Cancellations made within 24 hours may be subject to one night\'s charge.'
    },
    {
      question: 'Do you offer best price guarantee?',
      answer: 'Yes! We guarantee the best rates when you book directly with us. If you find a lower price elsewhere, we will match it.'
    }
  ],
  location: [
    {
      question: 'What are the nearby attractions?',
      answer: 'We are conveniently located near Sukhmani College, PCA Stadium Mohali (15km), Chandigarh city center (18km), and Zirakpur business district (8km).'
    },
    {
      question: 'Is the hotel suitable for business travelers?',
      answer: 'Absolutely! We offer business-friendly amenities including high-speed WiFi, work desks in rooms, and a quiet environment perfect for business travelers and professionals.'
    }
  ]
};

// Page-specific SEO configurations
export const SEO_CONFIGS = {
  home: {
    title: 'Deewan Residency Hotel Derabassi | Best Hotel on Amb-Chandigarh Highway | Near Sukhmani College',
    description: 'Book rooms at Deewan Residency, #1 rated hotel in Derabassi on Amb-Chandigarh Highway. 25+ rooms, 24/7 service, free WiFi & parking. Just 20km from Chandigarh Airport. Best rates guaranteed!',
    keywords: 'hotel derabassi, hotels near sukhmani college, amb chandigarh highway hotels, budget hotels mohali, business hotel punjab, derabassi accommodation, hotels near zirakpur, hotels near chandigarh airport, hotels near pca stadium mohali',
    structuredData: [
      generateHotelStructuredData(), 
      generateLocalBusinessStructuredData(),
      generateReviewStructuredData(),
      generateBreadcrumbStructuredData([
        { name: 'Home', url: HOTEL_INFO.url }
      ]),
      generateFAQStructuredData(HOTEL_FAQS.general)
    ]
  },
  rooms: {
    title: 'Hotel Rooms in Derabassi | Deluxe & Super Deluxe Rooms - Deewan Residency',
    description: 'Choose from 25+ comfortable rooms at Deewan Residency Derabassi. Deluxe & Super Deluxe rooms with AC, WiFi, TV. Book direct for best rates on Amb-Chandigarh Highway.',
    keywords: 'hotel rooms derabassi, super deluxe rooms mohali, deluxe rooms punjab, luxury rooms amb chandigarh highway, budget rooms near chandigarh, ac rooms derabassi',
    structuredData: [
      generateBreadcrumbStructuredData([
        { name: 'Home', url: HOTEL_INFO.url },
        { name: 'Rooms', url: `${HOTEL_INFO.url}/rooms` }
      ]),
      generateFAQStructuredData([
        {
          question: 'What types of rooms are available at Deewan Residency?',
          answer: 'We offer Deluxe Rooms and Super Deluxe Rooms. All rooms include AC, free WiFi, LED TV, hot water, and 24/7 room service.'
        },
        {
          question: 'What is included in the room price?',
          answer: 'Room rates include complimentary WiFi, parking, breakfast (in select packages), air conditioning, and daily housekeeping.'
        },
        {
          question: 'Can I see the rooms before booking?',
          answer: 'Yes, you can view our room gallery online or visit us in person for a room tour before making your booking decision.'
        }
      ])
    ]
  },
  dining: {
    title: 'Restaurant & Dining in Derabassi | 24/7 Room Service - Deewan Residency',
    description: 'Enjoy delicious North Indian, South Indian & Continental cuisine at Deewan Residency restaurant. 24/7 room service available. Best dining experience on Amb-Chandigarh Highway.',
    keywords: 'restaurant derabassi, hotel dining mohali, room service punjab, food amb chandigarh highway, north indian food derabassi, continental food near chandigarh',
    structuredData: [
      generateBreadcrumbStructuredData([
        { name: 'Home', url: HOTEL_INFO.url },
        { name: 'Dining', url: `${HOTEL_INFO.url}/dining` }
      ]),
      generateFAQStructuredData([
        {
          question: 'What type of cuisine is served at the restaurant?',
          answer: 'Our restaurant serves delicious North Indian, South Indian, and Continental cuisine prepared by experienced chefs.'
        },
        {
          question: 'Is room service available?',
          answer: 'Yes, 24/7 room service is available for all guests. You can order meals directly to your room anytime.'
        },
        {
          question: 'Do you cater to special dietary requirements?',
          answer: 'Yes, we can accommodate vegetarian, vegan, and Jain food requirements. Please inform us in advance for any special dietary needs.'
        }
      ])
    ]
  },
  gallery: {
    title: 'Photo Gallery - Deewan Residency Hotel Derabassi | Room & Hotel Images',
    description: 'View photos of Deewan Residency rooms, restaurant, amenities & facilities. See why we are the best hotel in Derabassi on Amb-Chandigarh Highway.',
    keywords: 'hotel photos derabassi, deewan residency images, room pictures mohali, hotel gallery punjab, hotel interior derabassi, accommodation photos chandigarh highway',
    structuredData: [
      generateBreadcrumbStructuredData([
        { name: 'Home', url: HOTEL_INFO.url },
        { name: 'Gallery', url: `${HOTEL_INFO.url}/gallery` }
      ])
    ]
  },
  about: {
    title: 'About Deewan Residency | Premier Hotel in Derabassi, Mohali, Punjab',
    description: 'Discover Deewan Residency - your trusted hotel in Derabassi since establishment. Located on Amb-Chandigarh Highway, we offer 25+ rooms with modern amenities and exceptional hospitality.',
    keywords: 'about deewan residency, hotel history derabassi, hospitality mohali, hotel information punjab, best hotel near sukhmani college, family hotel derabassi',
    structuredData: [
      generateBreadcrumbStructuredData([
        { name: 'Home', url: HOTEL_INFO.url },
        { name: 'About', url: `${HOTEL_INFO.url}/about` }
      ]),
      generateFAQStructuredData([
        {
          question: 'When was Deewan Residency established?',
          answer: 'Deewan Residency has been serving guests in Derabassi with quality accommodation and exceptional service, building a reputation as one of the best hotels on Amb-Chandigarh Highway.'
        },
        {
          question: 'What makes Deewan Residency unique?',
          answer: 'Our strategic location, 25+ well-appointed rooms, 24/7 service, commitment to cleanliness, and competitive pricing make us the preferred choice for travelers in Derabassi and Mohali area.'
        }
      ])
    ]
  },
  contact: {
    title: 'Contact Deewan Residency Hotel | Booking & Reservations Derabassi | +91-1762-506147',
    description: 'Contact Deewan Residency for hotel bookings and inquiries. Located on Amb-Chandigarh Highway, Derabassi, Mohali. Call +91-1762-506147 or email thedeewanhotel@gmail.com for best rates!',
    keywords: 'contact deewan residency, hotel booking derabassi, reservation mohali, hotel phone number derabassi, book hotel near sukhmani college, derabassi hotel contact, amb chandigarh highway hotel booking',
    structuredData: [
      generateBreadcrumbStructuredData([
        { name: 'Home', url: HOTEL_INFO.url },
        { name: 'Contact', url: `${HOTEL_INFO.url}/contact` }
      ]),
      generateFAQStructuredData(HOTEL_FAQS.booking)
    ]
  }
};

// Function to update document head with SEO data
export const updateSEO = (seoData: SEOData) => {
  // Update title
  document.title = seoData.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const attribute = property ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', seoData.description);
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords);
  }

  // Open Graph tags
  updateMetaTag('og:title', seoData.title, true);
  updateMetaTag('og:description', seoData.description, true);
  updateMetaTag('og:type', seoData.type || 'website', true);
  updateMetaTag('og:url', seoData.url || window.location.href, true);
  updateMetaTag('og:site_name', 'Deewan Residency', true);
  
  if (seoData.image) {
    updateMetaTag('og:image', seoData.image, true);
    updateMetaTag('og:image:alt', seoData.title, true);
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', seoData.title);
  updateMetaTag('twitter:description', seoData.description);
  if (seoData.image) {
    updateMetaTag('twitter:image', seoData.image);
  }

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = seoData.url || window.location.href;

  // Structured data
  if (seoData.structuredData) {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data
    const structuredDataArray = Array.isArray(seoData.structuredData) 
      ? seoData.structuredData 
      : [seoData.structuredData];

    structuredDataArray.forEach(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });
  }
};

// Hook for easy SEO management in React components
export const useSEO = (pageKey: keyof typeof SEO_CONFIGS, customData?: Partial<SEOData>) => {
  const seoConfig = SEO_CONFIGS[pageKey];
  
  // Update SEO when component mounts or data changes
  useEffect(() => {
    const finalSEOData = { ...seoConfig, ...customData };
    updateSEO(finalSEOData);
  }, [seoConfig, customData]);
};