
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SignInResult {
  user: unknown;
  session: unknown;
}

export interface SignUpResult {
  user: unknown;
  session: unknown;
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
    
    // Create the user account
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
    
    // Create profile record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          user_id: data.user.id,
          full_name: fullName,
          user_type: userType,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Attempt to delete the user if profile creation fails
        await supabase.auth.admin.deleteUser(data.user.id);
        throw new Error('Failed to create user profile');
      }

      // Create user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: data.user.id,
          role: userType,
          is_active: true,
          created_at: new Date().toISOString(),
        });

      if (roleError) {
        console.error('Role assignment error:', roleError);
        // Clean up if role assignment fails
        await supabase.auth.admin.deleteUser(data.user.id);
        throw new Error('Failed to assign user role');
      }
    }
    
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
