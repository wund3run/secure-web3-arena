import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PresenceUser {
  id: string;
  name: string;
  avatar?: string;
  role: 'auditor' | 'client' | 'lead_auditor';
  status: 'online' | 'offline' | 'away' | 'busy' | 'in_call';
  current_location?: string;
  activity?: 'reviewing_code' | 'writing_report' | 'in_meeting' | 'idle';
  last_seen?: string;
}

interface UseRealtimePresenceResult {
  participants: PresenceUser[];
  isConnected: boolean;
  updatePresence: (updates: Partial<PresenceUser>) => Promise<void>;
  setUserStatus: (status: PresenceUser['status']) => Promise<void>;
  setUserActivity: (activity: PresenceUser['activity'], location?: string) => Promise<void>;
}

export function useRealtimePresence(
  auditId: string,
  currentUserId: string
): UseRealtimePresenceResult {
  const [participants, setParticipants] = useState<PresenceUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [presenceChannel, setPresenceChannel] = useState<any>(null);

  const updatePresence = useCallback(async (updates: Partial<PresenceUser>) => {
    if (!presenceChannel) return;

    try {
      await presenceChannel.track({
        id: currentUserId,
        ...updates,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to update presence:', error);
      toast.error('Failed to update presence');
    }
  }, [presenceChannel, currentUserId]);

  const setUserStatus = useCallback(async (status: PresenceUser['status']) => {
    await updatePresence({ status });
  }, [updatePresence]);

  const setUserActivity = useCallback(async (
    activity: PresenceUser['activity'], 
    location?: string
  ) => {
    await updatePresence({ 
      activity, 
      current_location: location,
      last_seen: new Date().toISOString()
    });
  }, [updatePresence]);

  useEffect(() => {
    if (!auditId || !currentUserId) return;

    // Create presence channel
    const channel = supabase.channel(`audit_presence_${auditId}`, {
      config: {
        presence: {
          key: currentUserId,
        },
      },
    });

    // Set up presence tracking
    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const users: PresenceUser[] = [];

        Object.entries(presenceState).forEach(([userId, presences]) => {
          const presence = presences[0] as any;
          if (presence) {
            users.push({
              id: userId,
              name: presence.name || 'Unknown User',
              avatar: presence.avatar,
              role: presence.role || 'client',
              status: presence.status || 'online',
              current_location: presence.current_location,
              activity: presence.activity,
              last_seen: presence.last_seen || presence.timestamp,
            });
          }
        });

        setParticipants(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined presence:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left presence:', key, leftPresences);
      })
      .subscribe(async (status) => {
        setIsConnected(status === 'SUBSCRIBED');
        
        if (status === 'SUBSCRIBED') {
          // Initialize user presence
          await channel.track({
            id: currentUserId,
            name: 'Current User', // In real app, get from user profile
            role: 'client', // In real app, get from user profile
            status: 'online',
            activity: 'idle',
            current_location: 'Dashboard',
            timestamp: new Date().toISOString(),
          });
        }
      });

    setPresenceChannel(channel);

    // Cleanup on unmount
    return () => {
      channel.unsubscribe();
    };
  }, [auditId, currentUserId]);

  // Set user as away when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setUserStatus('away');
      } else {
        setUserStatus('online');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [setUserStatus]);

  // Periodic activity heartbeat
  useEffect(() => {
    const heartbeat = setInterval(() => {
      if (isConnected) {
        updatePresence({ 
          last_seen: new Date().toISOString() 
        });
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(heartbeat);
  }, [isConnected, updatePresence]);

  return {
    participants,
    isConnected,
    updatePresence,
    setUserStatus,
    setUserActivity,
  };
} 