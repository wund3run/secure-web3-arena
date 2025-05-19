
import { useState, useCallback, useEffect } from 'react';

export const useVisibility = () => {
  const [visible, setVisible] = useState(false);
  
  // Toggle visibility callback - memoized for performance
  const toggleVisibility = useCallback(() => {
    setVisible(prev => !prev);
  }, []);
  
  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process if all keys match
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        toggleVisibility();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleVisibility]);

  return { visible, toggleVisibility };
};
