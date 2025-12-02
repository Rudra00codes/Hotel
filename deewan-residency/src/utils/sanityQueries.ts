/**
 * GROQ (Graph Retrieval Query Language) queries for Sanity
 * Documentation: https://www.sanity.io/docs/groq
 */

// Get all published rooms with images
export const ROOMS_QUERY = `
  *[_type == "room" && published == true] | order(basePrice asc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    "roomId": roomId.current,
    category,
    description,
    maxOccupancy,
    size,
    priceRange,
    basePrice,
    features,
    amenities,
    "images": images[] {
      "url": asset->url,
      alt,
      caption,
    },
  }
`

// Get single room by ID
export const ROOM_BY_ID_QUERY = `
  *[_type == "room" && roomId.current == $roomId][0] {
    _id,
    name,
    "roomId": roomId.current,
    category,
    description,
    maxOccupancy,
    size,
    priceRange,
    features,
    amenities,
    "images": images[] {
      "url": asset->url,
      alt,
      caption,
    },
  }
`

// Get all gallery images by category
export const GALLERY_BY_CATEGORY_QUERY = `
  *[_type == "galleryImage" && category == $category] | order(_createdAt desc) {
    _id,
    title,
    category,
    "url": image.asset->url,
    alt,
    caption,
    description,
  }
`

// Get all gallery images
export const ALL_GALLERY_QUERY = `
  *[_type == "galleryImage"] | order(category asc, _createdAt desc) {
    _id,
    title,
    category,
    "url": image.asset->url,
    alt,
    caption,
  }
`

// Get all amenities by category
export const AMENITIES_BY_CATEGORY_QUERY = `
  *[_type == "amenity" && category == $category] {
    _id,
    name,
    category,
    description,
    "image": image.asset->url,
    operatingHours,
    contactInfo,
    features,
  }
`

// Get all amenities
export const ALL_AMENITIES_QUERY = `
  *[_type == "amenity"] | order(category asc) {
    _id,
    name,
    category,
    description,
    "image": image.asset->url,
    operatingHours,
    contactInfo,
    features,
  }
`

// Get all dining options
export const DINING_OPTIONS_QUERY = `
  *[_type == "diningOption"] {
    _id,
    name,
    description,
    "image": image.asset->url,
    operatingHours,
    contactInfo,
    cuisineType,
    features,
    "menuHighlights": menuHighlights[] {
      name,
      description,
      isVegetarian,
      isSpicy,
    },
  }
`

// Get all pricing
export const PRICING_QUERY = `
  *[_type == "pricing"] | order(roomType asc) {
    _id,
    roomType,
    minPrice,
    maxPrice,
    currency,
    notes,
    lastUpdated,
  }
`

// Get all team members
export const TEAM_QUERY = `
  *[_type == "teamMember"] {
    _id,
    name,
    position,
    bio,
    specialization,
    "image": image.asset->url,
    email,
    phone,
  }
`

// Get hotel settings
export const SETTINGS_QUERY = `
  *[_type == "settings"][0] {
    hotelName,
    description,
    "logo": logo.asset->url,
    address,
    city,
    state,
    postalCode,
    phone1,
    phone2,
    email,
    website,
    socialMedia,
    checkInTime,
    checkOutTime,
    totalRooms,
    starRating,
    businessHours,
  }
`

// Get rooms by category
export const ROOMS_BY_CATEGORY_QUERY = `
  *[_type == "room" && category == $category && published == true] | order(basePrice asc) {
    _id,
    name,
    "roomId": roomId.current,
    category,
    description,
    maxOccupancy,
    size,
    priceRange,
    "images": images[] {
      "url": asset->url,
      alt,
    },
  }
`

// Count total rooms
export const ROOM_COUNT_QUERY = `
  count(*[_type == "room" && published == true])
`
