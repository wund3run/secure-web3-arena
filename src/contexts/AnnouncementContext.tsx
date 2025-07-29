import React, { createContext } from 'react';

interface AnnouncementContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

export const AnnouncementContext = createContext<AnnouncementContextType | null>(null); 