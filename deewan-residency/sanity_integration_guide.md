# Sanity.io Integration - Hotel WebApp Complete Setup

## 📋 TABLE OF CONTENTS
1. [Initial Setup](#initial-setup)
2. [Sanity Studio Configuration](#sanity-studio-configuration)
3. [Content Schemas](#content-schemas)
4. [React Integration](#react-integration)
5. [Environment Configuration](#environment-configuration)
6. [Data Migration](#data-migration)
7. [Component Updates](#component-updates)
8. [Testing & Deployment](#testing--deployment)
9. [Client Handoff](#client-handoff)

---

## 🚀 INITIAL SETUP

### **Step 1: Create Sanity Project**

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Create new Sanity project
sanity init

# Follow prompts:
# - Project name: deewan-residency
# - Use default dataset configuration: Yes
# - Project template: Clean project with no predefined schema types
# - Output path: ./sanity
```

### **Step 2: Install Dependencies in React App**

```bash
cd deewan-residency  # Your React project root

# Install Sanity client and utilities
npm install @sanity/client @sanity/image-url next-sanity

# Optional: Image builder for responsive images
npm install @sanity/image-url
```

### **Step 3: Project Structure**

```
deewan-residency/
├── sanity/                          # Sanity Studio files
│   ├── schemaTypes/
│   │   ├── index.ts
│   │   ├── room.ts                 # Room schema
│   │   ├── pricing.ts              # Pricing schema
│   │   ├── gallery.ts              # Gallery images schema
│   │   ├── amenity.ts              # Amenities schema
│   │   ├── dining.ts               # Dining options schema
│   │   ├── team.ts                 # Team members schema
│   │   └── settings.ts             # Hotel settings schema
│   ├── sanity.config.ts            # Main config
│   └── package.json
├── src/
│   ├── lib/
│   │   ├── sanity.ts               # Sanity client config
│   │   └── imageBuilder.ts         # Image optimization
│   ├── utils/
│   │   ├── imageOptimization.ts    # (existing - keep it)
│   │   └── sanityQueries.ts        # GROQ queries
│   └── ...
└── ...
```

---

## 🏗️ SANITY STUDIO CONFIGURATION

### **Step 1: Create sanity.config.ts**

```typescript
// sanity/sanity.config.ts
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'deewan_residency',
  title: 'Deewan Residency Hotel CMS',
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || '',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool(),
    visionTool(), // Query builder for debugging
  ],

  schema: {
    types: schemaTypes,
  },

  // Custom branding
  studio: {
    components: {
      logo: () => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>🏨 Deewan Residency</h2>
          <p>Hotel Management System</p>
        </div>
      ),
    },
  },
})
```

### **Step 2: Create sanity/package.json**

```json
{
  "name": "deewan-residency-studio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "sanity dev",
    "start": "sanity start",
    "build": "sanity build",
    "deploy": "sanity deploy"
  },
  "devDependencies": {
    "@sanity/cli": "^3.21.0"
  },
  "dependencies": {
    "@sanity/ui": "^2.0.0",
    "@sanity/icons": "^2.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

## 📊 CONTENT SCHEMAS

### **Schema 1: Room Schema**

```typescript
// sanity/schemaTypes/room.ts
import {defineField, defineType} from 'sanity'

export const room = defineType({
  name: 'room',
  title: 'Hotel Rooms',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information' },
    { name: 'details', title: 'Details & Amenities' },
    { name: 'pricing', title: 'Pricing' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Room Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),

    defineField({
      name: 'roomId',
      title: 'Room ID (slug)',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Room Category',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Deluxe', value: 'deluxe' },
          { title: 'Suite', value: 'suite' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Room Description',
      type: 'text',
      group: 'basic',
      validation: (Rule) => Rule.required().min(20).max(500),
    }),

    defineField({
      name: 'maxOccupancy',
      title: 'Maximum Occupancy',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),

    defineField({
      name: 'size',
      title: 'Room Size (sq ft)',
      type: 'string',
      group: 'details',
      placeholder: '200 sq ft',
    }),

    defineField({
      name: 'features',
      title: 'Room Features',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'feature', type: 'string', title: 'Feature' },
          ],
        },
      ],
    }),

    defineField({
      name: 'amenities',
      title: 'Room Amenities',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Free Wi-Fi',
          'Air Conditioning',
          'LED TV',
          'Private Bathroom',
          'Room Service',
          'Daily Housekeeping',
          'Tea/Coffee Maker',
          'Mini Bar',
          'Balcony',
          'Work Desk',
          'Wardrobe',
          'Mini Fridge',
        ],
      },
    }),

    defineField({
      name: 'priceRange',
      title: 'Price Range (Display Text)',
      type: 'string',
      group: 'pricing',
      placeholder: '₹2,500 - ₹3,000',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'basePrice',
      title: 'Base Price (for sorting)',
      type: 'number',
      group: 'pricing',
      description: 'Lowest price in range (for sorting)',
    }),

    defineField({
      name: 'images',
      title: 'Room Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'asset',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text (SEO)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Image Caption',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'gallery',
      title: 'Associated Gallery Images',
      type: 'array',
      group: 'media',
      of: [{ type: 'reference', to: [{ type: 'galleryImage' }] }],
    }),

    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Hide room from website if unpublished',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category',
      image: 'images.0.asset',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.category?.toUpperCase(),
        media: selection.image,
      }
    },
  },
})
```

### **Schema 2: Pricing Schema**

```typescript
// sanity/schemaTypes/pricing.ts
import {defineField, defineType} from 'sanity'

export const pricing = defineType({
  name: 'pricing',
  title: 'Room Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'roomType',
      title: 'Room Type',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Deluxe', value: 'deluxe' },
          { title: 'Suite', value: 'suite' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'minPrice',
      title: 'Minimum Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(100),
    }),

    defineField({
      name: 'maxPrice',
      title: 'Maximum Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'INR',
      readOnly: true,
    }),

    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'notes',
      title: 'Pricing Notes',
      type: 'text',
      description: 'Seasonal variations, special offers, etc.',
    }),
  ],

  preview: {
    select: {
      title: 'roomType',
      min: 'minPrice',
      max: 'maxPrice',
    },
    prepare(selection) {
      return {
        title: `${selection.title} Room`,
        subtitle: `₹${selection.min} - ₹${selection.max}`,
      }
    },
  },
})
```

### **Schema 3: Gallery Image Schema**

```typescript
// sanity/schemaTypes/gallery.ts
import {defineField, defineType} from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Images',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Rooms', value: 'rooms' },
          { title: 'Dining', value: 'dining' },
          { title: 'Amenities', value: 'amenities' },
          { title: 'Exterior', value: 'exterior' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text (SEO)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.category,
        media: selection.image,
      }
    },
  },
})
```

### **Schema 4: Amenity Schema**

```typescript
// sanity/schemaTypes/amenity.ts
import {defineField, defineType} from 'sanity'

export const amenity = defineType({
  name: 'amenity',
  title: 'Hotel Amenities',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Amenity Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dining', value: 'dining' },
          { title: 'Business', value: 'business' },
          { title: 'Recreation', value: 'recreation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'string',
      placeholder: '6:00 AM - 11:00 PM',
    }),

    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'string',
      placeholder: '01762-506147',
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.category,
        media: selection.media,
      }
    },
  },
})
```

### **Schema 5: Dining Option Schema**

```typescript
// sanity/schemaTypes/dining.ts
import {defineField, defineType} from 'sanity'

export const diningOption = defineType({
  name: 'diningOption',
  title: 'Dining Options',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant/Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'operatingHours',
      title: 'Operating Hours',
      type: 'string',
      placeholder: '6:00 AM - 11:00 PM',
    }),

    defineField({
      name: 'contactInfo',
      title: 'Contact Phone',
      type: 'string',
    }),

    defineField({
      name: 'cuisineType',
      title: 'Cuisine Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'North Indian',
          'South Indian',
          'Chinese',
          'Continental',
          'Beverages',
          'Snacks',
          'Desserts',
        ],
      },
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'menuHighlights',
      title: 'Menu Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Dish Name' },
            { name: 'description', type: 'string', title: 'Description' },
            { name: 'isVegetarian', type: 'boolean', title: 'Vegetarian?' },
            { name: 'isSpicy', type: 'boolean', title: 'Spicy?' },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
```

### **Schema 6: Team Member Schema**

```typescript
// sanity/schemaTypes/team.ts
import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'position',
      title: 'Job Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'specialization',
      title: 'Specialization',
      type: 'string',
    }),

    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
})
```

### **Schema 7: Settings Schema (Hotel Info)**

```typescript
// sanity/schemaTypes/settings.ts
import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Hotel Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'hotelName',
      title: 'Hotel Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Hotel Description',
      type: 'text',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),

    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'string',
    }),

    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),

    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),

    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
    }),

    defineField({
      name: 'phone1',
      title: 'Primary Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'phone2',
      title: 'Secondary Phone',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),

    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'twitter', type: 'url', title: 'Twitter' },
      ],
    }),

    defineField({
      name: 'checkInTime',
      title: 'Check-in Time',
      type: 'string',
      initialValue: '14:00',
    }),

    defineField({
      name: 'checkOutTime',
      title: 'Check-out Time',
      type: 'string',
      initialValue: '12:00',
    }),

    defineField({
      name: 'totalRooms',
      title: 'Total Number of Rooms',
      type: 'number',
    }),

    defineField({
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        { name: 'monday', type: 'string', title: 'Monday' },
        { name: 'tuesday', type: 'string', title: 'Tuesday' },
        { name: 'wednesday', type: 'string', title: 'Wednesday' },
        { name: 'thursday', type: 'string', title: 'Thursday' },
        { name: 'friday', type: 'string', title: 'Friday' },
        { name: 'saturday', type: 'string', title: 'Saturday' },
        { name: 'sunday', type: 'string', title: 'Sunday' },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'hotelName',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Hotel Settings',
      }
    },
  },
})
```

### **Schema 8: Index File**

```typescript
// sanity/schemaTypes/index.ts
import {room} from './room'
import {pricing} from './pricing'
import {galleryImage} from './gallery'
import {amenity} from './amenity'
import {diningOption} from './dining'
import {teamMember} from './team'
import {settings} from './settings'

export const schemaTypes = [
  room,
  pricing,
  galleryImage,
  amenity,
  diningOption,
  teamMember,
  settings,
]
```

---

## 🔌 REACT INTEGRATION

### **Step 1: Create Sanity Client**

```typescript
// src/lib/sanity.ts
import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

if (!projectId) {
  throw new Error('Missing VITE_SANITY_PROJECT_ID environment variable')
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if you want fresh data always
})

// Query helper with error handling
export async function fetchSanityData(query: string, params = {}) {
  try {
    return await sanityClient.fetch(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}
```

### **Step 2: Create Image Builder**

```typescript
// src/lib/imageBuilder.ts
import imageUrlBuilder from '@sanity/image-url'
import {sanityClient} from './sanity'

const builder = imageUrlBuilder(sanityClient)

interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export function urlFor(source: SanityImageAsset | string) {
  return builder.image(source)
}

// Helper functions for common image sizes
export const imageUrlBuilders = {
  // Mobile thumbnail
  thumbnail: (source: SanityImageAsset | string) =>
    urlFor(source).width(400).height(300).fit('crop').auto('format').url(),

  // Hero image
  hero: (source: SanityImageAsset | string) =>
    urlFor(source).width(1920).height(600).fit('crop').auto('format').url(),

  // Room gallery
  gallery: (source: SanityImageAsset | string) =>
    urlFor(source).width(1200).height(800).fit('crop').auto('format').url(),

  // Responsive (returns object for srcSet)
  responsive: (source: SanityImageAsset | string) => ({
    mobile: urlFor(source).width(640).height(480).fit('crop').auto('format').url(),
    tablet: urlFor(source).width(1024).height(768).fit('crop').auto('format').url(),
    desktop: urlFor(source).width(1920).height(1440).fit('crop').auto('format').url(),
  }),
}
```

### **Step 3: Create GROQ Queries**

```typescript
// src/utils/sanityQueries.ts

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
`

---

## ⚙️ ENVIRONMENT CONFIGURATION

### **Step 1: Create Environment Variables File**

```bash
# .env.local (add to .gitignore)
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

### **Step 2: Find Your Sanity Credentials**

```bash
# In your Sanity project directory
cat sanity.config.ts  # Find projectId

# Or visit: https://manage.sanity.io/
# Project Settings → API → Your Project ID
```

### **Step 3: Create Public API Token (Optional)**

For deployment, you may need a read-only token:

```bash
# In Sanity CLI
sanity tokens create

# Name: frontend-read-only
# Permissions: Viewer (read-only)
# Copy the token to your .env file
```

---

## 📊 DATA MIGRATION

### **Step 1: Create Migration Script**

```typescript
// scripts/migrateToSanity.ts
import {sanityClient} from '../src/lib/sanity'
import {roomsData} from '../src/data/rooms'
import {amenitiesData} from '../src/data/amenities'
import {diningOptions} from '../src/data/dining'
import {teamMembers} from '../src/data/about'

async function migrateRooms() {
  console.log('Migrating rooms...')
  
  for (const room of roomsData) {
    const sanityRoom = {
      _type: 'room',
      name: room.name,
      roomId: {
        _type: 'slug',
        current: room.id,
      },
      category: room.category,
      description: room.description,
      maxOccupancy: room.maxOccupancy,
      size: room.size,
      priceRange: room.priceRange,
      basePrice: parseInt(room.priceRange.split('-')[0].replace(/[^\d]/g, '')),
      features: room.features.map(f => ({ _type: 'object', feature: f })),
      amenities: room.amenities,
      published: true,
      // Note: Images need to be uploaded manually or via API
    }
    
    try {
      const result = await sanityClient.create(sanityRoom)
      console.log(`✓ Created room: ${result._id}`)
    } catch (error) {
      console.error(`✗ Failed to create room ${room.name}:`, error)
    }
  }
}

async function migrateAmenities() {
  console.log('Migrating amenities...')
  
  for (const amenity of amenitiesData) {
    const sanityAmenity = {
      _type: 'amenity',
      name: amenity.name,
      category: amenity.category,
      description: amenity.description,
      operatingHours: amenity.operatingHours,
      contactInfo: amenity.contactInfo,
      features: amenity.features,
    }
    
    try {
      const result = await sanityClient.create(sanityAmenity)
      console.log(`✓ Created amenity: ${result._id}`)
    } catch (error) {
      console.error(`✗ Failed to create amenity ${amenity.name}:`, error)
    }
  }
}

async function migrateSettings() {
  console.log('Migrating hotel settings...')
  
  const settings = {
    _type: 'settings',
    hotelName: 'Deewan Residency',
    description: 'Experience comfort and luxury at Deewan Residency...',
    address: 'Amb-Chd Highway, Near Sukhmani College',
    city: 'Derabassi',
    state: 'Mohali, Punjab',
    postalCode: '140507',
    phone1: '01762-506147',
    phone2: '01762-506146',
    email: 'thedeewanhotel@gmail.com',
    website: 'https://deewan-residency.com',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    totalRooms: 25,
    starRating: 4.5,
    businessHours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
  }
  
  try {
    const result = await sanityClient.createOrReplace(settings)
    console.log(`✓ Created settings: ${result._id}`)
  } catch (error) {
    console.error('✗ Failed to create settings:', error)
  }
}

async function runMigration() {
  try {
    console.log('Starting migration to Sanity...\n')
    await migrateRooms()
    console.log()
    await migrateAmenities()
    console.log()
    await migrateSettings()
    console.log('\n✓ Migration completed!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
```

### **Step 2: Run Migration**

```bash
# Create a package.json script
"migrate": "npx ts-node scripts/migrateToSanity.ts"

# Run migration
npm run migrate
```

---

## 🔄 COMPONENT UPDATES

### **Updated: Rooms Page**

```typescript
// src/pages/Rooms.tsx (Updated for Sanity)
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { sanityClient } from '../lib/sanity'
import { ROOMS_QUERY } from '../utils/sanityQueries'
import { useSEO } from '../utils/seo'

interface Room {
  _id: string
  roomId: string
  name: string
  category: string
  description: string
  maxOccupancy: number
  size: string
  priceRange: string
  features: Array<{ feature: string }>
  amenities: string[]
  images: Array<{ url: string; alt: string }>
}

export default function Rooms() {
  useSEO('rooms')
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const data = await sanityClient.fetch(ROOMS_QUERY)
      setRooms(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching rooms:', err)
      setError('Failed to load rooms. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const roomCategories = [
    { id: 'all', name: 'All Rooms', count: rooms.length },
    {
      id: 'standard',
      name: 'Standard',
      count: rooms.filter(r => r.category === 'standard').length,
    },
    {
      id: 'deluxe',
      name: 'Deluxe',
      count: rooms.filter(r => r.category === 'deluxe').length,
    },
    {
      id: 'suite',
      name: 'Suite',
      count: rooms.filter(r => r.category === 'suite').length,
    },
  ]

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory)

  const handleViewDetails = (roomId: string) => {
    navigate(`/rooms/${roomId}`)
  }

  const handleInquiry = (roomId: string) => {
    const room = rooms.find(r => r.roomId === roomId)
    navigate('/contact', {
      state: {
        roomType: room?.name,
        inquiryType: 'booking',
      },
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-grotesk">Loading rooms...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-grotesk mb-4">{error}</p>
          <button
            onClick={fetchRooms}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-grotesk"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-grotesk font-extrabold mb-4 uppercase tracking-wide">
              Rooms & Suites
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-grotesk">
              Discover comfort and luxury in our thoughtfully designed accommodations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {roomCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-grotesk font-medium transition-all duration-200 tracking-wide ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={{
                id: room.roomId,
                name: room.name,
                category: room.category as 'standard' | 'deluxe' | 'suite',
                description: room.description,
                amenities: room.amenities,
                images: room.images.map(img => img.url),
                maxOccupancy: room.maxOccupancy,
                size: room.size,
                features: room.features.map(f => f.feature),
                priceRange: room.priceRange,
              }}
              onViewDetails={handleViewDetails}
              onInquiry={handleInquiry}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-grotesk font-medium text-gray-900 mb-2 tracking-wide">
              No rooms found
            </h3>
            <p className="text-gray-600 font-grotesk">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-grotesk mb-4 uppercase tracking-wide">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto font-grotesk">
            Our team is here to help you find the perfect room for your stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-grotesk font-medium hover:bg-gray-100 transition-colors duration-200 tracking-wide"
            >
              Contact Us
            </button>
            <a
              href="tel:01762-506147"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-grotesk font-medium hover:bg-blue-800 transition-colors duration-200 tracking-wide"
            >
              Call: 01762-506147
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### **Updated: Room Detail Page**

```typescript
// src/pages/RoomDetail.tsx (Updated for Sanity)
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RoomGallery from '../components/RoomGallery'
import InquiryForm from '../components/InquiryForm'
import { sanityClient } from '../lib/sanity'
import { ROOM_BY_ID_QUERY } from '../utils/sanityQueries'
import { useSEO } from '../utils/seo'

interface Room {
  _id: string
  name: string
  roomId: string
  category: string
  description: string
  maxOccupancy: number
  size: string
  priceRange: string
  features: Array<{ feature: string }>
  amenities: string[]
  images: Array<{ url: string; alt: string; caption?: string }>
}

export default function RoomDetail() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showInquiryForm, setShowInquiryForm] = useState(false)

  useEffect(() => {
    if (roomId) {
      fetchRoom()
    }
  }, [roomId])

  const fetchRoom = async () => {
    try {
      setLoading(true)
      const data = await sanityClient.fetch(ROOM_BY_ID_QUERY, { roomId })
      if (data) {
        setRoom(data)
        useSEO('rooms', {
          title: `${data.name} - Room Details | Deewan Residency Derabassi`,
          description: `Book the ${data.name} at Deewan Residency. ${data.description}`,
        })
      } else {
        setError('Room not found')
      }
    } catch (err) {
      console.error('Error fetching room:', err)
      setError('Failed to load room details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-grotesk">Loading room details...</p>
        </div>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-grotesk font-extrabold text-gray-900 mb-4 tracking-wide">
            Room Not Found
          </h1>
          <p className="text-gray-600 mb-8 font-grotesk">{error || 'The room you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/rooms')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-grotesk tracking-wide"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Room Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RoomGallery
            images={room.images.map(img => img.url)}
            roomName={room.name}
            className="mb-8"
          />
        </div>
      </div>

      {/* Room Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Room Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-grotesk font-extrabold text-gray-900 mb-2 tracking-wide uppercase">
                    {room.name}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white mr-4 ${
                      room.category === 'standard' ? 'bg-blue-600' :
                      room.category === 'deluxe' ? 'bg-purple-600' :
                      'bg-gold-600'
                    }`}>
                      {room.category.toUpperCase()}
                    </span>
                    <span className="text-lg font-grotesk font-semibold tracking-wide">{room.priceRange}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="font-grotesk">Up to {room.maxOccupancy} guests</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="font-grotesk">{room.size}</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed font-grotesk">{room.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-grotesk text-gray-900 mb-4 tracking-wide uppercase">Room Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-grotesk">{feature.feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-grotesk text-gray-900 mb-4 tracking-wide uppercase">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-grotesk">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-grotesk text-gray-900 mb-4 tracking-wide uppercase">Book This Room</h3>
              <p className="text-gray-600 mb-6 font-grotesk">
                Contact us to check availability and make a reservation for the {room.name}.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-blue-700 transition-colors tracking-wide"
                >
                  Check Availability
                </button>
                
                <div className="text-center text-gray-500">
                  <p className="text-sm font-grotesk">Or call us directly:</p>
                  <div className="mt-2 space-y-1">
                    <a href="tel:01762506147" className="block text-blue-600 hover:text-blue-700 font-grotesk font-medium">
                      01762-506147
                    </a>
                    <a href="tel:01762506146" className="block text-blue-600 hover:text-blue-700 font-grotesk font-medium">
                      01762-506146
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-grotesk text-gray-900 tracking-wide uppercase">Book {room.name}</h3>
                <button
                  onClick={() => setShowInquiryForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <InquiryForm
                prefilledRoomType={room.name}
                onSuccess={() => setShowInquiryForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### **Updated: Amenities Page**

```typescript
// src/pages/Amenities.tsx (Updated for Sanity)
import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity'
import { ALL_AMENITIES_QUERY } from '../utils/sanityQueries'
import AmenityCard from '../components/AmenityCard'
import CategoryFilter from '../components/CategoryFilter'
import { useSEO } from '../utils/seo'

interface Amenity {
  _id: string
  name: string
  category: string
  description: string
  image: string
  operatingHours?: string
  contactInfo?: string
  features: string[]
}

export default function Amenities() {
  useSEO('amenities')
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchAmenities()
  }, [])

  const fetchAmenities = async () => {
    try {
      setLoading(true)
      const data = await sanityClient.fetch(ALL_AMENITIES_QUERY)
      setAmenities(data)
    } catch (error) {
      console.error('Error fetching amenities:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['dining', 'business', 'recreation']
  const filteredAmenities = activeCategory
    ? amenities.filter(amenity => amenity.category === activeCategory)
    : amenities

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-grotesk font-extrabold mb-4 uppercase tracking-wide">
            Hotel Amenities & Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-grotesk">
            Discover our comprehensive range of facilities designed to make your stay comfortable
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories as any}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-grotesk">Loading amenities...</p>
          </div>
        ) : (
          <>
            {/* Amenities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredAmenities.map((amenity) => (
                <AmenityCard
                  key={amenity._id}
                  amenity={{
                    id: amenity._id,
                    name: amenity.name,
                    category: amenity.category as any,
                    description: amenity.description,
                    image: amenity.image,
                    operatingHours: amenity.operatingHours,
                    contactInfo: amenity.contactInfo,
                    features: amenity.features,
                  }}
                />
              ))}
            </div>

            {filteredAmenities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 font-grotesk">No amenities found in this category.</p>
              </div>
            )}
          </>
        )}

        {/* Contact CTA */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
            Need More Information?
          </h2>
          <p className="text-gray-600 mb-6 font-grotesk">
            Our friendly staff is available 24/7 to assist you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:01762-506147"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-blue-700 transition-colors tracking-wide"
            >
              📞 Call: 01762-506147
            </a>
            <a
              href="mailto:thedeewanhotel@gmail.com"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-gray-700 transition-colors tracking-wide"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 🧪 TESTING & DEPLOYMENT

### **Step 1: Test Sanity Connection**

```typescript
// src/pages/debug/SanityTest.tsx (Only for development)
import { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanity'

export default function SanityTest() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      const result = await sanityClient.fetch(`*[_type == "settings"][0]`)
      setData(result)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sanity Connection Test</h1>
      
      {loading && <p>Loading...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      {data && (
        <div>
          <p className="text-green-600 font-bold mb-4">✓ Connection successful!</p>
          <pre className="bg-gray-800 text-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
```

### **Step 2: Build & Deploy**

```bash
# Build the project
npm run build

# Test production build locally
npm run preview

```

### **Step 3: Environment Variables for Production**

Create `.env.production`:
```bash
VITE_SANITY_PROJECT_ID=cbloy2zn
VITE_SANITY_DATASET=production
```

---

## 📤 CLIENT HANDOFF

### **Step 1: Create Admin Credentials**

```bash
# In Sanity project
sanity manage

# Invite client as Editor:
# 1. Go to Team → Invite members
# 2. Enter client email
# 3. Select "Editor" role
# 4. Send invite
```

### **Step 2: Create Client Documentation**

```markdown
# Deewan Residency - Content Management Guide

## Accessing the Admin Panel

1. Visit: https://deewan-residency.sanity.studio
2. Sign in with your email (check for invite)
3. You'll see the main dashboard

## Managing Room Information

### Updating Room Details
1. Click **Rooms** in the left sidebar
2. Select a room from the list
3. Update information:
   - Name, Description
   - Occupancy, Size
   - Price Range
   - Amenities & Features
4. **Click "Publish"** to save changes
5. Changes go live within 2-3 minutes

### Updating Room Images
1. In room editor, scroll to **Images** section
2. Click **"Add image"**
3. Upload from your computer
4. Add descriptive alt text (important for SEO)
5. Click Publish

### Updating Prices
1. Click **Room Pricing** in sidebar
2. Select a room type (Standard, Deluxe, Suite)
3. Update minimum and maximum prices
4. Click **Publish**

## Managing Amenities

1. Click **Hotel Amenities** in sidebar
2. Click an amenity to edit
3. Update operating hours, contact info, features
4. Upload/change images
5. Click **Publish**

## Managing Dining Options

1. Click **Dining Options** in sidebar
2. Edit restaurant details:
   - Operating hours
   - Menu highlights
   - Cuisine types
3. Click **Publish**

## Adding Team Members

1. Click **Team Members** in sidebar
2. Click **"Create New"**
3. Fill in:
   - Name
   - Position
   - Biography
   - Upload photo
4. Click **Publish**

## Gallery Images

1. Click **Gallery Images** in sidebar
2. Click **"Create New"**
3. Upload image
4. Select category (Rooms, Dining, Amenities, Exterior)
5. Add description and alt text
6. Click **Publish**

## Hotel Settings

1. Click **Hotel Settings** in sidebar
2. Update:
   - Contact information
   - Business hours
   - Check-in/Check-out times
3. Click **Publish**

## Frequently Asked Questions

**Q: How long do changes take to appear?**
A: 2-3 minutes after clicking Publish

**Q: Can I undo changes?**
A: Yes! Click the **History** tab to see previous versions

**Q: How do I add more images to a room?**
A: In the room editor, scroll to Images section and click "Add image"

**Q: What image format should I use?**
A: JPG or PNG works best. Images up to 10MB

**Q: How do I change the hotel phone number?**
A: Go to Hotel Settings, update phone fields, then Publish

## Support

- Email: adityapunj639@gmail.com
- Phone: phone-number
- Response time: Within 24 hours

---

**Important:** Always click "Publish" after making changes for them to go live!
```

<!-- ### **Step 3: Record Tutorial Videos**

Create screen recordings for:
1. How to update room prices
2. How to add new room images
3. How to edit amenities
4. How to add team members
5. How to update contact information

**Tools:**
- Loom (easiest, free)
- OBS (powerful, free)
- ScreenFlow (Mac only)

### **Step 4: Provide Support Resources**

Create a Notion page or PDF with:
- Direct access link to Sanity Studio
- Screenshots of common tasks
- Video tutorial links
- Support contact information
- Common troubleshooting

--- -->

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Sanity project created and configured
- [ ] All schemas created and deployed to Sanity
- [ ] React app updated with Sanity client
- [ ] Environment variables set
- [ ] Initial data migrated to Sanity
- [ ] All components updated to fetch from Sanity
- [ ] Testing completed (local & production build)
- [ ] Client account created in Sanity
- [ ] Documentation created
- [ ] Tutorial videos recorded
- [ ] Client training session scheduled
- [ ] Support contact information provided
- [ ] Application deployed to Vercel
- [ ] DNS updated if using custom domain
- [ ] Monitoring/analytics setup
- [ ] Backup procedures documented

---

## 📊 SANITY PROJECT STRUCTURE SUMMARY

```
Sanity Studio Features:
├── 🏨 Hotel Management
│   ├── Room Management (6 fields: name, category, price, etc.)
│   ├── Pricing Management (dynamic price updates)
│   ├── Amenities Management (categorized)
│   ├── Dining Options (with menu highlights)
│   ├── Team Members (with photos)
│   └── Gallery Images (categorized)
│
├── 🔐 Security
│   ├── Client-specific login
│   ├── Editor permissions only
│   └── Audit trail of changes
│
├── 📱 Accessibility
│   ├── Mobile-friendly editor
│   ├── Real-time collaboration
│   └── Version history
│
└── 🔄 Integration
    ├── Real-time updates to React app
    ├── CDN image delivery
    └── API access for future features
```

---
