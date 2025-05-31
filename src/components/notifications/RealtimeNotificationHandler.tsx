
import React from 'react';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';

export const RealtimeNotificationHandler: React.FC = () => {
  // Initialize real-time notifications
  useRealtimeNotifications();

  // This component has no UI - it just sets up real-time subscriptions
  return null;
};
