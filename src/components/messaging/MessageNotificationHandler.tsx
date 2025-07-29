import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/contexts/useNotifications';
import { supabase } from '@/integrations/supabase/client';

export const MessageNotificationHandler = () => {
  const { user } = useAuth();
  const { notify } = useNotifications();

  useEffect(() => {
    if (!user) return;

    // Real-time message notifications
    const messageChannel = supabase
      .channel('new_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_messages',
        },
        (payload) => {
          // Only show notification if message is not from current user
          if (payload.new.sender_id !== user.id) {
            notify({
              title: 'New Message',
              message: 'You have received a new message in your audit',
              type: 'info',
              category: 'message',
              actionUrl: `/audit/${payload.new.audit_request_id}`,
              actionLabel: 'View Message',
            });
          }
        }
      )
      .subscribe();

    // Typing indicator notifications (optional)
    const typingChannel = supabase
      .channel('typing_indicators')
      .on('presence', { event: 'sync' }, () => {
        // Handle typing indicators if needed
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(typingChannel);
    };
  }, [user, notify]);

  return null; // This is a handler component with no UI
};
