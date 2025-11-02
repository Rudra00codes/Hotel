import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle,
  NavbarButton 
} from '../ui/ResizeableNav/resizable-navbar';
import { getTouchFriendlyClasses, getThumbFriendlyNavClasses, addMobileEventListeners } from '../../utils/mobileOptimization';

export default function EnhancedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Initialize mobile optimizations
  useEffect(() => {
    addMobileEventListeners();
  }, []);

  const navigationItems = [
    { name: 'Home', link: '/' },
    { name: 'Rooms', link: '/rooms' },
    { name: 'Amenities', link: '/amenities' },
    { name: 'Dining', link: '/dining' },
    { name: 'Gallery', link: '/gallery' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
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
    <div className="relative">
      <Navbar className="glassmorphism-enhanced-navbar">
        {/* Desktop Navigation */}
        <NavBody className="glassmorphism-nav-body">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center glassmorphism-logo" onClick={closeMobileMenu}>
              <h1 className="text-xl lg:text-2xl font-grotesk text-gray-900 tracking-wide uppercase">
                Deewan Residency
              </h1>
            </Link>
          </div>

          {/* Navigation Items */}
          <NavItems 
            items={navigationItems}
            onItemClick={closeMobileMenu}
            className="glassmorphism-nav-items"
          />

          {/* CTA Button */}
          <NavbarButton
            href="/#booking-form"
            variant="gradient"
            className="glassmorphism-cta font-grotesk tracking-wide"
          >
            Check Availability
          </NavbarButton>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="glassmorphism-mobile-nav">
          <MobileNavHeader>
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center glassmorphism-logo" onClick={closeMobileMenu}>
              <h1 className="text-lg font-grotesk text-gray-900 tracking-wide uppercase">
                Deewan Residency
              </h1>
            </Link>

            {/* Mobile Menu Toggle */}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </MobileNavHeader>

          {/* Mobile Menu */}
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            className="glassmorphism-mobile-menu"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={closeMobileMenu}
                className={`${getThumbFriendlyNavClasses()} glassmorphism-mobile-menu-item block rounded-md text-base font-grotesk font-medium transition-all duration-300 tracking-wide ${
                  isActivePage(item.link)
                    ? 'text-blue-600 glassmorphism-active'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="px-3 pt-4 w-full">
              <Link
                to="/#booking-form"
                onClick={closeMobileMenu}
                className={`${getTouchFriendlyClasses('large')} glassmorphism-cta block w-full text-center text-white rounded-lg font-grotesk font-medium tracking-wide`}
              >
                Check Availability
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}