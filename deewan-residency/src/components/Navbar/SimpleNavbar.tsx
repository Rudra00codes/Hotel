import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToggleTheme } from '../ui/ThemeToggle';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            onClick={() => setIsMobileMenuOpen(false)}
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
            {/* Theme Toggle Button - Desktop */}
            <ToggleTheme
              data-magnetic
              animationType="circle-spread"
              duration={400}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 group [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-gray-700 [&>svg]:group-hover:text-blue-600 [&>svg]:transition-colors"
            />

            <Link
              to="/contact"
              data-magnetic
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-grotesk font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Button - Mobile */}
            <ToggleTheme
              data-magnetic
              animationType="circle-spread"
              duration={400}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-gray-700"
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100/80 transition-all duration-200"
              type="button"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-700 transition-transform duration-200"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200/50 backdrop-blur-sm bg-white/95">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 text-base font-grotesk font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center text-base font-grotesk font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md"
            >
              Book Now
            </Link>
          </nav>
        )}
        </div>
      </div>
    </header>
  );
}
