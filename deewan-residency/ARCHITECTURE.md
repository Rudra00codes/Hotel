# Deewan Residency - System Architecture

This document provides a comprehensive overview of the Deewan Residency hotel booking website architecture, including component relationships, data flow, and system integrations.

## High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        PWA[Progressive Web App]
        SW[Service Worker]
    end

    subgraph "Frontend Application"
        React[React 19.1.1]
        Router[React Router DOM]
        TailwindCSS[Tailwind CSS]
        TypeScript[TypeScript]
    end

    subgraph "Core Components"
        Layout[Layout Component]
        Pages[Page Components]
        Components[Reusable Components]
        Utils[Utility Functions]
    end

    subgraph "External Services"
        EmailJS[EmailJS Service]
        GoogleMaps[Google Maps API]
        Analytics[Analytics Services]
        Sanity[Sanity CMS]
    end

    subgraph "Performance & SEO"
        SEO[SEO Manager]
        Performance[Performance Monitor]
        LazyLoading[Lazy Loading]
        Caching[Caching Strategy]
    end

    Browser --> PWA
    PWA --> SW
    SW --> React
    React --> Router
    React --> TailwindCSS
    React --> TypeScript
    
    Router --> Layout
    Layout --> Pages
    Pages --> Components
    Components --> Utils
    
    Utils --> EmailJS
    Utils --> GoogleMaps
    Utils --> Analytics
    Utils --> Sanity
    
    React --> SEO
    React --> Performance
    Components --> LazyLoading
    SW --> Caching
```

## Component Architecture

```mermaid
graph TD
    subgraph "App Component"
        App[App.tsx]
        PerformanceMonitor[Performance Monitor]
        Layout[Layout Component]
    end

    subgraph "Layout Components"
        Header[Header]
        Navigation[Navigation]
        Footer[Footer]
    end

    subgraph "Page Components"
        Home[Home Page]
        Rooms[Rooms Page]
        RoomDetail[Room Detail Page]
        Dining[Dining Page]
        Gallery[Gallery Page]
        About[About Page]
        Contact[Contact Page]
        Privacy[Privacy Policy]
        Terms[Terms of Service]
    end

    subgraph "Shared Components"
        Hero[Hero Component]
        RoomCard[Room Card]
        ContactForm[Contact Form]
        BusinessBookingForm[Business Booking Form]
        DiningReservationForm[Dining Reservation Form]
        InquiryForm[Inquiry Form]
        Map[Map Component]
        LazyImage[Lazy Image Component]
        DiningCard[Dining Card]
        Gallery_Component[Gallery Component]
        CategoryFilter[Category Filter]
        RoomGallery[Room Gallery]
        BusinessFacilityCard[Business Facility Card]
    end

    App --> PerformanceMonitor
    App --> Layout
    Layout --> Header
    Layout --> Navigation
    Layout --> Footer
    
    App --> Home
    App --> Rooms
    App --> RoomDetail
    App --> Amenities
    App --> Dining
    App --> Gallery
    App --> About
    App --> Contact
    
    Home --> Hero
    Rooms --> RoomCard
    RoomDetail --> RoomGallery
    RoomDetail --> InquiryForm
    Amenities --> AmenityCard
    Amenities --> CategoryFilter
    Amenities --> BusinessFacilityCard
    Amenities --> BusinessBookingForm
    Dining --> DiningCard
    Dining --> DiningReservationForm
    Gallery --> Gallery_Component
    Contact --> ContactForm
    Contact --> Map
    
    RoomCard --> LazyImage
    Gallery_Component --> LazyImage
    DiningCard --> LazyImage
    AmenityCard --> LazyImage
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant React
    participant Components
    participant Utils
    participant EmailJS
    participant ServiceWorker

    User->>Browser: Visit Website
    Browser->>ServiceWorker: Check Cache
    ServiceWorker->>Browser: Return Cached/Fresh Content
    Browser->>React: Initialize App
    React->>Components: Render Components
    Components->>Utils: Load SEO Data
    Utils->>Components: Return SEO Config
    Components->>Browser: Update Meta Tags
    
    User->>Components: Fill Contact Form
    Components->>Utils: Validate Form Data
    Utils->>EmailJS: Send Email
    EmailJS->>Utils: Return Status
    Utils->>Components: Update UI
    Components->>User: Show Success/Error
    
    User->>Components: Navigate to Room
    Components->>Utils: Update SEO
    Utils->>Browser: Update Page Meta
    Components->>Utils: Track Performance
    Utils->>Browser: Log Metrics
```

## SEO & Performance Architecture

```mermaid
graph LR
    subgraph "SEO Layer"
        SEOUtils[SEO Utils]
        StructuredData[Structured Data]
        MetaTags[Meta Tags Manager]
        Sitemap[XML Sitemap]
        RobotsTxt[Robots.txt]
    end

    subgraph "Performance Layer"
        PerformanceUtils[Performance Utils]
        LazyLoading[Lazy Loading]
        CodeSplitting[Code Splitting]
        Caching[Browser Caching]
        WebVitals[Core Web Vitals]
    end

    subgraph "Monitoring"
        Analytics[Analytics Integration]
        ErrorTracking[Error Tracking]
        PerformanceMetrics[Performance Metrics]
    end

    SEOUtils --> StructuredData
    SEOUtils --> MetaTags
    SEOUtils --> Sitemap
    SEOUtils --> RobotsTxt
    
    PerformanceUtils --> LazyLoading
    PerformanceUtils --> CodeSplitting
    PerformanceUtils --> Caching
    PerformanceUtils --> WebVitals
    
    WebVitals --> Analytics
    PerformanceUtils --> PerformanceMetrics
    PerformanceMetrics --> Analytics
```

## Service Worker Architecture

```mermaid
graph TD
    subgraph "Service Worker"
        SW[Service Worker]
        CacheFirst[Cache First Strategy]
        NetworkFirst[Network First Strategy]
        StaleWhileRevalidate[Stale While Revalidate]
        BackgroundSync[Background Sync]
    end

    subgraph "Cache Storage"
        StaticCache[Static Assets Cache]
        DynamicCache[Dynamic Content Cache]
        ImageCache[Image Cache]
    end

    subgraph "Network Requests"
        StaticAssets[Static Assets]
        APIRequests[API Requests]
        Images[Images]
        HTMLPages[HTML Pages]
    end

    SW --> CacheFirst
    SW --> NetworkFirst
    SW --> StaleWhileRevalidate
    SW --> BackgroundSync
    
    CacheFirst --> StaticCache
    NetworkFirst --> DynamicCache
    StaleWhileRevalidate --> ImageCache
    
    StaticAssets --> CacheFirst
    APIRequests --> NetworkFirst
    Images --> StaleWhileRevalidate
    HTMLPages --> StaleWhileRevalidate
```

## Mobile Optimization Architecture

```mermaid
graph TB
    subgraph "Mobile Optimizations"
        TouchOptimization[Touch Optimization]
        ViewportHandling[Viewport Handling]
        MomentumScrolling[Momentum Scrolling]
        SafeAreaHandling[Safe Area Handling]
    end

    subgraph "Responsive Design"
        TailwindBreakpoints[Tailwind Breakpoints]
        FlexibleLayouts[Flexible Layouts]
        ResponsiveImages[Responsive Images]
        AdaptiveComponents[Adaptive Components]
    end

    subgraph "Performance"
        LazyImageLoading[Lazy Image Loading]
        TouchEventOptimization[Touch Event Optimization]
        ScrollOptimization[Scroll Optimization]
    end

    TouchOptimization --> TailwindBreakpoints
    ViewportHandling --> FlexibleLayouts
    MomentumScrolling --> ResponsiveImages
    SafeAreaHandling --> AdaptiveComponents
    
    ResponsiveImages --> LazyImageLoading
    TouchOptimization --> TouchEventOptimization
    MomentumScrolling --> ScrollOptimization
```

## Build & Deployment Architecture

```mermaid
graph LR
    subgraph "Development"
        Source[Source Code]
        TypeScript[TypeScript]
        React[React Components]
        TailwindCSS[Tailwind CSS]
    end

    subgraph "Build Process"
        Vite[Vite Build Tool]
        CodeSplitting[Code Splitting]
        Minification[Minification]
        AssetOptimization[Asset Optimization]
    end

    subgraph "Output"
        StaticFiles[Static Files]
        ChunkedJS[Chunked JavaScript]
        OptimizedCSS[Optimized CSS]
        CompressedAssets[Compressed Assets]
    end

    subgraph "Deployment"
        CDN[Content Delivery Network]
        WebServer[Web Server]
        ServiceWorker[Service Worker]
    end

    Source --> TypeScript
    TypeScript --> React
    React --> TailwindCSS
    TailwindCSS --> Vite
    
    Vite --> CodeSplitting
    Vite --> Minification
    Vite --> AssetOptimization
    
    CodeSplitting --> ChunkedJS
    Minification --> OptimizedCSS
    AssetOptimization --> CompressedAssets
    
    StaticFiles --> CDN
    ChunkedJS --> WebServer
    OptimizedCSS --> ServiceWorker
```

## Technology Stack

### Frontend Framework
- **React 19.1.1** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **React Router DOM 7.9.5** - Client-side routing

### Styling & UI
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Custom CSS** - Performance-optimized styles

### Build Tools
- **Vite 7.1.12** - Fast build tool and dev server
- **ESBuild** - Fast JavaScript bundler and minifier
- **Rollup** - Module bundler for production builds

### External Services
- **EmailJS 4.4.1** - Email service integration
- **Google Maps API** - Location and mapping services

### Performance & SEO
- **Service Worker** - Offline support and caching
- **Web Vitals Monitoring** - Performance tracking
- **Schema.org Structured Data** - SEO optimization
- **Lazy Loading** - Image optimization

### Development Tools
- **ESLint** - Code linting and quality
- **Autoprefixer** - CSS vendor prefixing
- **TypeScript Compiler** - Type checking

## Key Features

### Performance Optimizations
- Code splitting with vendor, email, and utils chunks
- Lazy loading for images and components
- Service worker with advanced caching strategies
- Core Web Vitals monitoring
- Resource preloading and prefetching

### SEO Optimizations
- Comprehensive meta tag management
- Schema.org structured data for Hotel and LocalBusiness
- XML sitemap generation
- Open Graph and Twitter Card support
- Dynamic SEO for individual pages

### Mobile Optimizations
- Touch-friendly interface with 44px minimum touch targets
- Momentum scrolling for iOS
- Viewport handling and safe area support
- Responsive design with mobile-first approach

### Accessibility Features
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support
- Reduced motion preferences

This architecture ensures a scalable, performant, and SEO-optimized hotel booking website that provides an excellent user experience across all devices and platforms.