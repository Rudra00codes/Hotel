import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenuOverlay from '../ui/Menu/hamburger-menu-overlay';

/**
 * Glassmorphism Navbar Component */

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

  // Optimized scroll effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    ...navLinks.map((l) => ({ label: l.label, href: l.path })),
    { label: 'Book Now', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div 
        className={`pointer-events-auto transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) will-change-[width,transform,background-color,border-radius] ${
          scrolled 
            ? 'mt-4 w-[95%] max-w-7xl rounded-2xl bg-white/30 backdrop-blur-md shadow-lg border border-white/20' 
            : 'mt-0 w-full bg-white/30 backdrop-blur-md border-b border-white/30 rounded-b-2xl'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <h1 className={`text-xl font-sinoreta font-extrabold uppercase tracking-wide transition-colors duration-300 group-hover:text-blue-600 ${
                scrolled ? 'text-white-900' : 'text-gray-900'
              }`}>
                Deewan Residency
              </h1>
            </Link>
  
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-sinoreta font-medium transition-all duration-300 hover:scale-105 relative group ${
                    isActive(link.path)
                      ? 'text-blue-200'
                      : 'text-gray-300 hover:text-blue-200'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>
  
            {/* Desktop Actions - Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
              to="/contact"
              data-magnetic
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl text-sm font-sinoreta font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform align-middle"
              >
              Book Now
              </Link>
            </div>
  
            {/* Mobile Actions: Hamburger Menu on Right Side */}
            <div className="md:hidden">
              <HamburgerMenuOverlay
                items={menuItems}
                buttonSize="md"
                buttonColor={scrolled ? "#ffffff03" : "#ffffff03"}
                overlayBackground="rgba(18, 26, 45, 0.97)"
                textColor="#ffffff"
                menuAlignment="center"
                ariaLabel="Open navigation menu"
                enableBlur={true}
                // @ts-ignore - Adding new prop
                animationType="drawer"
                fontFamily="Sinoreta, sans-serif"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
