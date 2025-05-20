
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    user_type?: 'auditor' | 'project_owner';
  };
}

interface UserProfile {
  id: string;
  user_id: string;
  user_type?: 'auditor' | 'project_owner';
  display_name?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userType: 'auditor' | 'project_owner') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock authentication check
    // In a real app, this would check for an existing session
    const checkAuth = async () => {
      try {
        // Simulate auth check with localStorage
        const storedUser = localStorage.getItem('hawkly_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Simulate profile fetch
          if (parsedUser.id) {
            const storedProfile = localStorage.getItem('hawkly_profile');
            if (storedProfile) {
              setUserProfile(JSON.parse(storedProfile));
            }
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setError('Failed to authenticate user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock sign in - would be replaced with actual auth service
      const mockUser = { 
        id: `user-${Date.now()}`,
        email,
        user_metadata: { user_type: 'project_owner' }
      };
      
      // Store in localStorage for demo purposes
      localStorage.setItem('hawkly_user', JSON.stringify(mockUser));
      
      // Create mock profile
      const mockProfile = {
        id: `profile-${Date.now()}`,
        user_id: mockUser.id,
        user_type: 'project_owner',
        display_name: email.split('@')[0]
      };
      
      localStorage.setItem('hawkly_profile', JSON.stringify(mockProfile));
      
      setUser(mockUser);
      setUserProfile(mockProfile);
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userType: 'auditor' | 'project_owner') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock sign up - would be replaced with actual auth service
      const mockUser = { 
        id: `user-${Date.now()}`,
        email,
        user_metadata: { user_type: userType }
      };
      
      localStorage.setItem('hawkly_user', JSON.stringify(mockUser));
      
      // Create mock profile
      const mockProfile = {
        id: `profile-${Date.now()}`,
        user_id: mockUser.id,
        user_type: userType,
        display_name: email.split('@')[0]
      };
      
      localStorage.setItem('hawkly_profile', JSON.stringify(mockProfile));
      
      setUser(mockUser);
      setUserProfile(mockProfile);
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    
    try {
      // Clear local storage and state
      localStorage.removeItem('hawkly_user');
      localStorage.removeItem('hawkly_profile');
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    userProfile,
    isLoading,
    error,
    signIn,
    signOut,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
