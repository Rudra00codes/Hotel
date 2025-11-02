// SEO utilities for Deewan Residency website
import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: any;
}

// Hotel information for structured data
export const HOTEL_INFO = {
  name: 'Deewan Residency',
  description: 'Premium hotel accommodation on Amb-Chd Highway, Derabassi, Mohali with modern amenities and excellent service.',
  address: {
    streetAddress: 'Amb-Chd Highway, Sukhmani College',
    addressLocality: 'Derabassi',
    addressRegion: 'Mohali',
    addressCountry: 'IN',
    postalCode: '140507'
  },
  telephone: ['+91-1762-506147', '+91-1762-506146'],
  email: 'thedeewanhotel@gmail.com',
  url: 'https://deewan-residency.com',
  image: '/images/hotel-exterior.jpg',
  priceRange: '₹₹',
  starRating: 4,
  checkinTime: '14:00',
  checkoutTime: '12:00'
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
    ]
  };
};

// Page-specific SEO configurations
export const SEO_CONFIGS = {
  home: {
    title: 'Deewan Residency - Premium Hotel in Derabassi, Mohali | Amb-Chd Highway',
    description: 'Experience luxury accommodation at Deewan Residency, located on Amb-Chd Highway, Derabassi. Modern rooms, excellent amenities, and exceptional service. Book your stay today.',
    keywords: 'hotel derabassi, accommodation mohali, deewan residency, amb chd highway hotel, sukhmani college hotel, punjab hotel booking',
    structuredData: [generateHotelStructuredData(), generateLocalBusinessStructuredData()]
  },
  rooms: {
    title: 'Hotel Rooms & Suites - Deewan Residency Derabassi',
    description: 'Discover our comfortable and well-appointed rooms at Deewan Residency. Choose from Standard, Deluxe, and Suite options with modern amenities and excellent service.',
    keywords: 'hotel rooms derabassi, suite accommodation mohali, deluxe rooms punjab, standard rooms amb chd highway'
  },
  amenities: {
    title: 'Hotel Amenities & Facilities - Deewan Residency',
    description: 'Explore the premium amenities at Deewan Residency including restaurant, business center, free WiFi, room service, and more. Everything you need for a comfortable stay.',
    keywords: 'hotel amenities derabassi, business facilities mohali, restaurant hotel punjab, wifi parking room service'
  },
  dining: {
    title: 'Restaurant & Dining - Deewan Residency Derabassi',
    description: 'Enjoy delicious cuisine at Deewan Residency restaurant. We offer a variety of local and international dishes with room service available 24/7.',
    keywords: 'restaurant derabassi, hotel dining mohali, room service punjab, food amb chd highway'
  },
  gallery: {
    title: 'Photo Gallery - Deewan Residency Hotel Images',
    description: 'Browse our photo gallery to see the beautiful rooms, amenities, and facilities at Deewan Residency. Get a glimpse of your perfect stay in Derabassi.',
    keywords: 'hotel photos derabassi, deewan residency images, room pictures mohali, hotel gallery punjab'
  },
  about: {
    title: 'About Us - Deewan Residency Hotel Derabassi',
    description: 'Learn about Deewan Residency, your premier choice for accommodation in Derabassi, Mohali. Discover our commitment to excellence and hospitality.',
    keywords: 'about deewan residency, hotel history derabassi, hospitality mohali, hotel information punjab'
  },
  contact: {
    title: 'Contact Us - Deewan Residency Hotel Booking & Information',
    description: 'Contact Deewan Residency for reservations and inquiries. Located on Amb-Chd Highway, Derabassi. Call +91-1762-506147 or email thedeewanhotel@gmail.com',
    keywords: 'contact deewan residency, hotel booking derabassi, reservation mohali, hotel phone number email'
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
  const finalSEOData = { ...seoConfig, ...customData };
  
  // Update SEO when component mounts or data changes
  useEffect(() => {
    updateSEO(finalSEOData);
  }, [finalSEOData]);
};