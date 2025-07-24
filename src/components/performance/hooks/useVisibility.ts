import { useState, useCallback } from 'react';

export const useVisibility = () => {
  const [visible, setVisible] = useState(() => {
    // Only show in development by default
    return import.meta.env.MODE === 'development';
  });

  const toggleVisibility = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return { visible, toggleVisibility };
};
