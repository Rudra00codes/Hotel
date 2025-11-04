import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTouchFriendlyClasses, getThumbFriendlyNavClasses, addMobileEventListeners } from '../../utils/mobileOptimization';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Initialize mobile optimizations and scroll detection
  useEffect(() => {
    addMobileEventListeners();
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Dining', path: '/dining' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`glassmorphism-navbar sticky top-0 z-50 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center glassmorphism-logo" onClick={closeMobileMenu}>
              <h1 className="text-xl lg:text-2xl font-grotesk font-extrabold text-gray-900 tracking-wide uppercase">
                Deewan Residency
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`glassmorphism-nav-item text-sm font-grotesk font-medium transition-all duration-300 hover:text-blue-600 tracking-wide px-2 py-1 ${
                  isActivePage(item.path)
                    ? 'text-blue-600 glassmorphism-active border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Check Availability CTA Button - Desktop */}
          <div className="hidden lg:flex">
            <Link
              to="/#booking-form"
              className={`${getTouchFriendlyClasses('medium')} glassmorphism-cta text-white rounded-lg font-grotesk font-medium tracking-wide`}
            >
              Check Availability
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`${getTouchFriendlyClasses('medium')} glassmorphism-hamburger inline-flex items-center justify-center rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glassmorphism-mobile-menu border-t border-white/20">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeMobileMenu}
              className={`${getThumbFriendlyNavClasses()} glassmorphism-mobile-menu-item block rounded-md text-base font-grotesk font-medium transition-all duration-300 tracking-wide ${
                isActivePage(item.path)
                  ? 'text-blue-600 glassmorphism-active'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Check Availability CTA Button - Mobile */}
          <div className="px-3 pt-4">
            <Link
              to="/#booking-form"
              onClick={closeMobileMenu}
              className={`${getTouchFriendlyClasses('large')} glassmorphism-cta block w-full text-center text-white rounded-lg font-grotesk font-medium tracking-wide`}
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}