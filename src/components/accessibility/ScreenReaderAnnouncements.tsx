
import React, { createContext, useContext, useState, useCallback } from 'react';

interface AnnouncementContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | null>(null);

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
        >
          {announcement.message}
        </div>
      ))}
    </AnnouncementContext.Provider>
  );
}

export function useScreenReaderAnnouncement() {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useScreenReaderAnnouncement must be used within ScreenReaderAnnouncementProvider');
  }
  return context;
}
