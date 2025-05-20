
import { useState, useEffect } from "react";

/**
 * Custom hook to check if a media query matches
 * @param query - CSS media query to check
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Create a media query list
    const media = window.matchMedia(query);
    
    // Function to update the state
    const updateMatches = () => {
      setMatches(media.matches);
    };
    
    // Set initial value
    updateMatches();

    // Add event listener for changes
    if (typeof media.addEventListener === 'function') {
      // Modern browsers
      media.addEventListener('change', updateMatches);
      return () => media.removeEventListener('change', updateMatches);
    } else {
      // Fallback for older browsers
      media.addListener(updateMatches);
      return () => media.removeListener(updateMatches);
    }
  }, [query]);

  return matches;
}

/**
 * Custom hook to check if the current viewport is mobile sized
 * @returns boolean indicating if the viewport is mobile sized
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

/**
 * Custom hook to check if the current viewport is tablet sized
 * @returns boolean indicating if the viewport is tablet sized
 */
export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
}

/**
 * Custom hook to check if the current viewport is desktop sized
 * @returns boolean indicating if the viewport is desktop sized
 */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1025px)");
}

/**
 * Custom hook to get the current device type
 * @returns string representing the current device type (mobile, tablet, or desktop)
 */
export function useDeviceType(): "mobile" | "tablet" | "desktop" {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}
