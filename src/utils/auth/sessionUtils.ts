
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export interface SessionInfo {
  user: User | null;
  session: Session | null;
  isExpired: boolean;
  expiresAt: Date | null;
}

export const getSessionInfo = async (): Promise<SessionInfo> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session check error:', error);
      return {
        user: null,
        session: null,
        isExpired: true,
        expiresAt: null
      };
    }

    if (!session) {
      return {
        user: null,
        session: null,
        isExpired: true,
        expiresAt: null
      };
    }

    const expiresAt = new Date(session.expires_at! * 1000);
    const isExpired = expiresAt <= new Date();

    return {
      user: session.user,
      session,
      isExpired,
      expiresAt
    };
  } catch (error) {
    console.error('Unexpected session error:', error);
    return {
      user: null,
      session: null,
      isExpired: true,
      expiresAt: null
    };
  }
};

export const refreshSession = async (): Promise<Session | null> => {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Session refresh error:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Unexpected refresh error:', error);
    return null;
  }
};

export const isSessionValid = (session: Session | null): boolean => {
  if (!session || !session.expires_at) return false;
  
  const expiresAt = new Date(session.expires_at * 1000);
  const now = new Date();
  
  // Consider session invalid if it expires within the next 5 minutes
  const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  return expiresAt.getTime() > (now.getTime() + bufferTime);
};
