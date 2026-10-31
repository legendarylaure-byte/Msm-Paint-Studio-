"use client";

import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    // Track page views with path and timestamp
    const trackPageView = (url: string) => {
      if (typeof window === 'undefined') return;
      
      // Track in custom analytics
      if (window.customAnalytics) {
        window.customAnalytics.track('pageview', {
          url: url,
          title: document.title,
          timestamp: new Date().toISOString(),
        });
      }
      
      // Track image loads for optimization monitoring
      trackImagePerformance();
    };

    // Track image loading performance
    const trackImagePerformance = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name.includes('/gallery/') && entry.name.includes('.jpg')) {
              console.log('Gallery image loaded:', entry.name, 'Duration:', entry.duration.toFixed(2) + 'ms');
            }
          });
        });
        observer.observe({ entryTypes: ['resource'] });
      }
    };

    // Track color preference changes
    const trackColorPreference = () => {
      const color = document.documentElement.getAttribute('data-theme') || 'light';
      if (window.customAnalytics) {
        window.customAnalytics.track('color_preference', {
          preference: color,
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Track paint calculator usage
    const trackPaintCalculator = () => {
      if (window.customAnalytics) {
        window.customAnalytics.track('paint_calculator_access', {
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Listen for custom events
    const handleColorChange = () => trackColorPreference();
    const handleCalculatorClick = () => trackPaintCalculator();
    
    document.addEventListener('brush:paint', handleColorChange);
    document.addEventListener('paint:calculator:open', handleCalculatorClick);

    // Track initial page view
    trackPageView(window.location.pathname);
    trackColorPreference();

    // Track navigation changes
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    // Listen for Next.js router events
    window.addEventListener('popstate', handleRouteChange);

    // Setup custom analytics object
    window.customAnalytics = {
      track: (event: string, properties: any) => {
        console.log(`Analytics Event: ${event}`, properties);
        // Replace with actual analytics service
        // Examples:
        // - Google Analytics: gtag('event', event, properties);
        // - Mixpanel: mixpanel.track(event, properties);
        // - Segment: analytics.track(event, properties);
        // - Custom: send to your analytics server
      }
    };

    return () => {
      // Cleanup
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('brush:paint', handleColorChange);
      window.removeEventListener('paint:calculator:open', handleCalculatorClick);
    };
  }, []);

  return null;
}

// For real implementation, replace the placeholder with:

// Google Analytics (example)
// export function GoogleAnalytics() {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
//     script.async = true;
//     document.head.appendChild(script);
// 
//     script.onload = () => {
//       window.gtag = function() {
//         (window.gtag as any).q = (window.gtag as any).q || [];
//         (window.gtag as any).config = 'GA_MEASUREMENT_ID';
//       };
//     };
//   }, []);
//   return null;
// }

// Vercel Analytics (recommended for Next.js)
// export function VercelAnalytics() {
//   useEffect(() => {
//     // Vercel Analytics is automatically included in Next.js
//     // No additional setup needed
//   }, []);
//   return null;
// }