# 🏨 Deewan Residency Hotel Website

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A modern, responsive hotel website for Deewan Residency**  
*Located on Amb-Chd Highway in Derabassi, Mohali, Punjab*

[🌐 Live Demo](#) • [📋 Features](#-features) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](./ARCHITECTURE.md)

</div>

---

## ✨ Features

### 🎨 **User Experience**
- 📱 **Responsive Design** - Mobile-first approach (320px to 1920px)
- ⚡ **Fast Loading** - Optimized for <3s load time
- 🎯 **Intuitive Navigation** - Easy-to-use interface
- ♿ **Accessibility** - WCAG 2.1 AA compliant
- 🌙 **Progressive Web App** - Offline support & installable

### 🔧 **Technical Excellence**
- 🚀 **Modern Stack** - React 19, TypeScript, Tailwind CSS
- 📧 **Email Integration** - EmailJS for seamless booking inquiries
- 🔍 **SEO Optimized** - Schema.org structured data, meta tags
- 📊 **Performance Monitoring** - Core Web Vitals tracking
- 🗂️ **Code Splitting** - Optimized bundle sizes

### 🏨 **Hotel Features**
- 🛏️ **Room Showcase** - Standard, Deluxe, and Suite options
- 🍽️ **Dining Options** - Restaurant and room service
- 🏢 **Business Facilities** - Meeting rooms and business center
- 🎯 **Amenities Display** - Comprehensive facility overview
- 📸 **Photo Gallery** - High-quality hotel imagery

---

## 🏗️ Project Structure

```
📦 deewan-residency/
├── 📁 public/                    # Static assets
│   ├── 🗺️ sitemap.xml           # SEO sitemap
│   ├── 🤖 robots.txt            # Search engine directives
│   ├── 📱 manifest.json         # PWA manifest
│   └── ⚙️ sw.js                 # Service worker
├── 📁 src/
│   ├── 📁 components/           # Reusable UI components
│   │   ├── 🧩 Header/          # Navigation header
│   │   ├── 🦶 Footer/          # Site footer
│   │   ├── 🎭 Hero/            # Hero sections
│   │   ├── 🏠 RoomCard/        # Room display cards
│   │   ├── 🖼️ Gallery/         # Image galleries
│   │   ├── 📝 ContactForm/     # Contact forms
│   │   ├── 🔍 InquiryForm/     # Booking inquiries
│   │   ├── 🖼️ LazyImage/       # Optimized image loading
│   │   └── 📊 PerformanceMonitor/ # Performance tracking
│   ├── 📁 pages/               # Page components
│   │   ├── 🏠 Home.tsx         # Homepage
│   │   ├── 🛏️ Rooms.tsx        # Rooms & suites
│   │   ├── 🏨 Amenities.tsx    # Hotel amenities
│   │   ├── 🍽️ Dining.tsx       # Dining options
│   │   ├── 📸 Gallery.tsx      # Photo gallery
│   │   ├── ℹ️ About.tsx        # About the hotel
│   │   └── 📞 Contact.tsx      # Contact information
│   ├── 📁 utils/               # Utility functions
│   │   ├── 📧 emailService.ts  # EmailJS integration
│   │   ├── 🔍 seo.ts           # SEO utilities
│   │   ├── ⚡ performance.ts   # Performance optimization
│   │   ├── 📱 mobileOptimization.ts # Mobile enhancements
│   │   └── 🗺️ sitemap.ts       # Sitemap generation
│   ├── 📁 data/                # Static data
│   │   ├── 🛏️ rooms.ts         # Room information
│   │   ├── 🏨 amenities.ts     # Amenities data
│   │   ├── 🍽️ dining.ts        # Dining options
│   │   └── 📸 gallery.ts       # Gallery images
│   └── 📁 assets/              # Static assets
│       ├── 🖼️ images/          # Hotel images
│       └── 🎨 icons/           # UI icons
└── 📋 ARCHITECTURE.md          # System architecture docs
```

---

## 🚀 Quick Start

### 📋 Prerequisites

- 📦 **Node.js** (v18 or higher)
- 📦 **npm** or **yarn**

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd deewan-residency
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   🌐 http://localhost:3000
   ```

### 🛠️ Available Scripts

| Command | Description | Icon |
|---------|-------------|------|
| `npm run dev` | Start development server | 🚀 |
| `npm run build` | Build for production | 📦 |
| `npm run preview` | Preview production build | 👀 |
| `npm run lint` | Run ESLint | 🔍 |

---

## 🏨 Hotel Information

<div align="center">

### 🏢 **Deewan Residency**

📍 **Address**  
Amb-Chd Highway, Near Sukhmani College  
Derabassi, Mohali, Punjab - 140507

📞 **Phone Numbers**  
[01762-506147](tel:01762506147) • [01762-506146](tel:01762506146)

📧 **Email**  
[thedeewanhotel@gmail.com](mailto:thedeewanhotel@gmail.com)

🌐 **Website**  
[deewan-residency.com](https://deewan-residency.com)

</div>

---

## 🛠️ Technology Stack

### 🎨 **Frontend**
- ⚛️ **React 19.1.1** - Modern React with concurrent features
- 📘 **TypeScript 5.9.3** - Type-safe development
- 🎨 **Tailwind CSS 3.4.18** - Utility-first CSS framework
- 🧭 **React Router DOM 7.9.5** - Client-side routing

### ⚡ **Build & Development**
- ⚡ **Vite 7.1.12** - Fast build tool and dev server
- 📦 **ESBuild** - Fast JavaScript bundler
- 🔄 **Rollup** - Module bundler for production
- 🎯 **PostCSS** - CSS processing and optimization

### 🌐 **External Services**
- 📧 **EmailJS 4.4.1** - Email service integration
- 🗺️ **Google Maps API** - Location and mapping services
- 📊 **Analytics** - Performance and user tracking

### 🔧 **Development Tools**
- 🔍 **ESLint** - Code linting and quality
- 🎨 **Autoprefixer** - CSS vendor prefixing
- 📝 **TypeScript Compiler** - Type checking

---

## 🎯 Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| **First Contentful Paint** | < 1.8s | ✅ |
| **Largest Contentful Paint** | < 2.5s | ✅ |
| **First Input Delay** | < 100ms | ✅ |
| **Cumulative Layout Shift** | < 0.1 | ✅ |
| **Time to Interactive** | < 3.8s | ✅ |

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| 🌐 Chrome | 90+ | ✅ Full Support |
| 🦊 Firefox | 88+ | ✅ Full Support |
| 🧭 Safari | 14+ | ✅ Full Support |
| 📘 Edge | 90+ | ✅ Full Support |
| 📱 Mobile Safari | iOS 14+ | ✅ Full Support |
| 🤖 Chrome Mobile | Android 90+ | ✅ Full Support |

---

## 🔍 SEO Features

- ✅ **Meta Tags** - Comprehensive meta tag management
- ✅ **Structured Data** - Schema.org Hotel and LocalBusiness markup
- ✅ **XML Sitemap** - Auto-generated sitemap for search engines
- ✅ **Robots.txt** - Search engine crawling directives
- ✅ **Open Graph** - Social media sharing optimization
- ✅ **Twitter Cards** - Enhanced Twitter sharing
- ✅ **Canonical URLs** - Prevent duplicate content issues

---

## 📋 Development Guidelines

### 🎨 **Design Principles**
- 📱 Follow mobile-first responsive design
- ♿ Ensure WCAG 2.1 AA accessibility compliance
- ⚡ Optimize for Core Web Vitals
- 🎯 Maintain consistent UI/UX patterns

### 💻 **Code Standards**
- 📘 Use TypeScript for type safety
- 🧹 Follow ESLint configuration
- 📝 Write meaningful component documentation
- 🧪 Test across multiple browsers and devices

### 🚀 **Performance**
- 🖼️ Optimize images and assets
- ⚡ Implement lazy loading
- 📦 Use code splitting effectively
- 📊 Monitor Core Web Vitals

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

### 🏨 **Hotel Reservations**
- 📞 **Phone**: [01762-506147](tel:01762506147) | [01762-506146](tel:01762506146)
- 📧 **Email**: [thedeewanhotel@gmail.com](mailto:thedeewanhotel@gmail.com)

### 💻 **Technical Support**
For technical issues or development inquiries, please:
- 🐛 Open an issue on GitHub
- 📧 Contact the development team
- 📖 Check the [Architecture Documentation](./ARCHITECTURE.md)

---

<div align="center">

**Made with ❤️ for Deewan Residency**

*Providing exceptional hospitality on Amb-Chd Highway, Derabassi*

</div>