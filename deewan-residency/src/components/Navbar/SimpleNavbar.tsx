import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenuOverlay from '../ui/Menu/hamburger-menu-overlay';

/**
 * Glassmorphism Navbar Component
 * Phase 3: Modern design with backdrop blur and scroll effects
 */

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/rooms', label: 'Rooms' },
  { path: '/amenities', label: 'Amenities' },
  { path: '/dining', label: 'Dining' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function SimpleNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    ...navLinks.map((l) => ({ label: l.label, href: l.path })),
    { label: 'Book Now', href: '/contact' },
  ];

  return (
    <header 
      className="sticky top-0 z-50"
      style={{
        transform: scrolled ? 'translateY(8px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div 
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/50 backdrop-blur-md shadow-lg'
            : 'bg-white/50 backdrop-blur-sm shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <h1 className="text-xl font-grotesk font-extrabold text-gray-900 uppercase tracking-wide transition-all group-hover:text-blue-600">
              Deewan Residency
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-grotesk font-medium transition-all duration-200 relative ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions - Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/contact"
              data-magnetic
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-grotesk font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Actions: Hamburger Menu on Right Side */}
          <div className="md:hidden">
            <HamburgerMenuOverlay
              items={menuItems}
              buttonSize="md"
              buttonColor="#2563eb"
              overlayBackground="linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)"
              textColor="#ffffff"
              menuAlignment="right"
              ariaLabel="Open navigation menu"
              enableBlur={true}
            />
          </div>
        </div>
        
        </div>
      </div>
    </header>
  );
}
