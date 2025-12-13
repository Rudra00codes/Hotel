# Deewan Residency - Sanity CMS Client Guide

## 🎯 Overview

This guide will help you manage all content on the Deewan Residency website through Sanity CMS. No technical knowledge required!

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Accessing the Admin Panel](#accessing-the-admin-panel)
3. [Managing Room Information](#managing-room-information)
4. [Managing Amenities](#managing-amenities)
5. [Managing Dining Options](#managing-dining-options)
6. [Gallery Management](#gallery-management)
7. [Team Members](#team-members)
8. [Hotel Settings](#hotel-settings)
9. [Tips & Best Practices](#tips--best-practices)
10. [Troubleshooting](#troubleshooting)
11. [Support](#support)

---

## 🚀 Getting Started

### What is Sanity CMS?

Sanity is a content management system that lets you update your hotel website without touching any code. Think of it as a user-friendly dashboard where you can:
- Add/edit/delete rooms
- Update prices and availability
- Upload and organize photos
- Manage amenities and services
- Update contact information
- Add team members

### Prerequisites

- Email invitation from administrator (check your inbox/spam)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Hotel images ready for upload (JPG or PNG format)

---

## 🔐 Accessing the Admin Panel

### Step 1: Accept Invitation

1. Check your email for an invitation from Sanity
2. Click the **"Accept Invitation"** link
3. Create your Sanity account (use a strong password)
4. Verify your email address

### Step 2: Sign In

1. Visit: **https://deewan-residency.sanity.studio** (bookmark this!)
2. Click **"Sign In"**
3. Enter your email and password
4. You'll see the main dashboard

### Dashboard Overview

The dashboard has a left sidebar with sections:
- **Rooms** - Manage room types and details
- **Room Pricing** - Update pricing information
- **Gallery Images** - Upload and organize photos
- **Hotel Amenities** - Manage facilities and services
- **Dining Options** - Restaurant and food services
- **Team Members** - Staff profiles
- **Hotel Settings** - Contact info and general settings

---

## 🏨 Managing Room Information

### Adding a New Room

1. Click **"Rooms"** in the left sidebar
2. Click the **"+"** button (top right)
3. Fill in the following information:

#### Basic Information Tab
- **Room Name**: e.g., "Deluxe King Room"
- **Room ID**: Click "Generate" (creates URL-friendly name)
- **Room Category**: Select Standard, Deluxe, or Suite
- **Description**: Write 2-3 sentences about the room (50-500 characters)
- **Published**: Toggle ON to show room on website

#### Room Details Tab
- **Maximum Occupancy**: Number of guests (1-10)
- **Room Size**: e.g., "350 sq ft"
- **Room Features**: Click "Add item" for each feature
  - Examples: "King-size bed", "City view", "Workspace"
- **Room Amenities**: Select from predefined list
  - Check all that apply (WiFi, AC, TV, etc.)

#### Pricing Tab
- **Price Range (Display)**: e.g., "₹4,000 - ₹5,500"
  - This appears on the website
- **Base Price**: Enter numeric value (e.g., 4000)
  - Used for sorting rooms by price

#### Images & Gallery Tab
- **Room Images**: Click "Upload" to add photos
  - Upload 3-5 high-quality images
  - First image is the main thumbnail
  - **Alternative Text**: Describe the image (e.g., "Deluxe room with king bed")
  - **Caption**: Optional short description
- **Additional Gallery**: Link to gallery images (optional)

4. Click **"Publish"** (top right) to save and make live

### Editing an Existing Room

1. Click **"Rooms"** in sidebar
2. Click on the room you want to edit
3. Make your changes
4. Click **"Publish"** to save

### Deleting a Room

**Option 1: Hide (Recommended)**
1. Open the room
2. Scroll to "Published" toggle
3. Turn it **OFF**
4. Click "Publish"
5. Room is now hidden from website but not deleted

**Option 2: Permanently Delete**
1. Open the room
2. Click the three dots (⋯) menu (top right)
3. Select **"Delete"**
4. Confirm deletion

---

## 🎯 Managing Room Pricing

### Updating Prices

1. Click **"Room Pricing"** in sidebar
2. Click on a room type (e.g., "Deluxe Rooms")
3. Update the fields:
   - **Room Type**: Name of the category
   - **Minimum Price**: Lowest rate (₹)
   - **Maximum Price**: Highest rate (₹)
   - **Currency**: INR (default)
   - **Pricing Notes**: Seasonal info, discounts, etc.
4. **Last Updated**: Automatically set to current date
5. Click **"Publish"**

### Best Practices for Pricing
- Update prices seasonally (summer, winter, festivals)
- Use "Pricing Notes" for special offers
- Keep minimum/maximum realistic to your actual rates

---

## 🖼️ Gallery Management

### Uploading New Images

1. Click **"Gallery Images"** in sidebar
2. Click the **"+"** button
3. Fill in the form:
   - **Image Title**: Descriptive name (e.g., "Hotel Lobby Entrance")
   - **Category**: Select one:
     - Rooms: Interior room photos
     - Dining: Restaurant and food
     - Amenities: Facilities like gym, pool
     - Exterior: Building, parking, grounds
   - **Image**: Click "Upload" and select your photo
   - **Alternative Text**: Describe the image (SEO important!)
   - **Caption**: Short description shown under image
   - **Description**: Longer description (optional)
4. Click **"Publish"**

### Organizing Gallery Images

- **By Category**: Use the category filter in the gallery list
- **Sort Order**: Images display newest first
- **Best Image Sizes**: 
  - Minimum: 1200x800 pixels
  - Maximum: 10MB file size
  - Format: JPG or PNG

### Deleting Gallery Images

1. Open the image
2. Click three dots (⋯) → **"Delete"**
3. Confirm deletion

---

## 🍽️ Managing Amenities

### Adding a New Amenity

1. Click **"Hotel Amenities"** in sidebar
2. Click **"+"** button
3. Fill in:
   - **Amenity Name**: e.g., "24/7 Gym"
   - **Category**: Dining, Business, or Recreation
   - **Description**: What this amenity offers
   - **Image**: Upload a photo
   - **Operating Hours**: e.g., "6:00 AM - 11:00 PM"
   - **Contact Info**: Phone number if applicable
   - **Features**: Add individual features (click "Add item")
4. Click **"Publish"**

### Editing Amenities

1. Click **"Hotel Amenities"**
2. Select the amenity
3. Update information
4. Click **"Publish"**

---

## 🍴 Managing Dining Options

### Adding a Restaurant/Dining Service

1. Click **"Dining Options"** in sidebar
2. Click **"+"** button
3. Fill in the information:
   - **Restaurant/Service Name**: e.g., "Punjab Rasoi Restaurant"
   - **Description**: About the dining experience
   - **Image**: Upload restaurant photo
   - **Operating Hours**: e.g., "7:00 AM - 11:00 PM"
   - **Contact Phone**: For reservations
   - **Cuisine Types**: Select all that apply
     - North Indian, South Indian, Chinese, Continental, etc.
   - **Features**: Add items like "Outdoor Seating", "Room Service"
   - **Menu Highlights**: Add popular dishes
     - Dish Name: e.g., "Butter Chicken"
     - Description: Brief description
     - Vegetarian: Check if yes
     - Spicy: Check if yes
4. Click **"Publish"**

---

## 👥 Team Members

### Adding Staff Profiles

1. Click **"Team Members"** in sidebar
2. Click **"+"** button
3. Enter details:
   - **Full Name**: Staff member's name
   - **Job Position**: e.g., "General Manager"
   - **Biography**: 2-3 sentences about experience
   - **Specialization**: Area of expertise (optional)
   - **Photo**: Upload professional headshot
   - **Email**: Work email (optional)
   - **Phone**: Work phone (optional)
4. Click **"Publish"**

### Best Practices
- Use professional photos (business attire, neutral background)
- Keep biographies concise and professional
- Include only key staff visible to guests

---

## ⚙️ Hotel Settings

### Updating General Settings

1. Click **"Hotel Settings"** in sidebar
2. **Only ONE settings document should exist**
3. Update the following:

#### Basic Information
- **Hotel Name**: Deewan Residency
- **Hotel Description**: Brief tagline or description
- **Logo**: Upload hotel logo

#### Contact Information
- **Full Address**: Complete street address
- **City**: Derabassi
- **State**: Punjab
- **Postal Code**: 140507
- **Primary Phone**: 01762-506147
- **Secondary Phone**: 01762-506146
- **Email**: thedeewanhotel@gmail.com
- **Website URL**: https://deewan-residency.com

#### Social Media Links
- **Facebook**: Full URL to Facebook page
- **Instagram**: Full URL to Instagram profile
- **Twitter**: Full URL to Twitter profile

#### Hotel Details
- **Check-in Time**: e.g., "14:00" (2:00 PM)
- **Check-out Time**: e.g., "12:00" (12:00 PM)
- **Total Number of Rooms**: 25 (example)
- **Star Rating**: 1-5 (can use decimals like 4.5)

#### Business Hours
- Set hours for each day of the week
- Example: "8:00 AM - 8:00 PM"
- For closed days: "Closed"

4. Click **"Publish"** to save

---

## 💡 Tips & Best Practices

### Images

✅ **DO:**
- Use high-resolution images (at least 1200x800px)
- Take photos in good lighting
- Show rooms from multiple angles
- Include both wide shots and detail shots
- Compress images before uploading (use TinyPNG.com)

❌ **DON'T:**
- Upload blurry or dark photos
- Use stock photos (use real hotel photos)
- Exceed 10MB per image
- Forget alternative text (important for SEO)

### Writing Descriptions

✅ **DO:**
- Be descriptive but concise
- Highlight unique features
- Use proper grammar and spelling
- Mention nearby attractions (Sukhmani College, Chandigarh)
- Include measurements and numbers

❌ **DON'T:**
- Use ALL CAPS
- Exaggerate or mislead
- Copy-paste from other hotels
- Use technical jargon

### Publishing Changes

✅ **DO:**
- Always click "Publish" to save changes
- Preview changes before publishing
- Update related content together (e.g., room + pricing)
- Check the live website after major updates

❌ **DON'T:**
- Leave drafts unpublished for too long
- Make changes directly on live site without reviewing
- Publish incomplete information

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Issue: Can't see "Publish" button
**Solution**: Scroll to the top right of the editor. The button might be hidden if you're zoomed in.

#### Issue: Image upload fails
**Solutions**:
- Check file size (must be under 10MB)
- Try a different browser
- Ensure stable internet connection
- Convert image to JPG format

#### Issue: Changes not appearing on website
**Solutions**:
1. Verify you clicked "Publish" (not just "Save")
2. Wait 2-3 minutes for changes to go live
3. Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
4. Try viewing in incognito/private mode

#### Issue: Forgot password
**Solution**:
1. Go to https://deewan-residency.sanity.studio
2. Click "Forgot Password?"
3. Enter your email
4. Follow reset link in email

#### Issue: Can't delete an item
**Solution**: 
- Some items might be referenced elsewhere
- Try unpublishing instead of deleting
- Contact support if critical

---

## 📞 Support

### Getting Help

**Email**: adityapunj639@gmail.com (Developer Support)  
**Phone**: [Your phone number]  
**Response Time**: Within 24 hours (business days)

### When contacting support, include:

1. **Description of the issue**: What happened? What were you trying to do?
2. **Screenshots**: Take a screenshot showing the problem
3. **Browser information**: Chrome, Firefox, Safari, etc.
4. **Your name and email**: So we can follow up

---

## 📚 Quick Reference

### Publishing Checklist

Before clicking "Publish", verify:

- [ ] All required fields filled in
- [ ] Spell-check complete
- [ ] Images uploaded and have alt text
- [ ] Pricing is accurate
- [ ] Contact information is current
- [ ] Changes reviewed for accuracy

### Recommended Update Schedule

| Content Type | Update Frequency |
|-------------|------------------|
| Room Pricing | Monthly or seasonal |
| Gallery Images | Monthly (add new photos) |
| Amenities | Quarterly (or when changed) |
| Dining Menu | Monthly |
| Team Members | As staff changes |
| Hotel Settings | Only when information changes |
| Special Offers | Weekly (if applicable) |

---

## 🎓 Training Resources

### Video Tutorials (When Available)
- How to add a new room
- How to update pricing
- How to upload and organize gallery images
- How to edit hotel settings

### Practice Area
- Test changes in a draft before publishing
- Use "Unpublish" to hide test content

---

## 🔒 Security Best Practices

1. **Never share your login credentials**
2. **Use a strong password** (at least 12 characters, mix of letters, numbers, symbols)
3. **Log out when done**, especially on shared computers
4. **Change password every 3-6 months**
5. **Enable two-factor authentication** if available

---

## 📝 Content Guidelines

### Room Descriptions Should Include:
- Bed type and size
- Room size (sq ft)
- View type (city, garden, etc.)
- Notable features (balcony, workspace)
- Maximum occupancy

### Amenity Descriptions Should Include:
- What it is
- When it's available
- Who can use it
- Special features or equipment
- Location in hotel (if applicable)

---

## ✅ Final Notes

- **Backup is automatic** - Sanity saves version history
- **Multiple users can edit** - But one person at a time per document
- **Changes are reversible** - Use the History tab to restore previous versions
- **Mobile friendly** - You can make quick edits from your phone

**Remember**: Always click **"Publish"** to make changes live!

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**For**: Deewan Residency Hotel Management

For the latest version of this guide or technical documentation, contact: adityapunj639@gmail.com
