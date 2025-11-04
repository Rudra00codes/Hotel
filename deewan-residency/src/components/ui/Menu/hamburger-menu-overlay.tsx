"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../../lib/utils";
import { Menu, X } from "lucide-react";

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface HamburgerMenuOverlayProps {
  /** Array of menu items */
  items: MenuItem[];
  /** Button position from top */
  buttonTop?: string;
  /** Button position from left */
  buttonLeft?: string;
  /** Button size */
  buttonSize?: "sm" | "md" | "lg";
  /** Button background color */
  buttonColor?: string;
  /** Overlay background color/gradient */
  overlayBackground?: string;
  /** Menu text color */
  textColor?: string;
  /** Menu font size */
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Font family */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Stagger delay between menu items */
  staggerDelay?: number;
  /** Menu items alignment */
  menuAlignment?: "left" | "center" | "right";
  /** Custom class for container */
  className?: string;
  /** Custom class for button */
  buttonClassName?: string;
  /** Custom class for menu items */
  menuItemClassName?: string;
  /** Disable overlay close on item click */
  keepOpenOnItemClick?: boolean;
  /** Custom button content */
  customButton?: React.ReactNode;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Callback when menu opens */
  onOpen?: () => void;
  /** Callback when menu closes */
  onClose?: () => void;
  /** Menu items layout direction */
  menuDirection?: "vertical" | "horizontal";
  /** Enable blur backdrop */
  enableBlur?: boolean;
  /** Z-index for overlay */
  zIndex?: number;
}

export const HamburgerMenuOverlay: React.FC<HamburgerMenuOverlayProps> = ({
  items = [],
  buttonTop: _buttonTop = "60px",
  buttonLeft: _buttonLeft = "60px",
  buttonSize = "md",
  buttonColor = "#6c8cff",
  overlayBackground = "#6c8cff",
  textColor = "#ffffff",
  fontSize = "md",
  fontFamily = '"Krona One", monospace',
  fontWeight = "bold",
  animationDuration = 1.5,
  staggerDelay = 0.1,
  menuAlignment = "left",
  className,
  buttonClassName,
  menuItemClassName,
  keepOpenOnItemClick = false,
  customButton,
  ariaLabel = "Navigation menu",
  onOpen,
  onClose,
  menuDirection = "vertical",
  enableBlur = false,
  zIndex = 1000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const buttonSizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
  };

  const fontSizes = {
    sm: "text-xl sm:text-2xl md:text-3xl",
    md: "text-2xl sm:text-3xl md:text-4xl",
    lg: "text-3xl sm:text-4xl md:text-5xl",
    xl: "text-4xl sm:text-5xl md:text-6xl",
    "2xl": "text-5xl sm:text-6xl md:text-7xl",
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleItemClick = async (item: MenuItem) => {
    // If the menu should remain open on click, execute immediately
    if (keepOpenOnItemClick) {
      if (item.onClick) item.onClick();
      if (item.href && !item.onClick) window.location.href = item.href;
      return;
    }

    // Start closing animation
    setIsOpen(false);
    onClose?.();

    // Run any provided onClick handler immediately
    if (item.onClick) item.onClick();

    // If navigation is required, wait for the overlay closing transition to finish.
    if (item.href && !item.onClick) {
      const el = navRef.current;

      if (el) {
        // Wait for the clip-path transitionend event (precise) with a small fallback timeout
        await new Promise<void>((resolve) => {
          let resolved = false;
          let fallback: number;

          const onEnd = (_e: TransitionEvent) => {
            // Accept any transitionend for better cross-browser compatibility
            if (!resolved) {
              resolved = true;
              clearTimeout(fallback);
              el.removeEventListener('transitionend', onEnd);
              resolve();
            }
          };

          el.addEventListener('transitionend', onEnd, { passive: true });

          // Shorter fallback for production (just enough buffer)
          fallback = window.setTimeout(() => {
            if (!resolved) {
              resolved = true;
              el.removeEventListener('transitionend', onEnd);
              resolve();
            }
          }, animationDuration * 1000 + 100);
        });
      } else {
        // If no element ref, fallback to timeout
        await new Promise((r) => setTimeout(r, animationDuration * 1000));
      }

      // Navigate after animation completes
      window.location.href = item.href;
    }
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when overlay is open (mobile optimization)
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Krona+One:wght@400&display=swap');
          
          .hamburger-overlay-${zIndex} {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            height: 100dvh; /* Dynamic viewport height for mobile */
            display: flex;
            justify-content: ${menuAlignment === "right" ? "flex-end" : menuAlignment === "center" ? "center" : "flex-start"};
            align-items: center;
            background: ${overlayBackground};
            z-index: ${zIndex};
            clip-path: circle(0px at calc(100% - 40px) 40px);
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            ${enableBlur ? "backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);" : ""}
            overscroll-behavior: contain; /* Prevent scroll chaining on mobile */
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
          }
          
          .hamburger-overlay-${zIndex}.open {
            clip-path: circle(150% at calc(100% - 40px) 40px);
          }
          
          .hamburger-button-${zIndex} {
            position: relative;
            border-radius: 20px;
            z-index: ${zIndex + 1};
            background: ${buttonColor};
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            -webkit-tap-highlight-color: transparent; /* Remove tap highlight on mobile */
            touch-action: manipulation; /* Optimize touch performance */
          }
          
          .hamburger-button-${zIndex}:hover {
            transform: scale(1.1);
          }
          
          .hamburger-button-${zIndex}:active {
            transform: scale(0.95); /* Better mobile feedback */
          }
          
          .hamburger-button-${zIndex}:focus {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
          }
          
          .menu-items-${zIndex} {
            ${menuDirection === "horizontal" ? "display: flex; flex-wrap: wrap; gap: 1rem;" : ""}
            ${menuAlignment === "center" ? "text-align: center;" : ""}
            ${menuAlignment === "right" ? "text-align: right;" : ""}
          }
          
          .menu-item-${zIndex} {
            position: relative;
            list-style: none;
            padding: 0.75rem 0; /* Larger touch targets */
            cursor: pointer;
            transform: ${menuAlignment === "right" ? "translateX(200px)" : "translateX(-200px)"};
            opacity: 0;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease;
            font-family: ${fontFamily};
            font-weight: ${fontWeight};
            color: ${textColor};
            ${menuDirection === "horizontal" ? "display: inline-block; margin: 0 1rem;" : ""}
            -webkit-tap-highlight-color: transparent; /* Remove tap highlight */
            touch-action: manipulation; /* Better touch response */
          }
          
          .menu-item-${zIndex}.visible {
            transform: translateX(0);
            opacity: 1;
          }
          
          .menu-item-${zIndex}::before {
            content: "";
            position: absolute;
            ${menuAlignment === "right" ? "right: -20%;" : "left: -20%;"}
            top: 50%;
            transform: translate(${menuAlignment === "right" ? "50%" : "-50%"}, -50%) translateX(${menuAlignment === "right" ? "50%" : "-50%"});
            width: 25%;
            height: 8px;
            border-radius: 10px;
            background: ${textColor};
            opacity: 0;
            transition: all 0.25s ease;
            pointer-events: none;
            will-change: transform, opacity; /* Performance hint */
          }
          
          .menu-item-${zIndex}:hover::before {
            opacity: 1;
            transform: translate(${menuAlignment === "right" ? "50%" : "-50%"}, -50%) translateX(0);
          }
          
          .menu-item-${zIndex} span {
            opacity: 0.7;
            transition: opacity 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .menu-item-${zIndex}:hover span,
          .menu-item-${zIndex}:active span {
            opacity: 1;
          }
          
          .menu-item-${zIndex}:focus {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
            border-radius: 4px;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .hamburger-overlay-${zIndex} {
              clip-path: circle(0px at calc(100% - 30px) 30px);
            }
            
            .hamburger-overlay-${zIndex}.open {
              clip-path: circle(150% at calc(100% - 30px) 30px);
            }
            
            .menu-items-${zIndex} {
              padding: 1.5rem;
              max-height: 85vh;
              max-height: 85dvh;
              overflow-y: auto;
              overscroll-behavior: contain;
            }
            
            .menu-item-${zIndex} {
              padding: 1rem 0; /* Larger touch target on mobile */
            }
          }
          
          @media (max-width: 480px) {
            .hamburger-overlay-${zIndex} {
              clip-path: circle(0px at calc(100% - 25px) 25px);
            }
            
            .hamburger-overlay-${zIndex}.open {
              clip-path: circle(150% at calc(100% - 25px) 25px);
            }
            
            .menu-items-${zIndex} {
              ${menuDirection === "horizontal" ? "flex-direction: column; gap: 0;" : ""}
              padding: 1rem;
            }
            }
            
            .menu-item-${zIndex} {
              ${menuDirection === "horizontal" ? "display: block; margin: 0;" : ""}
            }
          }
        `}
      </style>

      {/* Navigation Overlay */}
      <div
        ref={navRef}
        className={cn(`flex flex-col justify-center h-full
           hamburger-overlay-${zIndex}`, 
           isOpen && "open",
           menuAlignment === "right" ? "items-end pr-4 sm:pr-8" : menuAlignment === "center" ? "items-center px-4" : "items-start pl-4 sm:pl-8"
        )}
        aria-hidden={!isOpen}
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        <ul
          className={cn(
            `menu-items-${zIndex}`,
            menuDirection === "horizontal" && "flex flex-wrap "
          )}
          role="menu"
        >
          {items.map((item, index) => (
            <li
              key={`menu-item-${index}-${item.label}`}
              className={cn(
                `menu-item-${zIndex}`,
                fontSizes[fontSize],
                isOpen && "visible",
                menuItemClassName
              )}
              style={{
                transitionDelay: isOpen 
                  ? `${index * staggerDelay}s` 
                  : `${(items.length - index - 1) * (staggerDelay * 0.5)}s`, // Reverse stagger on close
                willChange: isOpen ? 'transform, opacity' : 'auto', // Performance optimization
              }}
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemClick(item);
                }
              }}
              tabIndex={isOpen ? 0 : -1}
              role="menuitem"
              aria-label={`Navigate to ${item.label}`}
            >
              <span>
                {item.icon && <span className="menu-icon" aria-hidden="true">{item.icon}</span>}
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hamburger Button */}
      <button
        className={cn(
          `hamburger-button-${zIndex}`,
          buttonSizes[buttonSize],
          buttonClassName
        )}
        onClick={toggleMenu}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-controls="navigation-menu"
      >
        {customButton || (
          <div className="relative w-full h-full flex items-center justify-center">
            <Menu
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-0 rotate-45 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
            <X
              className={cn(
                "absolute transition-all duration-300",
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-45 scale-0"
              )}
              size={buttonSize === "sm" ? 16 : buttonSize === "md" ? 20 : 24}
              color={textColor}
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default HamburgerMenuOverlay;
