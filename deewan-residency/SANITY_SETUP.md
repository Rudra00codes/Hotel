# Sanity CMS Integration - Technical Setup Guide

## 📋 Overview

This document provides complete technical setup instructions for Sanity CMS integration with the Deewan Residency React application.

---

## 🏗️ Architecture

```
Project Structure:
├── deewan-residency/           # Main React app
│   ├── src/
│   │   ├── lib/
│   │   │   ├── sanity.ts       # Sanity client configuration
│   │   │   └── imageBuilder.ts # Image URL builder utilities
│   │   ├── utils/
│   │   │   └── sanityQueries.ts # GROQ queries
│   │   └── pages/              # React pages (will fetch from Sanity)
│   ├── .env.local              # Environment variables (NOT in git)
│   └── package.json
│
└── sanity/                     # Sanity Studio
    ├── sanity.config.ts        # Studio configuration
    ├── package.json            # Studio dependencies
    └── schemaTypes/            # Content schemas
        ├── index.ts            # Schema exports
        ├── room.ts             # Room schema
        ├── pricing.ts          # Pricing schema
        ├── gallery.ts          # Gallery images schema
        ├── amenity.ts          # Amenities schema
        ├── dining.ts           # Dining options schema
        ├── team.ts             # Team members schema
        └── settings.ts         # Hotel settings schema
```

---

## 🚀 Installation & Setup

### Step 1: Install Sanity CLI Globally

```bash
npm install -g @sanity/cli
```

### Step 2: Initialize Sanity Project

```bash
cd sanity
npm install
```

### Step 3: Create Sanity Project on sanity.io

```bash
cd sanity
sanity init
```

Follow the prompts:
- **Project name**: deewan-residency
- **Use default dataset configuration?**: Yes
- **Dataset name**: production
- **Output path**: ./
- **Select project template**: Clean project with no predefined schemas

This will:
- Create a new project on sanity.io
- Generate a `projectId`
- Configure the local studio

### Step 4: Update Environment Variables

After `sanity init`, you'll receive a **Project ID**. Copy it and update `.env.local`:

```bash
# In deewan-residency/.env.local
VITE_SANITY_PROJECT_ID=abc123xyz  # Replace with your actual project ID
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

Also update `sanity/.env`:

```bash
# In sanity/.env
SANITY_STUDIO_PROJECT_ID=abc123xyz  # Same project ID
SANITY_STUDIO_DATASET=production
```

### Step 5: Start Sanity Studio Locally

```bash
cd sanity
npm run dev
```

The studio will be available at: **http://localhost:3333**

### Step 6: Start React Development Server

In a separate terminal:

```bash
cd deewan-residency
npm run dev
```

React app will run at: **http://localhost:5173**

---

## 📊 Content Schemas

### 1. Room Schema (`room.ts`)

**Fields:**
- `name` (string): Room name
- `roomId` (slug): URL-friendly identifier
- `category` (string): standard | deluxe | suite
- `description` (text): Room description
- `maxOccupancy` (number): Max guests
- `size` (string): Room size (e.g., "300 sq ft")
- `features` (array of strings): Room features
- `amenities` (array of strings): Predefined amenities
- `priceRange` (string): Display price (e.g., "₹3,000 - ₹4,000")
- `basePrice` (number): Numeric price for sorting
- `images` (array of objects): Room images with alt text
- `gallery` (array of references): Additional gallery images
- `published` (boolean): Show/hide on website

### 2. Pricing Schema (`pricing.ts`)

**Fields:**
- `roomType` (string): Room category name
- `minPrice` (number): Minimum rate
- `maxPrice` (number): Maximum rate
- `currency` (string): INR | USD | EUR
- `lastUpdated` (datetime): Auto-updated
- `notes` (text): Pricing notes

### 3. Gallery Image Schema (`gallery.ts`)

**Fields:**
- `title` (string): Image title
- `category` (string): rooms | dining | amenities | exterior
- `image` (image): Image asset with hotspot
- `alt` (string): SEO alt text (required)
- `caption` (string): Image caption
- `description` (text): Longer description

### 4. Amenity Schema (`amenity.ts`)

**Fields:**
- `name` (string): Amenity name
- `category` (string): dining | business | recreation
- `description` (text): Amenity description
- `image` (image): Amenity image
- `operatingHours` (string): Operating hours
- `contactInfo` (string): Contact information
- `features` (array of strings): Feature list

### 5. Dining Option Schema (`dining.ts`)

**Fields:**
- `name` (string): Restaurant name
- `description` (text): Description
- `image` (image): Restaurant image
- `operatingHours` (string): Operating hours
- `contactInfo` (string): Contact phone
- `cuisineType` (array of strings): Cuisine types
- `features` (array of strings): Features
- `menuHighlights` (array of objects): Dish name, description, vegetarian, spicy

### 6. Team Member Schema (`team.ts`)

**Fields:**
- `name` (string): Full name
- `position` (string): Job position
- `bio` (text): Biography
- `specialization` (string): Specialization
- `image` (image): Photo
- `email` (string): Email
- `phone` (string): Phone

### 7. Settings Schema (`settings.ts`)

**Fields:**
- Hotel information (name, description, logo)
- Contact details (address, phone, email, website)
- Social media links (Facebook, Instagram, Twitter)
- Check-in/check-out times
- Total rooms, star rating
- Business hours (per day of week)

---

## 🔌 React Integration

### Sanity Client Configuration

**File**: `src/lib/sanity.ts`

```typescript
import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster reads (cached)
})
```

### Image URL Builder

**File**: `src/lib/imageBuilder.ts`

Provides utilities to generate optimized image URLs from Sanity assets:

```typescript
import imageUrlBuilder from '@sanity/image-url'
import {sanityClient} from './sanity'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

// Predefined sizes
export const imageUrlBuilders = {
  thumbnail: (source) => urlFor(source).width(400).height(300).auto('format').url(),
  gallery: (source) => urlFor(source).width(1200).height(800).auto('format').url(),
  hero: (source) => urlFor(source).width(1920).height(600).auto('format').url(),
}
```

### GROQ Queries

**File**: `src/utils/sanityQueries.ts`

Contains all content fetching queries. Examples:

```typescript
// Get all published rooms
export const ROOMS_QUERY = `
  *[_type == "room" && published == true] | order(basePrice asc) {
    _id,
    name,
    "roomId": roomId.current,
    category,
    description,
    maxOccupancy,
    size,
    priceRange,
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
    priceRange,
    features,
    amenities,
    "images": images[] {
      "url": asset->url,
      alt,
    },
  }
`
```

---

## 🔄 Data Fetching Pattern

### Example: Fetching Rooms in React Component

```typescript
import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity'
import { ROOMS_QUERY } from '../utils/sanityQueries'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true)
        const data = await sanityClient.fetch(ROOMS_QUERY)
        setRooms(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchRooms()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {rooms.map((room) => (
        <div key={room._id}>
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <img src={room.images[0]?.url} alt={room.images[0]?.alt} />
        </div>
      ))}
    </div>
  )
}
```

---

## 🎨 Image Optimization

### Using Image URL Builder

```typescript
import { imageUrlBuilders } from '../lib/imageBuilder'

// In your component
<img 
  src={imageUrlBuilders.thumbnail(room.images[0])} 
  alt={room.images[0].alt}
/>

// Or responsive images
const responsiveUrls = imageUrlBuilders.responsive(room.images[0])
<img 
  src={responsiveUrls.desktop}
  srcSet={`
    ${responsiveUrls.mobile} 640w,
    ${responsiveUrls.tablet} 1024w,
    ${responsiveUrls.desktop} 1920w
  `}
  alt={room.images[0].alt}
/>
```

---

## 📤 Deploying Sanity Studio

### Option 1: Deploy to Sanity Hosting (Recommended)

```bash
cd sanity
npm run build
sanity deploy
```

Follow prompts:
- Choose a studio hostname (e.g., `deewan-residency`)
- Studio will be available at: `https://deewan-residency.sanity.studio`

### Option 2: Deploy with Vercel/Netlify

1. Build the studio:
   ```bash
   cd sanity
   npm run build
   ```

2. Upload the `dist/` folder to your hosting service

---

## 🔐 User Permissions & Access

### Inviting Editors

1. Visit: https://manage.sanity.io/
2. Select your project: "deewan-residency"
3. Go to **Team** → **Invite Members**
4. Enter client's email
5. Select role: **Editor**
6. Send invitation

### Roles

- **Administrator**: Full access (you)
- **Editor**: Can create/edit/delete content (client)
- **Viewer**: Read-only access

---

## 🧪 Testing

### Test Sanity Connection

Create a test component:

```typescript
// src/pages/SanityTest.tsx
import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'

export default function SanityTest() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    sanityClient.fetch('*[_type == "settings"][0]')
      .then(setData)
      .catch(console.error)
  }, [])
  
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Missing VITE_SANITY_PROJECT_ID environment variable"

**Solution**: 
- Verify `.env.local` file exists in project root
- Confirm `VITE_SANITY_PROJECT_ID` is set
- Restart development server after adding env vars

#### 2. CORS Error

**Solution**:
- Go to https://manage.sanity.io/
- Project Settings → API → CORS Origins
- Add your domain: `http://localhost:5173` (for dev)
- Add production domain when deploying

#### 3. Images Not Loading

**Solution**:
- Check that images are published in Sanity Studio
- Verify image asset URLs in browser network tab
- Ensure `useCdn: true` in sanity client config

#### 4. Queries Returning Empty

**Solution**:
- Check that content is published (not just saved as draft)
- Verify query syntax in Sanity Vision tab
- Ensure dataset name matches (production vs development)

---

## 📚 Resources

- **Sanity Documentation**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Image URLs**: https://www.sanity.io/docs/image-url
- **React Integration**: https://www.sanity.io/guides/sanity-nextjs-guide

---

## 🔄 Data Migration (When Ready)

Once Sanity is fully set up, you can migrate existing static data:

1. Create migration script (optional - can also add manually via Studio)
2. Run migration to populate initial content
3. Test all pages to ensure data displays correctly
4. Remove static data files (`src/data/*.ts`) once confirmed working

**Note**: For now, components still use static data. Sanity integration is ready but components need updating.

---

## ✅ Setup Checklist

- [x] Sanity CLI installed globally
- [x] Sanity project initialized (`sanity init`)
- [x] Project ID obtained and added to `.env.local`
- [x] All 7 content schemas created
- [x] Sanity client configured in React app
- [x] GROQ queries written
- [x] Image URL builder set up
- [ ] Components updated to fetch from Sanity (next step)
- [ ] Initial content added via Sanity Studio
- [ ] Studio deployed to sanity.io
- [ ] Client invited as editor
- [ ] Testing completed

---

## 📞 Support

For technical issues with this integration, contact:
- **Developer**: adityapunj639@gmail.com
- **Sanity Support**: https://www.sanity.io/help

---

**Document Version**: 1.0  
**Created**: November 2025  
**Last Updated**: November 2025
