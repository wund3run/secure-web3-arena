import React, { useState, useCallback } from 'react';
import { AnnouncementContext } from '@/contexts/AnnouncementContext';

export function ScreenReaderAnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Array<{
    id: number;
    message: string;
    priority: 'polite' | 'assertive';
  }>>([]);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const id = Date.now();
    setAnnouncements(prev => [...prev, { id, message, priority }]);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }, 1000);
  }, []);

  return (
    <AnnouncementContext.Provider value={{ announce }}>
      {children}
      {announcements.map(announcement => (
        <div
          key={announcement.id}
          aria-live={announcement.priority}
          aria-atomic="true"
          className="sr-only"
          role="status"
          aria-label={announcement.message}
        >
          {announcement.message}
        </div>
      ))}
    </AnnouncementContext.Provider>
  );
}
