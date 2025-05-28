
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SignInResult {
  user: any;
  session: any;
}

export interface SignUpResult {
  user: any;
  session: any;
}

export const authService = {
  async signIn(email: string, password: string): Promise<SignInResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    console.log('Sign in successful:', data.user?.id);
    toast.success('Welcome back!');
    return data;
  },

  async signUp(email: string, password: string, fullName: string, userType: 'auditor' | 'project_owner'): Promise<SignUpResult> {
    console.log('Signing up user:', { email, fullName, userType });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType,
        },
      },
    });

    if (error) throw error;
    
    console.log('Sign up response:', data);
    
    if (data.user && !data.session) {
      toast.success('Account created! Please check your email to verify your account.');
    } else {
      toast.success('Account created successfully!');
    }
    
    return data;
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    console.log('Sign out successful');
    toast.success('Signed out successfully');
  },

  async forgotPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?mode=reset`,
    });
    if (error) throw error;
    
    toast.success('Password reset email sent');
  },

  async resetPassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    
    toast.success('Password updated successfully');
  }
};
