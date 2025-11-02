// About page data for Deewan Residency

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  specialization?: string;
}

export interface SustainabilityInitiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
}

export interface LocationHighlight {
  id: string;
  title: string;
  description: string;
  distance: string;
  icon: string;
}

// Brand Story
export const brandStory = {
  title: "Our Story",
  subtitle: "A Legacy of Hospitality Excellence",
  content: [
    "Nestled on the prestigious Amb-Chandigarh Highway, Deewan Residency has been a beacon of hospitality since its establishment. Our journey began with a simple yet profound vision: to create a home away from home for every traveler who walks through our doors.",
    "What started as a modest accommodation has evolved into a premier destination, combining traditional warmth with modern luxury. Our commitment to exceptional service and genuine care has made us a trusted choice for both business and leisure travelers.",
    "Today, we stand proud as a testament to unwavering dedication, continuous innovation, and the countless smiles we've created over the years."
  ],
  vision: "To be the most preferred hospitality destination on the Amb-Chandigarh Highway, known for exceptional service, modern amenities, and genuine warmth.",
  mission: "To provide every guest with an unforgettable experience through personalized service, contemporary comfort, and a commitment to excellence in everything we do.",
  values: [
    {
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service"
    },
    {
      title: "Integrity",
      description: "Honesty and transparency form the foundation of our relationships"
    },
    {
      title: "Innovation",
      description: "We continuously evolve to meet and exceed guest expectations"
    },
    {
      title: "Community",
      description: "We're committed to giving back and supporting our local community"
    }
  ]
};

// Awards & Recognition
export const awards: Award[] = [
  {
    id: "award-1",
    title: "TripAdvisor Certificate of Excellence",
    organization: "TripAdvisor",
    year: "2024",
    description: "Recognized for consistently excellent reviews and guest satisfaction",
    icon: "🏆"
  },
  {
    id: "award-2",
    title: "Best Highway Hotel - Punjab",
    organization: "Tourism Board Punjab",
    year: "2023",
    description: "Awarded for outstanding hospitality services on state highways",
    icon: "⭐"
  },
  {
    id: "award-3",
    title: "Guest Choice Award",
    organization: "Booking.com",
    year: "2024",
    description: "Chosen by guests for exceptional service and value",
    icon: "🎖️"
  },
  {
    id: "award-4",
    title: "4-Star Rating",
    organization: "Hotel Rating Authority",
    year: "2024",
    description: "Certified for premium facilities and service standards",
    icon: "⭐⭐⭐⭐"
  },
  {
    id: "award-5",
    title: "Business Traveler's Choice",
    organization: "Business Travel Magazine",
    year: "2023",
    description: "Top rated for business facilities and corporate services",
    icon: "💼"
  },
  {
    id: "award-6",
    title: "Hygiene Excellence Award",
    organization: "Food Safety Authority",
    year: "2024",
    description: "Outstanding cleanliness and food safety standards",
    icon: "✨"
  }
];

// Sustainability Initiatives
export const sustainabilityInitiatives: SustainabilityInitiative[] = [
  {
    id: "sustainability-1",
    title: "Energy Conservation",
    description: "LED lighting throughout the property, solar water heating systems, and energy-efficient HVAC systems reduce our carbon footprint by 40%",
    icon: "⚡",
    impact: "40% reduction in energy consumption"
  },
  {
    id: "sustainability-2",
    title: "Water Management",
    description: "Rainwater harvesting, water recycling systems, and low-flow fixtures ensure responsible water usage across all facilities",
    icon: "💧",
    impact: "30% water conservation achieved"
  },
  {
    id: "sustainability-3",
    title: "Waste Reduction",
    description: "Comprehensive recycling program, composting of organic waste, and elimination of single-use plastics from all operations",
    icon: "♻️",
    impact: "Zero single-use plastic policy"
  },
  {
    id: "sustainability-4",
    title: "Local Sourcing",
    description: "We partner with local farmers and suppliers to source fresh ingredients, supporting the community and reducing transportation emissions",
    icon: "🌾",
    impact: "85% locally sourced ingredients"
  },
  {
    id: "sustainability-5",
    title: "Green Spaces",
    description: "Native plant landscaping and rooftop gardens that promote biodiversity and provide natural cooling",
    icon: "🌳",
    impact: "2000+ native plants maintained"
  },
  {
    id: "sustainability-6",
    title: "Community Engagement",
    description: "Educational programs for local schools, employment opportunities for local residents, and support for community development projects",
    icon: "🤝",
    impact: "50+ local jobs created"
  }
];

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Rajesh Kumar",
    position: "General Manager",
    image: "/images/team/gm.jpg",
    bio: "With over 20 years in hospitality management, Rajesh leads our team with passion and dedication to excellence.",
    specialization: "Operations & Guest Relations"
  },
  {
    id: "team-2",
    name: "Priya Sharma",
    position: "Front Office Manager",
    image: "/images/team/fom.jpg",
    bio: "Priya ensures every guest receives a warm welcome and personalized attention throughout their stay.",
    specialization: "Guest Experience"
  },
  {
    id: "team-3",
    name: "Chef Amandeep Singh",
    position: "Executive Chef",
    image: "/images/team/chef.jpg",
    bio: "A culinary expert with expertise in both Indian and international cuisines, creating memorable dining experiences.",
    specialization: "Culinary Arts"
  },
  {
    id: "team-4",
    name: "Neha Verma",
    position: "Housekeeping Manager",
    image: "/images/team/hk.jpg",
    bio: "Leading our housekeeping team to maintain the highest standards of cleanliness and comfort.",
    specialization: "Facility Management"
  }
];

// Company Culture
export const companyCulture = {
  title: "Our Culture",
  description: "At Deewan Residency, we believe that happy employees create happy guests. Our culture is built on respect, growth, and excellence.",
  highlights: [
    {
      title: "Employee Development",
      description: "Continuous training and career advancement opportunities",
      icon: "📚"
    },
    {
      title: "Work-Life Balance",
      description: "Supportive policies that value personal well-being",
      icon: "⚖️"
    },
    {
      title: "Recognition Programs",
      description: "Celebrating achievements and exceptional service",
      icon: "🌟"
    },
    {
      title: "Inclusive Environment",
      description: "Diverse team united by shared values and goals",
      icon: "🌈"
    }
  ]
};

// Location Advantages
export const locationHighlights: LocationHighlight[] = [
  {
    id: "location-1",
    title: "Chandigarh International Airport",
    description: "Quick access to international and domestic flights",
    distance: "20 km (25 minutes)",
    icon: "✈️"
  },
  {
    id: "location-2",
    title: "Zirakpur Business District",
    description: "Major corporate offices and IT parks",
    distance: "8 km (10 minutes)",
    icon: "🏢"
  },
  {
    id: "location-3",
    title: "Rock Garden, Chandigarh",
    description: "Iconic sculpture garden and tourist attraction",
    distance: "25 km (30 minutes)",
    icon: "🎨"
  },
  {
    id: "location-4",
    title: "Sukhna Lake",
    description: "Scenic lake for morning walks and evening relaxation",
    distance: "28 km (35 minutes)",
    icon: "🏞️"
  },
  {
    id: "location-5",
    title: "Elante Mall",
    description: "Premier shopping and entertainment destination",
    distance: "22 km (28 minutes)",
    icon: "🛍️"
  },
  {
    id: "location-6",
    title: "Panchkula Hills",
    description: "Nature trails and weekend getaway spots",
    distance: "30 km (40 minutes)",
    icon: "⛰️"
  },
  {
    id: "location-7",
    title: "Rajpura Railway Station",
    description: "Major railway connectivity hub",
    distance: "15 km (20 minutes)",
    icon: "🚂"
  },
  {
    id: "location-8",
    title: "Industrial Area Phase 1 & 2",
    description: "Manufacturing and industrial hubs",
    distance: "5 km (8 minutes)",
    icon: "🏭"
  }
];

// Certifications
export const certifications = [
  {
    title: "ISO 9001:2015",
    description: "Quality Management System Certification"
  },
  {
    title: "FSSAI License",
    description: "Food Safety Standards Authority of India"
  },
  {
    title: "Fire Safety Certificate",
    description: "Compliant with all fire safety regulations"
  },
  {
    title: "Tourism License",
    description: "Approved by Punjab Tourism Department"
  }
];
