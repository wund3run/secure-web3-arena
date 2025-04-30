
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Define callback for media query change
    const listener = () => {
      setMatches(media.matches);
    };

    // Add the listener to begin watching for changes
    media.addEventListener("change", listener);

    // Clean up function
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
