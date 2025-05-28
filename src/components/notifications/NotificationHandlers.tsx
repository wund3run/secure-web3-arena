
import React from 'react';
import { useAuditNotifications } from '@/hooks/useAuditNotifications';
import { usePaymentNotifications } from '@/hooks/usePaymentNotifications';

export const NotificationHandlers = () => {
  // Initialize notification hooks
  useAuditNotifications();
  usePaymentNotifications();

  return null; // This is a handler component with no UI
};
