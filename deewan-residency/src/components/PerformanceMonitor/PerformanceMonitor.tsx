import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  fcp?: number;
}

// Extend global types for gtag
declare global {
  function gtag(...args: any[]): void;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (!import.meta.env.PROD) {
      return;
    }

    const metrics: PerformanceMetrics = {};

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          metrics.lcp = lastEntry.startTime;
          
          // Report if above threshold
          if (lastEntry.startTime > 2500) {
            reportMetric('LCP', lastEntry.startTime, 'poor');
          } else if (lastEntry.startTime > 1200) {
            reportMetric('LCP', lastEntry.startTime, 'needs-improvement');
          } else {
            reportMetric('LCP', lastEntry.startTime, 'good');
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP measurement not supported');
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as any; // Type assertion for FID entry
            const fid = fidEntry.processingStart - fidEntry.startTime;
            metrics.fid = fid;
            
            if (fid > 100) {
              reportMetric('FID', fid, 'poor');
            } else if (fid > 25) {
              reportMetric('FID', fid, 'needs-improvement');
            } else {
              reportMetric('FID', fid, 'good');
            }
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID measurement not supported');
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          metrics.cls = clsValue;
          
          if (clsValue > 0.25) {
            reportMetric('CLS', clsValue, 'poor');
          } else if (clsValue > 0.1) {
            reportMetric('CLS', clsValue, 'needs-improvement');
          } else {
            reportMetric('CLS', clsValue, 'good');
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS measurement not supported');
      }
    };

    // First Contentful Paint (FCP)
    const observeFCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            metrics.fcp = entry.startTime;
            
            if (entry.startTime > 3000) {
              reportMetric('FCP', entry.startTime, 'poor');
            } else if (entry.startTime > 1800) {
              reportMetric('FCP', entry.startTime, 'needs-improvement');
            } else {
              reportMetric('FCP', entry.startTime, 'good');
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP measurement not supported');
      }
    };

    // Time to First Byte (TTFB)
    const measureTTFB = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.entryType === 'navigation') {
              const ttfb = entry.responseStart - entry.requestStart;
              metrics.ttfb = ttfb;
              
              if (ttfb > 800) {
                reportMetric('TTFB', ttfb, 'poor');
              } else if (ttfb > 200) {
                reportMetric('TTFB', ttfb, 'needs-improvement');
              } else {
                reportMetric('TTFB', ttfb, 'good');
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        console.warn('TTFB measurement not supported');
      }
    };

    // Report metric to analytics (placeholder)
    const reportMetric = (name: string, value: number, rating: 'good' | 'needs-improvement' | 'poor') => {
      // In a real application, you would send this to your analytics service
      console.log(`Performance Metric - ${name}:`, {
        value: Math.round(value),
        rating,
        url: window.location.pathname
      });

      // Example: Send to Google Analytics 4
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: name,
          value: Math.round(value),
          custom_parameter_1: rating
        });
      }

      // Example: Send to custom analytics endpoint
      // fetch('/api/analytics/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     metric: name,
      //     value: Math.round(value),
      //     rating,
      //     url: window.location.pathname,
      //     timestamp: Date.now()
      //   })
      // }).catch(console.error);
    };

    // Initialize all observers
    observeLCP();
    observeFID();
    observeCLS();
    observeFCP();
    measureTTFB();

    // Report page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          
          reportMetric('Page Load Time', loadTime, loadTime > 3000 ? 'poor' : loadTime > 1500 ? 'needs-improvement' : 'good');
          reportMetric('DOM Content Loaded', domContentLoaded, domContentLoaded > 2000 ? 'poor' : domContentLoaded > 1000 ? 'needs-improvement' : 'good');
        }
      }, 0);
    });

    // Report resource loading performance
    const reportResourceTiming = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter((resource: any) => 
        resource.duration > 1000 && 
        (resource.name.includes('.js') || resource.name.includes('.css') || resource.name.includes('.jpg') || resource.name.includes('.png'))
      );

      slowResources.forEach((resource: any) => {
        console.warn('Slow resource detected:', {
          name: resource.name,
          duration: Math.round(resource.duration),
          size: resource.transferSize
        });
      });
    };

    setTimeout(reportResourceTiming, 5000);

  }, []);

  // This component doesn't render anything
  return null;
}