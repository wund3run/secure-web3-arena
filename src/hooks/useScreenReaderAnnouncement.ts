import { useContext } from 'react';
// @ts-ignore
import { AnnouncementContext } from '../components/accessibility/ScreenReaderAnnouncements/AnnouncementContext';

export function useScreenReaderAnnouncement() {
  const context = useContext(AnnouncementContext);
  if (context === undefined || context === null) {
    throw new Error('useScreenReaderAnnouncement must be used within ScreenReaderAnnouncementProvider');
  }
  return context;
} 