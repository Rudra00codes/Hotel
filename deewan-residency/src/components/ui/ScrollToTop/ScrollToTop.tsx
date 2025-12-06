import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  showAfter?: number; // Show button after scrolling this many pixels
  smoothDuration?: number; // Smooth scroll duration in ms
}

export const ScrollToTop = ({ 
  showAfter = 400, 
  smoothDuration = 100 
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

    const toggleVisibility = () => {
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button when user has scrolled past showAfter pixels
      // OR when user is near the bottom (within 200px)
      const nearBottom = scrolled + windowHeight >= documentHeight - 200;
      const pastThreshold = scrolled > showAfter;
      
      setIsVisible(pastThreshold || nearBottom);

      // Debounce: hide button shortly after user stops scrolling
      scrollTimeout = setTimeout(() => {
        // Only hide if not near bottom
        if (!nearBottom && scrolled <= showAfter) {
          setIsVisible(false);
        }
      }, 2000);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check on mount
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [showAfter]);

  const scrollToTop = () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    const startPosition = window.scrollY;
    const startTime = performance.now();
    
    // Use easeOutCubic for immediate response
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / smoothDuration, 1);
      const easeProgress = easeOutCubic(progress);
      
      window.scrollTo(0, startPosition * (1 - easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            duration: 0.2, 
            ease: [0.3, 0, 0.2, 1] 
          }}
          onClick={scrollToTop}
          disabled={isScrolling}
          data-magnetic
          className="fixed bottom-6 left-6 z-50 group
            flex items-center justify-center
            w-12 h-12 md:w-14 md:h-14
            bg-gradient-to-br from-blue-600 to-blue-700
            hover:from-blue-700 hover:to-blue-800
            text-white rounded-full
            shadow-lg hover:shadow-xl
            transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-500/50
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-95
            touch-manipulation"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full
            bg-blue-400/30 blur-md
            group-hover:bg-blue-400/50
            transition-all duration-300
            -z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
