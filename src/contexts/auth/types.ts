
export interface UserProfile {
  id: string;
  full_name?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  wallet_address?: string;
  verification_status: 'unverified' | 'pending' | 'verified' | 'rejected';
  years_of_experience?: number;
  projects_completed?: number;
  skills?: string[];
  specializations?: string[];
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'auditor' | 'project_owner' | 'general';
  is_active: boolean;
  assigned_at: string;
  assigned_by?: string;
}

export interface AuthContextProps {
  user: any;
  session: any;
  userProfile: UserProfile | null;
  userRoles: UserRole[];
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner') => Promise<any>;
  signOut: () => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<any>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<any>;
  getUserType: () => 'auditor' | 'project_owner' | 'admin' | 'general';
  hasRole: (role: string) => boolean;
  loading: boolean;
  error: string | null;
}
